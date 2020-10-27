import React from 'react'
import ReactDOM from 'react-dom'
// @ts-ignore
import App from "./js/App"
// @ts-ignore
import defaultConfig from "./defaultConfig.tsx"

//development
ReactDOM.render(<App config={defaultConfig}/>, document.getElementById('root'))

//production widget
/*export const init = (config:string) => {
  ReactDOM.render(<App config={config} />, document.getElementById('root'));
}*/