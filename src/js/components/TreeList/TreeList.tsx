import React, {useState } from "react"

//Styles
import './tree-list.scss'

//Data dummie
// @ts-ignore
import treeDummie from "./treeDummie.js"


interface TreeListProps {
  data: any[],
  onclick_button: (action:string) => void
}

const TreeList:React.FunctionComponent<TreeListProps> = (props) => {
  const [data, setData] = useState(props.data.length > 0 ? props.data : treeDummie)
  const [liActive, setLiActive] = useState("")

  const checkChildrens = (arrayChildren: any[], li_parent_key:string) => {
    let activeState = false
    if (arrayChildren.length > 0) {
      arrayChildren.map((children, index)=>{
        `${li_parent_key}-${children.name.split(" ").join("")}_${index}` == liActive ? activeState = true : null
      })
    }
    return activeState
  }

  const TreeListElement = (name: string, value:string, key:string, childrens:any[]) => {
    let activeChecker = liActive == key || checkChildrens(childrens, key)

    const handleClick = () => {
      if (key != liActive){
        setLiActive(key)
      }
    }

    return(
      <li 
        title={key}
        onClick={handleClick}
        className={`gc-treelist-f-list-element folder ${activeChecker ? "active" : ""}`}
        key={key}
      >
        <div className="gc-list-element-wrapper">
          <span className="gc-f-list">
            <span className="gc-f-list-name">{name}</span>
            <span className="gc-f-list-value">{value}</span>
          </span>
          <i className={`gc-font caret ${activeChecker == true ? "active" : ""}`}/>
        </div>
        <ul className="gc-treelist-folder-list" style={{marginLeft: "20px"}}>
          {
            childrens.map((element, index) => (
              TreeListElement(element.name, element.value, `${key}-${element.name.split(" ").join("")}_${index}`, element.childrens)
            ))
          } 
        </ul>
      </li>
    )
  }

  return (
    <nav className="gc-treelist">
      <ul className="gc-treelist-folder-list" style={{marginLeft: "20px"}}>
      {
        data.map((elem:any, index:number) => (
          TreeListElement(elem.name, elem.value,  `${elem.name.split(" ").join("")}_${index}`, elem.childrens)
        ))
      }
      </ul>
    </nav>
  )
}
export default TreeList;
