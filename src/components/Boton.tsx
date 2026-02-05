import "../index.css"

const Boton = ({texto, estilo}:any) => {
  return (
    <button className={estilo}>{texto}</button>
  )
}

export default Boton