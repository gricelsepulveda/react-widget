import { configDef } from "./js/App"

const defaultConfig:configDef = {
  title: "Agente conversacional",
  open: true,
  colors:[
      '8a55e9',//Primary
      '1244be',//Secondary
      'f50f78',//Accent
      '00c5c8',//Success
      '69708d',//Black
      'd6dbf5',//Border
      '009ada',//Gocloud
      'b7bfe5',//BorderDarker
      'ffa100'//BorderViolet
  ],
  zIndex:99,
  avatar:"https://gc-general.s3.amazonaws.com/logo-lablab.png",
  miniSize:36,
  positionOpen:[20, 0],
  positionClosed:[20, 20],
  botName:"LabLab Agent",
  customWelcomeMessage:"Lorem ipsum",
  hoursActive:[10, 20],
  allowedTypes:["imágenes", "videos", "documentos"],
}

export default defaultConfig