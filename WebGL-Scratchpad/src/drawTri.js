import { initShaders } from './lib/cuon-utils'
import { initVertexBuffers } from './lib/gl-helpers';
import { VSHADER_SOURCE, FSHADER_SOURCE } from './shaders';

function drawTri() { 
  const canvas = document.getElementById("example");
  const gl = canvas.getContext('webgl', { antialias: false });

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) console.error('failed to initialize shaders')

  const vertices = new Float32Array([
    0.0, 0.5, 
    -0.5, -0.5, 
    0.5, -0.5
  ]) 
  
  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  
  const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
  
  const points = initVertexBuffers(gl, vertices, a_Position, a_PointSize);
  if (!points) console.error('failed to set vertex positions')

  // canvas.onmousemove = function(ev) { click(ev, gl, canvas, a_Position, u_FragColor); }

  // const g_points = []; 
  // const g_colors = [];

  // function click(ev, gl, canvas, a_Position) {
  //   const rect = ev.target.getBoundingClientRect();
  //   let x = ev.clientX - rect.left;
  //   let y = ev.clientY - rect.top;

  //   x = (x - canvas.width/2)/(canvas.width/2);
  //   y = (canvas.height/2 - y)/(canvas.height/2);

  //   g_points.push([x, y]);

  //   if (x >= 0.0 && y >= 0.0) {
  //     g_colors.push([1.0, 0.0, 0.0, 1.0]);
  //   } else {
  //     g_colors.push([1.0, 0.0, 1.0, 1.0])
  //   }

  //   gl.clearColor(0.0, 0.0, 0.5, 1.0);
  //   gl.clear(gl.COLOR_BUFFER_BIT)

  //   const len = g_points.length

  //   for(let i = 0; i < len; i += 1){
  //     gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);
  //     gl.vertexAttrib1f(a_PointSize, 10.0);
  //     gl.uniform4f(u_FragColor, g_colors[i][0], g_colors[i][1], g_colors[i][2], g_colors[i][3])
  //     gl.drawArrays(gl.points, 0, 1)
  //   }
  // }
  gl.vertexAttrib1f(a_PointSize, 10.0);
  gl.uniform4f(u_FragColor, 0.3, 0.8, 0.8, 1)
  gl.clearColor(0.0, 0.0, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, vertices.length/2)
} 

export default drawTri;