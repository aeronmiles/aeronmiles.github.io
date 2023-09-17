attribute vec4 position;
varying vec2 v_uv;

void main() {
  gl_Position = position;
  v_uv = position.xy * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
}