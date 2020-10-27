import React, {useState, useEffect, useRef} from "react"
// @ts-ignore
import TreeList from '../TreeList/TreeList'
// @ts-ignore
import Uploader from '../Uploader/Uploader'
// @ts-ignore
import colorConversion from "./colorConversion"
// @ts-ignore
import treeDataExample  from "./treeDataExample"

import "./chatbot-widget.scss"

export interface ChatbotWidgetProps {
  open: boolean,
  title: string,
  zIndex: number,
  botName: string,
  avatar: string | undefined,
  colors: string[],
  miniSize: number,
  positionOpen: number[],
  positionClosed: number[],
  customWelcomeMessage: string | undefined,
  hoursActive: number[] | undefined,
  allowedTypes: string[] | undefined, //Indicar por tipos documents, images, media
}

export interface Message {
  text: string,
  timestamp: number,
  user: string,
  seen: boolean,
  render: {
    toRender: any,
    type: string
  }
}
export interface Misc {
  lastSeen: number
} 

export interface AtnBtn {
  text: string,
  action: () => void
}

const ChatbotWidget:React.FunctionComponent<ChatbotWidgetProps> = (props) => {
  const userTextbox = useRef(null)
  const dialogWrapper = useRef(null)
  const userTextboxWrapper = useRef(null)
  const [lastSeen, setLastSeen] = useState<Misc["lastSeen"]>(Math.trunc(new Date().getTime() / 1000))
  const [open, setOpen] = useState(props.open)
  const [openEmoji, setOpenEmoji] = useState(false)
  const [openDownload, setOpenDownload] = useState(false)
  const [openUpload, setOpenUpload] = useState(false)
  const [openHelp, setOpenHelp] = useState(false)
  const [openTopics, setOpenTopics] = useState(false)
  const [openShortcut, setOpenShortcut] = useState(false)
  const [openCard, setOpenCard] = useState(false)
  const [openList, setOpenList] = useState(false)
  const [openVideo, setOpenVideo] = useState(false)
  const [openOption, setOpenOption] = useState(false)
  const [option, setOption] = useState<string | undefined>(undefined)
  const [humanWritting, setHumanWritting] = useState(false)
  const [botWritting, setBotWritting] = useState(false)
  const [fileUpload, setFileUpload] = useState(false)
  const [errorsUpload, setErrorsUpload] = useState([])
  const [loadingFileUpload, setLoadingFileUpload] = useState(false)
  const [emoji, setEmoji] = useState<undefined | string>(undefined)
  const [demoButtons, setDemoButtons] = useState<AtnBtn[]>([
    {
      text: 'lorem',
      action: () => alert("test")
    },
    {
      text: 'ipsum',
      action: () => alert("test")
    },
  ])

  const renderButtons = (buttons:AtnBtn[]) => {
    let arrButtons:any[] = []
    buttons.map((btn) => {
      arrButtons = [...arrButtons, 
          <button className="gc-chw-btn labeled" onClick={() => btn.action()} style={{backgroundColor: `#${props.colors[1]}`}}>
            {btn.text}
        </button>
      ]
    })
    return arrButtons
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'bla, bla, bla...',
      timestamp: 1100805469,
      user: 'bot',
      seen: true,
      render: {
        toRender: undefined,
        type: ''
      }
    },
    {
      text: 'bla, bla, bla...',
      timestamp: 1200805469,
      user: 'bot',
      seen: true,
      render: {
        toRender: renderButtons(demoButtons),
        type: 'buttons'
      }
    },
    {
      text: 'bla, bla, bla...',
      timestamp: 1200805469,
      user: 'bot',
      seen: true,
      render: {
        toRender: {
          cards: [
            {
              image: 'http://placekitten.com/g/400/400',
              title: 'Lorem ipsum',
              description: 'Lorem pisumsmms',
              buttons: [
                {
                  value: 'Boton a',
                  action: () => alert('Test')
                },
                {
                  value: 'Boton b',
                  action: () => alert('Test')
                }
              ]
            }
          ]
        },
        type: 'card'
      }
    },
    {
      text: 'bla, bla, bla...',
      timestamp: 1200805469,
      user: 'bot',
      seen: true,
      render: {
        toRender: {
          listImage: 'http://placekitten.com/g/400/400',
          list: [
            {
              image: 'http://placekitten.com/g/400/400',
              title: 'Lorem ipsum',
              description: 'Lorem pisumsmms',
              buttons: [
                {
                  value: 'Boton a',
                  action: () => alert('Test')
                }
              ]
            },
            {
              image: 'http://placekitten.com/g/400/400',
              title: 'Lorem ipsum',
              description: 'Lorem pisumsmms',
              buttons: [
                {
                  value: 'Boton a',
                  action: () => alert('Test')
                }
              ]
            }
          ]
        },
        type: 'list'
      }
    },
    {
      text: 'bla, bla, bla...',
      timestamp: 1200805469,
      user: 'bot',
      seen: true,
      render: {
        toRender: {
          options: [
            {
              value: 'ipsum',
              action: () => alert('Test'),
              name: 'Test'
            },
            {
              value: 'lorem',
              action: () => alert('Test'),
              name: 'Test'
            }
          ]
        },
        type: 'option'
      }
    },
    {
      text: 'bla, bla, bla...',
      timestamp: 1300805469,
      user: 'bot',
      seen: true,
      render: {
        toRender: 'http://techslides.com/demos/sample-videos/small',
        type: 'video'
      }
    },
    {
      text: 'bla, bla, bla...',
      timestamp: 1300805469,
      user: 'bot',
      seen: true,
      render: {
        toRender: ['http://placekitten.com/g/400/400'],
        type: 'image'
      }
    },
    {
      text: 'bla, bla, bla...',
      timestamp: 1300805469,
      user: 'bot',
      seen: true,
      render: {
        toRender: ['http://placekitten.com/g/400/400', 'http://placekitten.com/g/300/200', 'http://placekitten.com/g/1200/600'],
        type: 'image'
      }
    },
    {
      text: 'bla, bla, bla...',
      timestamp: 1300805470,
      user: 'bot',
      seen: false,
      render: {
        toRender: 'DocumentoDeEjemplo.pdf',
        type: 'document'
      }
    },
    {
      text: 'bla, bla, bla...',
      timestamp: 1300805471,
      user: 'human',
      seen: false,
      render: {
        toRender: undefined,
        type: ''
      }
    }
  ])


  const handleActive = () => {
    setLastSeen(Math.trunc(new Date().getTime() / 1000))
    handleSeen()
  }

  const handleSeen = () => {
    let updatedMessages:Message[] = []
    let updatedMessage:Message = {
      text: '',
      timestamp: 0,
      user: '',
      seen: false,
      render: {
        toRender: undefined,
        type: ''
      }
    }
    let messageData:Message[]
    messages.map( mess => {
      messageData = messages.filter(x => mess.timestamp == x.timestamp)
      if (messageData.length == 1){
        updatedMessage.text = messageData[0].text
        updatedMessage.timestamp = messageData[0].timestamp
        updatedMessage.user = messageData[0].user
        updatedMessage.seen = messageData[0].timestamp < lastSeen ? true : false
        updatedMessages = [ ...messages.filter(x => mess.timestamp != x.timestamp), updatedMessage]
        updatedMessages.sort(function(a, b) {
          return a.timestamp - b.timestamp;
        })
      }
    })
    setMessages(updatedMessages)
  }

  const toggleOpen = (source) => {
    if (source == 'navbar'){
      if (open == false){
        setOpen(!open)
      }
    }
    else {
      setOpen(!open)
    }
    if (open){
      setLastSeen(Math.trunc(new Date().getTime() / 1000))
    }
  }

  const textAreaHeight = (mode:'increase' | 'reset') => {
    if (mode == 'increase'){
      userTextbox.current.style.height = `${userTextbox.current.scrollHeight}px`
      userTextboxWrapper .current.style.height = `${userTextbox.current.scrollHeight}px`
    }
    else {
      userTextbox.current.style.height = "36px"
      userTextboxWrapper.current.style.height = "36px"
      userTextbox.current.value = userTextbox.current.defaultValue
    }
  }

  const cleanText = (m) => {
    let cText:string[] = []
    let strgText:string
    m.split(' ').map(word => {
      cText = [...cText, word.trim()]
    })
    strgText = cText.join(' ').trim()
    return strgText
  }

  const dialogGenerator = (message, user) => {
    if (cleanText(message).length > 0){
      setMessages([...messages, {
        text: cleanText(message),
        timestamp: Math.trunc(new Date().getTime() / 1000),
        user: user,
        seen: false,
        render: {
          toRender: undefined,
          type: ''
        }
      }])
      textAreaHeight('reset')
      setHumanWritting(false)
    }
  }

  const scrollBottom = () => {
    dialogWrapper.current.scrollTop = dialogWrapper.current.scrollHeight
  }

  const handleUserWritting = (e) => {
    if(e.key == 'Enter'){
      e.preventDefault();
      if (cleanText(userTextbox.current.value).length == 0){
        textAreaHeight('reset')
      }
      dialogGenerator(userTextbox.current.value, 'human')
    }
    else{
      setHumanWritting(true)
      textAreaHeight('increase')
      handleActive()
    }
    setTimeout(() => setHumanWritting(false), 1500)
    scrollBottom()
  }

  const handleUploadSend = () => {
    setOpenUpload(false)
    setFileUpload(false)
    setErrorsUpload([])
  }

  const generateTxt = () => {
    let _messages:string[] = []
    messages.map((m) => {
      _messages.push(`${m.user.toLocaleUpperCase()} [${m.timestamp}] : "${m.text}"`)
    })
    let base64String = btoa(_messages.join("\n"))
    let fileName = `chatbot-history-${(Math.trunc(new Date().getTime() / 1000))}.txt`
    let url = `data:text/plain;charset=utf-16le;base64,${base64String}`
    let urlDownload = document.createElement('a')
    urlDownload.download = fileName
    urlDownload.href = url
    urlDownload.click()
  }

  const handleUpload = (event) => {
    if (event.target.value != ""){
      setFileUpload(true)
    }
  }
  
  const onDelete = () => {
    setFileUpload(false)
  }

  useEffect(() => {
    if (dialogWrapper.current != null){
      scrollBottom()
    }
    open ? handleActive() : null
  }, [props.open, open, messages.length, userTextbox.current != null ? userTextbox.current.value : null])

  const renderEmojiBar = () => {
    let emojis:any[] = []
    let emojiDictionary = [
      {
        utf: 'U+1F600',
        string: 'grinning'
      },
      {
        utf: 'U+1F636',
        string: 'no-mouth'
      },
      {
        utf: 'U+1F613',
        string: 'sweat'
      },
      {
        utf: 'U+1F635',
        string: 'dizzy-face'
      },
      {
        utf: 'U+1F616',
        string: 'confounded'
      },
      {
        utf: 'U+1F629',
        string: 'weary'
      },
      {
        utf: ' U+1F910',
        string: 'zipper-mouth-face'
      },
      {
        utf: ' U+1F633',
        string: 'flushed-face'
      },
      {
        utf: 'U+1F620',
        string: 'angry'
      },
      {
        utf: 'U+1F60E',
        string: 'sunglasses'
      },
      {
        utf: 'U+1F641',
        string: 'slighty-frowning-face'
      },
      {
        utf: 'U+1F632',
        string: 'atonished'
      }
    ]
    for (let i = 1; i <= 34; i++){
      emojis.push(
        <div className="gc-chw-emoji" style={{backgroundColor: `#${props.colors[10]}`}} onClick={() => handleEmoji(emojiDictionary[i] != undefined ? emojiDictionary[i].utf : '')} title={emojiDictionary[i] != undefined ? emojiDictionary[i].utf : ''} key={`gc-chw-emoji-${emojiDictionary[i] != undefined ? emojiDictionary[i].string : ''}-${i}`}>
          <i style={{color: `#${props.colors[5]}`}} className={`gc-font emoji-${i}`} title={emojiDictionary[i] != undefined ? emojiDictionary[i].utf : ''}></i>
        </div>
      )
    }

    return (
      <div className={`gc-chw-emoji-bar ${openEmoji ? "open": ""}`}>
        {
          emojis
        }
      </div>
    )
  }

  const handleEmoji = (emo) => {
    function hexToDec(hex) {
      var result = 0, digitValue;
      hex = hex.toLowerCase();
      for (var i = 0; i < hex.length; i++) {
      digitValue = '0123456789abcdefgh'.indexOf(hex[i]);
      result = result * 16 + digitValue;
      }
      return result;
    }
    console.log(emo.split('U+')[1])
    if (emo != ''){
      userTextbox.current.value = `${userTextbox.current.value} ${String.fromCodePoint(hexToDec(emo.split('U+')[1]))}`
    }
  }

  const renderDownload = () => {
    return (
      <div className={`gc-chw-popover download ${openDownload ? "open": ""}`}>
        <p>Descargar una copia de la conversación:</p>
        <div className="gc-chw-download-icon">
          <i className="gc-font _save"/>
        </div>
        <button className="gc-chw-btn labeled" onClick={() => generateTxt()} style={{backgroundColor: `#${props.colors[2]}`}}>
          Descargar ahora
        </button>
      </div>
    )
  }

  const renderHelp = () => {
    return (
      <div className={`gc-chw-popover help ${openHelp ? "open": ""}`}>
        <h1>Ayuda</h1>
        <p>Aquí ira la info de ayuda</p>
      </div>
    )
  }

  const renderUpload = () => {
    return (
      <div className={`gc-chw-popover upload ${openUpload ? "open": ""}`}>
        <h1>Adjunta un archivo*</h1>
        <Uploader
          checked={fileUpload  && errorsUpload.length == 0}
          onchange={handleUpload}
          file_loaded={loadingFileUpload}
          ondelete={onDelete}
          disabled={false}
          fileErrors={undefined}
          disabledMessage={''}
        />
        <button  className={`gc-chw-btn labeled ${fileUpload  && errorsUpload.length == 0 ? '' : "disabled"}`} onClick={handleUploadSend} style={{backgroundColor: `#${props.colors[2]}`}}>
          Enviar
        </button>
        <div style={{marginTop: '20px'}}/>
        <p>*Acepta {props.allowedTypes.join(', ')} </p>
      </div>
    )
  }

  const renderTopics = () => {
    let topics:any[] = []
    for (let i = 1; i <= 10; i++){
      topics.push(
        <button className="gc-chw-topic" key={`gc-chw-emoji-${i}`} onClick={() => alert('test')}>
          <i className="gc-font _hashtag"/>
          Tópico de ejemplo {i}
        </button>
      )
    }
    return (
      <div className={`gc-chw-popover topics ${openTopics ? "open": ""}`}>
        <div className="gc-chw-popover-wrapper">
        <h1>Tópicos:</h1>
        {
          topics
        }
        </div>
      </div>
    )
  }

  const renderShorcut = () => {
    return (
      <div className={`gc-chw-popover shortcut ${openShortcut ? "open": ""}`}>
        <div className="gc-chw-popover-wrapper">
          <h1>Atajos:</h1>
          <TreeList data={treeDataExample} onclick_button={() => alert('text')}/>
        </div>
      </div>
    )
  }

  const renderMessage = (user:string, index:number | string, text:string, writting:boolean, seen:boolean, render:any) => {
    return (
      <div 
        className={`gc-chw-dialog-item _${user}`} key={`dialog-item-${user}-${index}`}
      >
        <div 
          className="gc-chw-dialog-avatar"
          style={{
            color: props.colors[2],
            border: `3px solid #${props.colors[5]}`,
            backgroundImage: user == 'bot' ? `url(${props.avatar})` : '',
            opacity: writting == false ? 1 : 0
          }}
        >
          {
            user == 'human' ?
            <i className="gc-font user_"></i>
            : null
          }
        </div>
        <div 
          className={`gc-chw-dialog-message ${writting ? 'writting': ''}`}
          style={{
            backgroundColor: user == 'bot' 
                                  ? seen 
                                    ? colorConversion(`#${props.colors[5]}`, 1)
                                    : colorConversion(`#${props.colors[5]}`, 0.85)
                                  : 
                                    seen 
                                    ? colorConversion(`#${props.colors[5]}`, 1)
                                    : colorConversion(`#${props.colors[5]}`, 0.85)
          }}
        >
          <p>
            {text}
            {
              writting == true ? 
              <span className="gc-chw-loading-container">
                <span className="gc-chw-loading">
                  <span className="gc-chw-loading__char">.</span>
                  <span className="gc-chw-loading__char">.</span>
                  <span className="gc-chw-loading__char">.</span>
                </span>
              </span>
              :null
            }
          </p>
          {
            render.toRender != undefined ?
            <div
              className={
                `gc-chw-msg-render-container 
                  ${render.type} 
                  ${render.type == 'card' ? openCard ? 'open' : '' : ''}
                  ${render.type == 'list' ? openList ? 'open' : '' : ''}
                  ${render.type == 'option' ? openOption ? 'open' : '' : ''}
                  ${render.type == 'video' ? openVideo ? 'open' : '' : ''}
                `
              }
              onClick={() => 
                render.type == 'card' ? setOpenCard(!openCard) 
                : render.type == 'list' ? setOpenList(!openList)
                : render.type == 'option' ? setOpenOption(!openOption)
                : render.type == 'video' ? setOpenVideo(!openVideo)
                : null
              }
            >
              {
                render.type == 'buttons' ?
                  <>
                    {render.toRender}
                  </>
                  : 
                  render.type == 'document' ?
                    <div className="gc-chw-msg-document">
                      <i className="gc-font details"></i>
                      <p>
                        {render.toRender}
                        <span>(300kb)</span>
                      </p>
                    </div>
                  : 
                    render.type == 'card' ?
                    <div className='gc-chw-cards-wrapper'>
                      {
                        render.toRender.cards.map((card, indCard) =>
                          <div className="gc-chw-card" key={`card-${card.title}-${indCard}`}>
                            <div className="gc-chw-card-img" style={{backgroundImage: `url(${card.image})`}}/>
                            <p className="gc-chw-card-title">{card.title}</p>
                            <span className="gc-chw-card-description">{card.description}</span>
                            <div className="gc-chw-card-buttons-wrapper">
                              {
                                card.buttons.map((btn, indBtn) => 
                                  <button
                                    type="button" 
                                    onClick={() => btn.action()}
                                    className="gc-chw-card-button"
                                    key={`gc-chw-card-button-${indBtn}`}
                                  >
                                    {btn.value}
                                  </button>
                                )
                              }
                            </div>
                          </div>
                        )
                      }
                    </div>
                  : render.type == 'list' ? 
                    <div className='gc-chw-list-wrapper'>
                      <div className="gc-chw-list-img-gral" style={{backgroundImage: `url(${render.toRender.listImage})`}}/>
                      <div className="gc-chw-list-wrapper-list">
                        {
                          render.toRender.list.map((list, indList) =>
                            <div className="gc-chw-list" key={`list-${list.title}-${indList}`}>
                              <div className="gc-chw-list-info">
                                <div className="gc-chw-list-info-wrapper">
                                  <p className="gc-chw-list-title">{list.title}</p>
                                  <span className="gc-chw-list-description">{list.description}</span>
                                  <div className="gc-chw-list-buttons-wrapper">
                                    {
                                      list.buttons.map((btnList, indBtn) => 
                                        <button
                                          type="button" 
                                          onClick={() => btnList.action()}
                                          className="gc-chw-list-button"
                                          key={`gc-chw-list-button-${indBtn}`}
                                        >
                                          {btnList.value}
                                        </button>
                                      )
                                    }
                                  </div>
                                </div>
                                <div className="gc-chw-list-img" style={{backgroundImage: `url(${list.image})`}}/>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                    : render.type == 'option' ?
                    <div className="gc-chw-options">
                      {
                        render.toRender.options.map((opt, optIn) => 
                          <div className={`gc-chw-option ${option == opt.value ? 'active' : ''}`} key={`${opt.value}-${optIn}`}>
                            <input className='gc-chw-option-input' onClick={() => setOption(opt.value)} value={opt.value} type="radio" name={opt}/>
                            <label className='gc-chw-option-label'>
                              <span>{opt.value}</span>
                            </label>
                          </div>
                        )
                      }
                    </div>
                    : render.type == 'video' ?
                      <div className="gc-chw-video">
                        <video controls>
                          <source src={`${render.toRender}.mp4`} type="video/mp4"/>
                          <source src={`${render.toRender}.ogv`} type="video/ogg"/>
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    : render.type == 'image' ?
                      <div className="gc-chw-image-wrapper">
                        {
                          render.toRender.map((img, imgIn) => 
                            <div 
                              key={`${img}-${imgIn}`}
                              className={`gc-chw-image-element ${render.toRender.length > 1 ? 'mini' : ''}`}
                              onClick={() => window.open(img, '_blank')}
                              style={{
                                backgroundImage: render.type == 'image' ? `url(${img})` : ''
                              }}/>
                          )
                        }
                      </div>
                  : null
              }
            </div>
            :null
          }
        </div>
      </div>
    )
  }

  return (
    <div 
      className="gc-chatbot-w"
      style={{
        zIndex: props.zIndex,
        right: open ? `${props.positionOpen[0]}px` : `${props.positionClosed[0]}px`,
        bottom: open ? `${props.positionOpen[1]}px` : `${props.positionClosed[1]}px`
      }}
    >
      <div className="gc-chatbot-w-wrapper">
        <div 
          className={`gc-chw-window ${open ? "open" : ""}`}
          style={{
            height: props.miniSize != undefined && open == false ? `${props.miniSize}px` : '',
            width: props.miniSize != undefined && open == false ? `${props.miniSize}px` : ''
          }}
        >
          {/* Navbar */}
          <div 
            className="gc-chw-nav"
            style={{ 
              backgroundColor: open ? `#${props.colors[1]}` : '',
              backgroundImage: props.avatar != undefined && open == false ? `url(${props.avatar})` : '',
              height: props.miniSize != undefined && open == false ? `${props.miniSize}px` : '',
              width: props.miniSize != undefined && open == false ? `${props.miniSize}px` : ''
            }}
            onClick={()=> toggleOpen('navbar')}
          >
            <p className="gc-chw-nav-title">
              {props.title}
            </p>
            <div className="gc-chw-btn-nav-wrapper">
              <button className="gc-chw-btn nav _help" onClick={()=> setOpenHelp(!openHelp)}>
                <i className="gc-font help"/>
              </button>
              <button className="gc-chw-btn nav toggle" onClick={()=> toggleOpen('button')}>
                <i className="gc-font minus"/>
              </button>
            </div>
          </div>
          {
            open ?
            <>
              {/* Dialogs */}
              <div className="gc-chw-dialog-wrapper" ref={dialogWrapper}>
              {/* Popovers */}
              {renderEmojiBar()}{renderShorcut()}{renderTopics()}{renderDownload()}{renderUpload()}{renderHelp()}
              {
                messages.map((message, mIndex) => 
                  renderMessage(message.user, mIndex, message.text, false, message.seen, message.render)
                )
              }
              {
                humanWritting == true ?
                  renderMessage('human', 'h0', '', humanWritting, true, {toRender: undefined, type: ''})
                :null
              }
              {
                botWritting == true ?
                  renderMessage('bot', 'b0', '', botWritting, true, {toRender: undefined, type: ''})
                :null
              }
              </div>
              {/* Prompt */}
              <div className="gc-chw-prompt-wrapper" style={{borderLeft: `10px solid #${props.colors[5]}`, borderRight: `51px solid #${props.colors[5]}`, borderTop: `10px solid #${props.colors[5]}`, backgroundColor: `#${props.colors[9]}`}}>
              <div className="gc-chw-prompt-input-wrapper" ref={userTextboxWrapper}>
                <button className="gc-chw-btn prompt emoji" style={{color: `#${props.colors[6]}`, backgroundColor: `#${props.colors[9]}`}} onClick={()=> setOpenEmoji(!openEmoji)}>
                  <i className="gc-font emoji-1" style={{color: `#${props.colors[6]}`}}/>
                </button>
                <textarea onKeyPressCapture={handleUserWritting} ref={userTextbox} className="gc-chw-prompt-input">
                </textarea>
                <button className="gc-chw-btn prompt attach" style={{color: `#${props.colors[6]}`, backgroundColor: `#${props.colors[9]}`}} onClick={()=> setOpenUpload(!openUpload)}>
                  <i className="gc-font _attach" style={{color: `#${props.colors[6]}`}} />
                </button>
              </div>
              <button
                style={{color: `#${props.colors[9]}`, backgroundColor: `#${props.colors[2]}`}}
                className={`
                  gc-chw-btn _send 
                  ${ userTextbox.current != null ? userTextbox.current.value == '' ? "disabled" : '' : ''}
                `}
                onClick={() => dialogGenerator(userTextbox.current.value, 'human')}>
                  <i className="gc-font send"/>
                </button>
              </div>
              {/* Footer */}
              <div className="gc-chw-footer" style={{backgroundColor: `#${props.colors[5]}`}}>
              <button style={{color: `#${props.colors[6]}`, backgroundColor: `#${props.colors[9]}`}} className="gc-chw-btn footer save labeled" onClick={()=> setOpenDownload(!openDownload)}>
                <i className="gc-font _save" style={{color: `#${props.colors[6]}`}}/>
                Guardar
              </button>
              <button className="gc-chw-btn footer shorcut labeled" style={{color: `#${props.colors[6]}`, backgroundColor: `#${props.colors[9]}`}} onClick={()=> setOpenShortcut(!openShortcut)}>
                <i className="gc-font flash" style={{color: `#${props.colors[6]}`}}/>
                Atajos
              </button>
              <button className="gc-chw-btn footer topic labeled" style={{color: `#${props.colors[6]}`, backgroundColor: `#${props.colors[9]}`}} onClick={()=> setOpenTopics(!openTopics)}>
                <i className="gc-font _hashtag" style={{color: `#${props.colors[6]}`}}/>
                Tópicos
              </button>
              </div>
            </>
            :null
          }
        </div>
      </div>
    </div>
  )
}

export default ChatbotWidget;