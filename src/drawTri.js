import { initShaders } from './lib/cuon-utils'
import { Matrix4 } from './lib/cuon-matrix';
import { initVertexBuffers } from './lib/gl-helpers';
import { VSHADER_SOURCE, FSHADER_SOURCE, TRANSLATABLE_VSHADER, TRANSFORMABLE_VSHADER } from './shaders';

function drawTri() { 
  const canvas = document.getElementById("example");
  const gl = canvas.getContext('webgl', { antialias: false });

  if (!initShaders(gl, TRANSFORMABLE_VSHADER, FSHADER_SOURCE)) console.error('failed to initialize shaders')

  const vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5, 
    0.5,  0.5, 
    0.5,  -0.5
  ]) 

  const translate = {
    x: 0.5,
    y: 0.5,
    z: 0.0
  }

  const scale = {
    x: 0.2,
    y: 0.2,
    z: 0.2
  }

  const ANGLE = 45.0;
  const radian = Math.PI * ANGLE / 180.0; //convert to radians
  const [ cosB, sinB ] = [ Math.cos(radian), Math.sin(radian) ]

  const modelMatrix = new Matrix4();
  modelMatrix.setRotate( ANGLE, 0, 0, 1 )
  modelMatrix.translate( 0.0, 0.0, 0.0)

  const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')
  const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
  
  const points = initVertexBuffers(gl, vertices, a_Position);
  if (!points) console.error('failed to set vertex positions')
  console.log(points)
  
  gl.uniformMatrix4fv( u_ModelMatrix, false, modelMatrix.elements)
  gl.uniform4f(u_FragColor, 0.3, 0.8, 0.8, 1)
  gl.clearColor(0.0, 0.0, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length/2)
} 

export default drawTri;