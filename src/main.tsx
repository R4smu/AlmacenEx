import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import { StrictMode } from 'react'
import Componentes from './Componentes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Componentes></Componentes>
  </StrictMode>,
)
