import './style.css'
import './grid.css'
import { formLogin } from './login.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="root">
      <div id="container"
      >helloworld!</div>
      
  </div>
`

formLogin(document.querySelector<HTMLButtonElement>('#container')!)
