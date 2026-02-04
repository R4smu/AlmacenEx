import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './componentes/Header'
import Footer from './componentes/Footer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header></Header>
    <Footer></Footer>
  </StrictMode>,
)
