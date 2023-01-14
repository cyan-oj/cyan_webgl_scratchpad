const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`

const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
  }
`

function main() { 
  const canvas = document.getElementById("example");
  const gl = canvas.getContext('webgl');

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) console.error('failed to initialize shaders')

  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

  canvas.onmousemove = function(ev) { click(ev, gl, canvas, a_Position); }

  let g_points = [];

  function click(ev, gl, canvas, a_Position) {
    const rect = ev.target.getBoundingClientRect();
    let x = ev.clientX - rect.left;
    let y = ev.clientY - rect.top;

    x = (x - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - y)/(canvas.height/2);

    g_points.push(x); 
    g_points.push(y);

    gl.clearColor(0.0, 0.0, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT)

    const len = g_points.length

    for(let i = 0; i < len; i += 2){
      gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);
      gl.vertexAttrib1f(a_PointSize, 5.0);
      gl.drawArrays(gl.points, 0, 1)
    }
  }
}