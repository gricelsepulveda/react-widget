import React from 'react'
import ReactDOM from 'react-dom'
// @ts-ignore
import Home from "./views/Home"
// @ts-ignore
import defaultConfig from "./defaultConfig.tsx"

//development
ReactDOM.render(<Home config={defaultConfig}/>, document.getElementById('root'))

//production widget
/*export const init = (config:string) => {
  ReactDOM.render(<Home config={config} />, document.getElementById('root'));
}*/