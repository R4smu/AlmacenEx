import './index.css'
import Boton from './components/Boton'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {

  return (
    <>
      <Header></Header>
      <Footer></Footer>
      <Boton texto="Login" estilo="btn-login" />
      <Boton texto="Registrar" estilo="btn-header" />
      <Boton texto="Opciones" estilo="btn-opciones" />
      <Boton texto="Carne" estilo="btn-carne" />
      <Boton texto="Pescado" estilo="btn-pescado" />
      <Boton texto="Verdura" estilo="btn-verdura" />
      <Boton texto="Panaderia" estilo="btn-panaderia" />
      <Boton texto="Lacteos" estilo="btn-lacteos" />
      <Boton texto="Congelados" estilo="btn-congelados" />
      <Boton texto="Fruta" estilo="btn-fruta" />
    </>
  )
}

export default App
