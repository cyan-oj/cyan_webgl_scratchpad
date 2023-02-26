import './style.css'
import main from './src/draw'

document.querySelector('#app').innerHTML = `
  <div>
    <canvas id="example" width="512" height="512">
  </div>
`
main();
