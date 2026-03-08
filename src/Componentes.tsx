import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import "./index.css"
import AnadirAlimentos from './pages/AnadirAlimentos'
import LandingPage from './pages/LandingPage'
import Registro from './pages/Registro'
import Login from './pages/Login'
import Header from './components/Header'
import { ListarProducto } from './pages/ListarProducto'
import RutaProtegida from './components/RutaProtegida'
import PanelAdmin from './pages/PanelAdmin'
import RutaAdmin from './components/RutaAdmin'

function Componentes() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex">
          <Routes>
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path="/anadirAlimentos" element={<RutaProtegida><AnadirAlimentos /></RutaProtegida>} />
            <Route path="/listaProducto" element={<RutaProtegida><ListarProducto /></RutaProtegida>} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<RutaAdmin><PanelAdmin /></RutaAdmin>} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default Componentes
