import { initShaders } from './lib/cuon-utils'
import { initVertexBuffers } from './lib/gl-helpers';
import { VSHADER_SOURCE, FSHADER_SOURCE, TRANSLATABLE_VSHADER } from './shaders';

function drawThree() { 
  const canvas = document.getElementById("example");
  const gl = canvas.getContext('webgl', { antialias: false });

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) console.error('failed to initialize shaders')

  const vertices = new Float32Array([
    0.0, 0.5, 
    -0.5, -0.5, 
    0.5, -0.5,
  ]) 
  
  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
  const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
  
  const points = initVertexBuffers(gl, vertices, a_Position, a_PointSize);
  if (!points) console.error('failed to set vertex positions')


  gl.vertexAttrib1f(a_PointSize, 10.0);
  gl.uniform4f(u_FragColor, 0.3, 0.8, 0.8, 1)
  gl.clearColor(0.0, 0.0, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, vertices.length/2)
} 

export default drawThree;