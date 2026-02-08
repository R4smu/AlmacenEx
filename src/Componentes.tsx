import './App.css'
import Boton from './components/Boton'
import Etiqueta from './components/Etiqueta'
import TarjetaAlimento from './components/TarjetaAlimento'
import "./index.css"

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
      <Etiqueta texto="caducado" tipo="caducado" />
      <Etiqueta texto="no caducado" tipo="nocaducado" />
      <Etiqueta texto="a punto" tipo="apunto" />

      <Etiqueta texto="Lácteos" tipo="lacteos" />
      <Etiqueta texto="Fruta" tipo="fruta" />
      <Etiqueta texto="Pescados" tipo="pescados" />
      <Etiqueta texto="Verdura" tipo="verdura" />
      <Etiqueta texto="Carne" tipo="carne" />
      <Etiqueta texto="Panaderia" tipo="panaderia" />
      <Etiqueta texto="Congelados" tipo="congelados" />
      
      <Boton estilo="carne">Hola</Boton>
      <TarjetaAlimento />
    </>
  )
}

export default Componentes
