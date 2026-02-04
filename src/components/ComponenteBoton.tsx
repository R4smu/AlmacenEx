import "../App.css"

const ComponenteBoton = ({texto, estilo}) => {
  return (
    <button className={estilo}>{texto}</button>
  )
}

export default ComponenteBoton