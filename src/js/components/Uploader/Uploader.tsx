import React, { useState, useEffect, useRef } from "react"
import "./uploader.scss"
// @ts-ignore
import LoaderContext from "../LoaderContext/LoaderContext"

export interface UploaderProps {
  onchange: (event: any) => void,
  ondelete: () => void,
  file_loaded: boolean,
  checked: boolean,
  disabled: boolean,
  disabledMessage: string,
  fileErrors: any[]
}

const Uploader: React.FunctionComponent<UploaderProps> = (props) => {
  const [fileLoaded, setFileLoaded] = useState(props.file_loaded)
  const [fileChecked, setFileChecked] = useState(props.checked)
  const [fileInside, setFileInside] = useState(false)
  const fileRef = useRef(null)

  const handleChange = (event) => {
    props.onchange(event)
    if (event.target.value != ""){
      setFileInside(true)
    }
    else {
      setFileInside(false)
    }
  }
  
  const handleDelete = () => {
    if (fileRef != null && fileRef.current != undefined){
      props.ondelete()
      fileRef.current.value = ""
      setFileInside(false)
      setFileLoaded(false)
      setFileChecked(false)
    }
  }

  useEffect(()=> {
    setFileLoaded(props.file_loaded)
    setFileChecked(props.checked)
  }, [props.checked, props.file_loaded, fileInside])

  return (
    <div className={`gc-uploader ${props.disabled == true ? "disabled" : ""}`}>
      {
        props.disabled ?
        <span className="gc-uploader-disabled">{props.disabledMessage}</span>
        : null
      }
      <input  type="file" 
              ref={fileRef}
              multiple={false}
              className="gc-uploader-input"
              onChange={() => handleChange(event)}
              accept=""
      />
      {
        fileChecked == true ?
          fileLoaded == false ?
            <div className="gc-f-upload-message success">
              <i className="gc-font check"></i>
              <span>
                <i className="gc-font info"></i>
                
              </span>
            </div>
          : null
        :
        fileLoaded == true ?
          <div className="gc-f-upload-message loader">
            <LoaderContext/>
          </div>
          :
          <div className={`gc-f-upload-message ${props.fileErrors == undefined ? "": "error"}`}>
            <span className="gc-f-upload-status-icon">
              <i className="gc-font uploadfile"></i>
            </span>
            <span>
              {props.fileErrors == undefined ? '' : <span className='errorM'>Existen errores en este archivo. Corrígelo o sube otro</span> }
            </span>
          </div>
      }
      <button disabled={fileInside == true && fileLoaded == false ? false : true} className={`gc-uploader-delete ${fileInside == true && fileLoaded == false ? "" : "disabled"}`} onClick={() => handleDelete()}>
        <i className="gc-font trash"></i>
      </button>
    </div>
  )
}

export default Uploader