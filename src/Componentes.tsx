import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Etiqueta from './components/Etiqueta'
import TarjetaAlimento from './components/TarjetaAlimento'
import "./index.css"
import AnadirAlimentos from './pages/AnadirAlimentos'
import LandingPage from './pages/LandingPage'
import Registro from './pages/Registro'
import Login from './pages/Login'
import Header from './components/Header'
import { ListarProducto } from './pages/ListarProducto'

// ==============================
// Esto es para comprobar en el navegador que funcionen los componentes que tenemos y que se ven realmente como queremos.
// Luego este archivo lo borraremos porque no lo vamos a necesitar, asi que cuando creeis un componente nuevo,
// ponedlo aqui tambien para que se vea en el navegador.
// Al final, cuando meergemos la rama components-review al main,
// solo vamos a añadir realmente toda la carpeta de components (todos los componentes nuevos que hemos creado en esta rama).
// ==============================

function Componentes() {

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex">
          <Routes>
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path="/anadirAlimentos" element={<AnadirAlimentos />} />
            <Route path="/listaProducto" element={<ListarProducto />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            {/*  Ruta por defecto si no se carga una pagina o cuando entras en la aplicacion*/}
            <Route path="*" element={<LandingPage />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default Componentes