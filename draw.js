function main() { 
  const canvas = document.getElementById("example");
  const gl = canvas.getContext('webgl');

  gl.clearColor(0.0, 0.0, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT)
}