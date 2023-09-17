precision mediump float;

varying vec2 v_uv;
uniform sampler2D u_texture;
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_envMap; // The latlong HDR environment map
const float PI = 3.1415926535;

// Signed Distance Function for a sphere
float sdSphere(vec3 p, vec3 center, float r) {
    return length(p - center) - r;
}

// Convert a direction to a 2D UV coordinate for the latlong environment map
vec2 dirToUV(vec3 d) {
  float u = atan(d.y, d.x) / (2.0 * PI) + 0.5;
  float v = asin(d.z) / PI + 0.5;
  return vec2(u, v);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
  vec3 ro = vec3(uv, 2.0);
  vec3 rd = normalize(vec3(uv, -1.0));

  float t = 0.0;
  const int maxIter = 100;
  const float maxDist = 100.0;
  const float minDist = 0.01;
  vec3 center = vec3(sin(u_time) * 0.8, 0.0, 0.0);
  float radius = (sin(u_time * 3.0) + 1.0) * 0.3 + 0.5;

  for (int i = 0; i < maxIter; i++) {
    vec3 p = ro + t * rd;
    float d = sdSphere(p, center, radius);
    if (d < minDist)
      break;
    t += d;
    if (t > maxDist)
      break;
  }

  vec3 col;
  if (t < maxDist) {
    vec3 p = ro + t * rd;
    vec3 n = normalize(vec3(
        sdSphere(p + vec3(0.001, 0.0, 0.0), center, 1.0) - sdSphere(p - vec3(0.001, 0.0, 0.0), center, 1.0),
        sdSphere(p + vec3(0.0, 0.001, 0.0), center, 1.0) - sdSphere(p - vec3(0.0, 0.001, 0.0), center, 1.0),
        sdSphere(p + vec3(0.0, 0.0, 0.001), center, 1.0) - sdSphere(p - vec3(0.0, 0.0, 0.001), center, 1.0)
                            ));
    float diff = clamp(dot(n, normalize(vec3(-1.0, 1.0, 1.0))), 0.1, 1.0);

    // Reflection
    vec3 reflectDir = reflect(rd, n);
    vec2 envUV = dirToUV(reflectDir);
    vec3 reflectionColor = texture2D(u_envMap, envUV).rgb;

    col = mix(diff * vec3(0.5, 0.8, 1.0), reflectionColor,
              0.0); // Mix based on a 50% reflection factor
  } else {
    col = vec3(0.0);
  }

  gl_FragColor = vec4(col, col.r);
}
