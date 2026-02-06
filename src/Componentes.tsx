import './App.css'
import "./index.css"
import Etiqueta from "./Etiqueta"

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
      <Etiqueta texto="Fruta" estilo="etiqueta-fruta"/>
      <Etiqueta texto="Carne" estilo="etiqueta-carne"/>
      <Etiqueta texto="Pescados" estilo="etiqueta-pescados"/>
      <Etiqueta texto="Verdura" estilo="etiqueta-verdura"/>
      <Etiqueta texto="Lácteos" estilo="etiqueta-lacteos"/>
      <Etiqueta texto="Congelados" estilo="etiqueta-congelados"/>

    </>
  )
}

export default Componentes
