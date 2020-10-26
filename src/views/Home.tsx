import React from "react"

interface HomeProps {
  config: string
}

const Home:React.FunctionComponent<HomeProps> = (props) => {
  return (
    <div>
      Hola mundo si llego aca es porque consumo props desde el widget {props.config.config}
    </div>
  )
}

export default Home