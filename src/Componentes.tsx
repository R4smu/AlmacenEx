import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import "./index.css"
import Header from './components/Header'
import RutaProtegida from './components/RutaProtegida'
import RutaAdmin from './components/RutaAdmin'
const AnadirAlimentos = lazy(() => import('./pages/AnadirAlimentos'))
const LandingPage     = lazy(() => import('./pages/LandingPage'))
const Registro        = lazy(() => import('./pages/Registro'))
const Login           = lazy(() => import('./pages/Login'))
const ListarProducto  = lazy(() => import('./pages/ListarProducto'))
const PanelAdmin      = lazy(() => import('./pages/PanelAdmin'))

const Cargando = () => (
  <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-800 transition-colors">
    <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500">
      <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
)

function Componentes() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex">
          <Suspense fallback={<Cargando />}>
            <Routes>
              <Route path="/landingPage"      element={<LandingPage />} />
              <Route path="/anadirAlimentos"  element={<RutaProtegida><AnadirAlimentos /></RutaProtegida>} />
              <Route path="/listaProducto"    element={<RutaProtegida><ListarProducto /></RutaProtegida>} />
              <Route path="/registro"         element={<Registro />} />
              <Route path="/login"            element={<Login />} />
              <Route path="/admin"            element={<RutaAdmin><PanelAdmin /></RutaAdmin>} />
              <Route path="*"                 element={<LandingPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default Componentes