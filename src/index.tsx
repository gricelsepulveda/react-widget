import React from 'react'
import ReactDOM from 'react-dom'
// @ts-ignore
import App from "./js/App"
// @ts-ignore
import defaultConfig from "./defaultConfig.tsx"
import { configDef } from "./js/App"

//development
//ReactDOM.render(<App config={defaultConfig}/>, document.getElementById('root'))

//production widget
export const init = (config:configDef) => {
  ReactDOM.render(<App config={config} />, document.getElementById('root'));
}