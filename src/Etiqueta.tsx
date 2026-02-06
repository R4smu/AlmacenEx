import "./App.css"

const Etiqueta = ({texto, estilo, icono: Icon}:any) => {
  return (
    <div className={estilo}>
      
      <span>{Icon && <Icon className="etiqueta-icono" />}</span>
      <span>{texto}</span>
      
    </div>
  )
}

export default Etiqueta