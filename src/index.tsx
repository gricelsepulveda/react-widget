import React from 'react'
import ReactDOM, { render } from 'react-dom'
import Home from "./views/Home"


//ReactDOM.render(<Home config="wena en development"/>, document.getElementById('root'))

export const init = (config:string) => {
  ReactDOM.render(<Home config={config} />, document.getElementById('root'));
}