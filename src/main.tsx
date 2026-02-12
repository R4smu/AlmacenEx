import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import Registro from './components/forms/Registro'
import { StrictMode } from 'react'
import LandingPage from './LandingPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingPage/>
    <Registro />
  </StrictMode>,
)