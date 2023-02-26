import './style.css'
import coloredPoints from './src/drawPoints'
import drawThree from './src/drawThree'
import drawTri from './src/drawTri'

document.querySelector('#app').innerHTML = `
  <div>
    <canvas id="example" width="512" height="512">
  </div>
`
drawTri();
