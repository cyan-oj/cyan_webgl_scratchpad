export const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`

export const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`

export const TRANSLATABLE_VSHADER = `
  attribute vec4 a_Position;
  uniform vec4 u_Translation;
  void main() {
    gl_Position = a_Position + u_Translation;
  }
`

// x' = x cos b - y sin b
// y' = x sin b + y cos b
// z' = z
export const TRANSFORMABLE_VSHADER = `
  attribute vec4 a_Position;
  uniform vec2 u_CosBSinB;
  void main() {
    gl_Position.x = a_Position.x * u_CosBSinB.x - a_Position.y * u_CosBSinB.y;
    gl_Position.y = a_Position.x * u_CosBSinB.y + a_Position.y * u_CosBSinB.x;
    gl_Position.z = a_Position.z;
    gl_Position.w = 1.0;
  }
  `
  // uniform vec4 u_Translation;
  // gl_Position = a_Position + u_Translation;