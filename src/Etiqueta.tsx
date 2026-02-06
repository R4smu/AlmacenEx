import "./App.css"
import { LuMilk } from "react-icons/lu";

const Etiqueta = ({texto, estilo}:any) => {
  return (
    <div className={(estilo)}>
        
      {texto}
    </div>
  )
}

export default Etiqueta