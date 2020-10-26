import React from "react"

interface HomeProps {
  config: string
}

const Home:React.FunctionComponent<HomeProps> = (props) => {
  console.log(props.config)
  return (
    <div>
      Hola mundo si llego aca es porque consumo props desde el widget
    </div>
  )
}

export default Home