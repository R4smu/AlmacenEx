import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './LandingPage'
import Login from './components/forms/Login'
import Registro from './components/forms/Registro'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingPage />
    <Registro />
  </StrictMode>,
)
