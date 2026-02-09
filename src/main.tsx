import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
<<<<<<< HEAD
import LandingPage from './LandingPage'
import Login from './components/forms/Login'
import Registro from './components/forms/Registro'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingPage />
    <Registro />
  </StrictMode>,
=======
import Componentes from './Componentes.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <Componentes />
  </>,
>>>>>>> components-review
)
