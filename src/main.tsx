import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import { StrictMode } from 'react'
import Componentes from './Componentes'
import './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Componentes></Componentes>
  </StrictMode>,
)
