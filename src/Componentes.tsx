import './App.css'
import "./index.css"
import Etiqueta from "./Etiqueta"
import { LuMilk, LuApple, LuFish, LuCarrot} from "react-icons/lu";
import { GiMeat } from "react-icons/gi";
import { FaBreadSlice } from "react-icons/fa6";
import { WiSnowflakeCold } from "react-icons/wi";



// ==============================
// Esto es para comprobar en el navegador que funcionen los componentes que tenemos y que se ven realmente como queremos.
// Luego este archivo lo borraremos porque no lo vamos a necesitar, asi que cuando creeis un componente nuevo,
// ponedlo aqui tambien para que se vea en el navegador.
// Al final, cuando meergemos la rama components-review al main,
// solo vamos a añadir realmente toda la carpeta de components (todos los componentes nuevos que hemos creado en esta rama).
// ==============================

function Componentes() {

  return (
    <>
      <Etiqueta texto="caducado" estilo="etiqueta-caducado"/>
      <Etiqueta texto="no-caducado" estilo="etiqueta-nocaducado"/>
      <Etiqueta texto="a punto" estilo="etiqueta-apunto"/>

        <Etiqueta texto="Lácteos" estilo="etiqueta-lacteos" icono={LuMilk} />
        <Etiqueta texto="Fruta" estilo="etiqueta-fruta" icono={LuApple} />
        <Etiqueta texto="Pescados" estilo="etiqueta-pescados" icono={LuFish} />
        <Etiqueta texto="Verdura" estilo="etiqueta-verdura" icono={LuCarrot} />

        <Etiqueta texto="Carne" estilo="etiqueta-carne" icono={GiMeat} />
        <Etiqueta texto="Panaderia" estilo="etiqueta-panaderia" icono={FaBreadSlice} />
        <Etiqueta texto="Congelados" estilo="etiqueta-congelados" icono={WiSnowflakeCold} />

    </>
  )
}

export default Componentes
