import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import LandingPage from './LandingPage'
import { StrictMode } from 'react'
import { ListarProducto } from './pages/ListarProducto'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ListarProducto></ListarProducto>
  </StrictMode>,
)
