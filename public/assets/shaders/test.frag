// WebGL compatible shader with advanced techniques
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture; // Main texture

// --- rotations -----------------------------------------------------
mat2 rot2(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}

// --- hue function --------------------------------------------------
vec3 hue(float v) {
    return .6 + .6 * cos(6.3 * v + vec3(0.0, 2.1, 4.2));
}

vec3 hsv(float h, float s, float v) {
    return v * (1.0 + s * (0.6 * cos(6.3 * h + vec3(0.0, 2.1, 4.2)) - 0.4));
}

// --- polar and complexes -------------------------------------------
vec2 CS(float a) {
    return vec2(cos(a), sin(a));
}

vec2 cart2pol(vec2 U) {
    return vec2(length(U), atan(U.y, U.x));
}

vec2 pol2cart(vec2 U) {
    return U.x * CS(U.y);
}

float cmod(vec2 Z) {
    return length(Z);
}

float carg(vec2 Z) {
    return atan(Z.y, Z.x);
}

vec2 conj(vec2 Z) {
    return vec2(Z.x, -Z.y);
}

vec2 cmul(vec2 A, vec2 B) {
    return vec2(A.x*B.x - A.y*B.y, A.x*B.y + A.y*B.x);
}

vec2 cinv(vec2 Z) {
    return vec2(Z.x, -Z.y) / dot(Z, Z);
}

vec2 cdiv(vec2 A, vec2 B) {
    return cmul(A, cinv(B));
}

vec2 cexp(vec2 Z) {
    return pol2cart(vec2(exp(Z.x), Z.y));
}

vec2 clog(vec2 Z) {
    return vec2(log(cmod(Z)), carg(Z));
}

// --- printing chars, integers and floats ---------------------------
vec4 char(vec2 p, int c) {
    if (p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0) return vec4(0.0, 0.0, 0.0, 1e5);
    vec4 sdf = texture2D(u_texture, p/16.0 + fract(vec2(float(c), 15.0-float(c)/16.0) / 16.0));

    vec4 col = mix(vec4(0,0,0,1), vec4(1), vec4((1.0 - sdf.r) <= 0.0));
    return vec4(sdf.r);
}

vec4 pInt(vec2 p, float n) {
    vec4 v = vec4(0.0);
    if (n < 0.0) {
        v += char(p - vec2(-0.5, 0.0), 45);
        n = -n;
    }
    for (float i = 3.0; i >= 0.0; i--) {
        n /= 9.999999;
        v += char(p - 0.5 * vec2(i, 0.0), 48 + int(fract(n) * 10.0));
    }
    return v;
}

vec4 pFloat(vec2 p, float n) {
    vec4 v = vec4(0.0);
    if (n < 0.0) {
        v += char(p - vec2(-0.5, 0.0), 45);
        n = -n;
    }
    float upper = floor(n);
    float lower = fract(n) * 1e4 + 0.5;
    if (lower >= 1e4) {
        lower -= 1e4;
        upper += 1.0;
    }
    v += pInt(p, upper);
    p.x -= 2.0;
    v += char(p, 46);
    p.x -= 0.5;
    v += pInt(p, lower);
    return v;
}

// --- antialiased line drawing --------------------------------------
float S(float d, float r, float pix) {
    return smoothstep(0.75, -0.75, (d/pix) - r);
}

float line(vec2 p, vec2 a, vec2 b) {
    p -= a;
    b -= a;
    float h = clamp(dot(p, b) / dot(b, b), 0.0, 1.0);
    return length(p - b * h);
}

float line0(vec2 p, vec2 a, vec2 b) {
    p -= a;
    b -= a;
    float h = dot(p, b) / dot(b, b);
    float c = clamp(h, 0.0, 1.0);
    return (h == c) ? length(p - b * h) : 1e5;
}

// --- hash functions ------------------------------------------------
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 hash2(vec2 p) {
    return fract(sin(p * mat2(127.1, 311.7, 269.5, 183.3)) * 43758.5453123);
}

vec3 hash3(vec3 p) {
    return fract(sin(p * mat3(127.1, 311.7, 74.7, 269.5, 183.3, 246.1, 113.5, 271.9, 124.6)) * 43758.5453123);
}

// Main function
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.y;
    vec4 O = vec4(0.0);
    vec2 R = u_resolution.xy;
    vec2 U;
    int lod = int(mod(u_time, 10.0));

    // Text rendering
    U = (uv - vec2(0.0, 0.9)) * 16.0;
    O += char(U, 82); U.x -= 0.5; // R
    O += char(U, 101); U.x -= 0.5; // e
    O += char(U, 115); U.x -= 0.5; // s
    O += char(U, 111); U.x -= 0.5; // o
    O += char(U, 108); U.x -= 1.0; // l
    O += char(U, 115); U.x -= 0.5; // s
    O += char(U, 99); U.x -= 0.5; // c
    O += char(U, 114); U.x -= 0.5; // r
    O += char(U, 101); U.x -= 0.5; // e
    O += char(U, 101); U.x -= 0.5; // e
    O += char(U, 110); // n

    // Display resolution
    U = (uv - vec2(0.1, 0.8)) * 8.0;
    O += pInt(U, R.x); U.y += 0.8;
    O += pInt(U, R.y); U.y += 0.8;
    O += pFloat((U - vec2(-1.0, 0.35)) * 1.5, R.x / R.y); U.y += 0.8;

    // Display time
    U = (uv - vec2(0.5, 0.8)) * 8.0;
    O += pFloat(U, u_time); U.y += 0.8;

    // Hue effect
    U = (uv * R.y / R - 0.9) / 0.1;
    if (min(U.x, U.y) > 0.0) {
        O = vec4(hue(U.x), 1.0);
        O *= O; // Compensate for gamma correction
    }

    // // Line drawing
    // U = (uv - vec2(0.9 * R.x / R.y, 0.8)) * 10.0;
    // float pix = 10.0 / R.y;
    // O += S(line(U, vec2(0.0, 0.0), vec2(1.1, 0.85)), 3.0, pix);
    // O += S(line0(U, vec2(0.5, 0.0), vec2(1.6, 0.85)), 3.0, pix);

    // // Circles and blending
    // U = (uv - 0.8 * R / R.y) * 10.0;
    // O += S(abs(length(U - vec2(0.2, 1.0)) - 0.5), 1.0, pix);
    // O += S(length(U - vec2(1.1, 1.0)) - 0.5, 0.0, pix) * vec4(1.0, 0.0, 0.0, 1.0) * 0.5;
    // O += (1.0 - O.a) * S(length(U - vec2(1.1, 0.3)) - 0.5, 0.0, pix) * vec4(0.0, 1.0, 0.0, 1.0);
    // vec4 C = S(length(U - vec2(1.1, -0.3)) - 0.5, 0.0, pix) * vec4(0.0, 0.0, 1.0, 1.0) * 0.5;
    // O = C + (1.0 - C.a) * O;

    // Random numbers
    U = uv - vec2(0.9 * R.x / R.y, 0.7);
    if (U.x > 0.0 && U.y > 0.0 && U.y < 0.08) {
        O.rgb += U.x > 0.05 * R.x / R.y ? hash(U) : hash2(U).x;
    }

    // Color space correction
    O = pow(O, vec4(1.0 / 2.2));

    gl_FragColor = O;
}