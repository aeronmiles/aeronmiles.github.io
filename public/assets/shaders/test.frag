precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_texture;
uniform float u_time;

void main() {
  gl_FragColor = pow(texture2D(u_texture, v_uv), vec4(2)) * vec4(2);
  gl_FragColor.rgb =
      gl_FragColor.rgb * gl_FragColor.a * (sin(u_time) * 0.5 + 0.5);
}