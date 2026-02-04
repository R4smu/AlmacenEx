import "../App.css"

const ComponenteBoton = ({texto, estilo}:any) => {
  return (
    <button className={estilo}>{texto}</button>
  )
}

export default ComponenteBoton