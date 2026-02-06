import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import Componentes from './Componentes.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <Componentes />
  </>,
)
