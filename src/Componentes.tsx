import './App.css'
import "./index.css"
import AnadirAlimentos from './pages/AnadirAlimentos'

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
      <AnadirAlimentos></AnadirAlimentos>      <Etiqueta texto="Fresco (30d)" tipo="nocaducado"></Etiqueta>
      <Etiqueta texto="Próximo a vencer (3d)" tipo="apunto"></Etiqueta>
      <Etiqueta texto="Caducado" tipo="caducado"></Etiqueta>
      
      <Etiqueta texto="Carne" tipo="carne"></Etiqueta>
      <Etiqueta texto="Pescados" tipo="pescados"></Etiqueta>
      <Etiqueta texto="Verdura" tipo="verdura"></Etiqueta>
      <Etiqueta texto="Panadería" tipo="panaderia"></Etiqueta>
      <Etiqueta texto="Lácteos" tipo="lacteos"></Etiqueta>
      <Etiqueta texto="Congelados" tipo="congelados"></Etiqueta>
      <Etiqueta texto="Fruta" tipo="fruta"></Etiqueta>

      <TarjetaAlimento nombre_alimento="Leche" fecha="12/12/2012" cantidad="1 L">
        <Etiqueta texto="Caducado" tipo="caducado"></Etiqueta>
        <Etiqueta texto="Carne" tipo="carne"></Etiqueta>
      </TarjetaAlimento>
    </>
  )
}

export default Componentes