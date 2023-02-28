import { initShaders } from './lib/cuon-utils'
import { initVertexBuffers } from './lib/gl-helpers';
import { FSHADER_SOURCE, TRANSLATABLE_VSHADER } from './shaders';

function squareBrush() { 
  const canvas = document.getElementById("example");
  const gl = canvas.getContext('webgl', { antialias: false });

  if (!initShaders(gl, TRANSLATABLE_VSHADER, FSHADER_SOURCE)) console.error('failed to initialize shaders')

  const translate = { x: 0, y: 0 }

  const vertices = new Float32Array([
    -0.1, 0.1,
    -0.1, -0.1, 
    0.1, 0.1, 
    0.1, -0.1
  ]) 

  // vertex shader properties
  const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  const u_Translation = gl.getUniformLocation(gl.program, 'u_Translation')
  // fragment shader properties
  const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
  
  const points = initVertexBuffers(gl, vertices, a_Position)
  if (!points) console.error('failed to set vertex positions')

  gl.clearColor(0.0, 0.0, 0.5, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  
  canvas.onmousemove = function(evt) { click(evt, gl, canvas, a_Position, u_FragColor) }
  
  const events = [];
  
  const click = (evt, gl, canvas, u_FragColor) => {
    const rect = evt.target.getBoundingClientRect();
    translate.x = evt.clientX - rect.left;
    translate.y = evt.clientY - rect.top;
    
    translate.x = (translate.x - canvas.width/2)/(canvas.width/2);
    translate.y = (canvas.height/2 - translate.y)/(canvas.height/2);
    
    events.push(translate)
    
    gl.clearColor(0.0, 0.0, 0.5, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    
    for (let i = 0; i < events.length; i += 1){
      gl.uniform4f(u_FragColor, 0.3, 0.8, 0.8, 1)
      gl.uniform4f(u_Translation, events[i].x, events[i].y, 0.0, 0.0)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length/2)
    }
  }
} 

export default squareBrush;