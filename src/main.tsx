import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import LandingPage from './LandingPage'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>,
)
