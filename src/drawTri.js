import { initShaders } from './lib/cuon-utils'
import { initVertexBuffers } from './lib/gl-helpers';
import { VSHADER_SOURCE, FSHADER_SOURCE, TRANSLATABLE_VSHADER } from './shaders';

function drawTri() { 
  const canvas = document.getElementById("example");
  const gl = canvas.getContext('webgl', { antialias: false });

  if (!initShaders(gl, TRANSLATABLE_VSHADER, FSHADER_SOURCE)) console.error('failed to initialize shaders')

  const Tx = 0.5
  const Ty = 0.5
  const Tz = 0.0

  const vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5, 
    0.5, 0.5, 
    0.5, -0.5
  ]) 

  // vertex shader properties
  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  const u_Translation = gl.getUniformLocation(gl.program, 'u_Translation')
  // fragment shader properties
  const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
  
  const points = initVertexBuffers(gl, vertices, a_Position);
  if (!points) console.error('failed to set vertex positions')

  gl.uniform4f(u_FragColor, 0.3, 0.8, 0.8, 1)
  gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0)

  gl.clearColor(0.0, 0.0, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length/2)
} 

export default drawTri;