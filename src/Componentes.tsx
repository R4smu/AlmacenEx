import './App.css'
import Etiqueta from './components/Etiqueta'
import TarjetaAlimento from './components/TarjetaAlimento'
import "./index.css"
import AnadirAlimentos from './pages/AnadirAlimentos'
import LandingPage from './pages/LandingPage'

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
      <LandingPage></LandingPage>
      <AnadirAlimentos></AnadirAlimentos>
    </>
  )
}

export default Componentes