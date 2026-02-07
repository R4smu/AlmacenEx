import './App.css'
import "./index.css"
import TarjetaAlimento from './components/TarjetaAlimento'
import Boton from './components/Boton'

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
      <Boton estilo="carne">Hola</Boton>
      <TarjetaAlimento />
    </>
  )
}

export default Componentes
