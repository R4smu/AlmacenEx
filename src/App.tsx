import './App.css'
import ComponenteBoton from './components/ComponenteBoton'

function App() {

  return (
    <>
      <ComponenteBoton texto="Login" estilo="btn-login" />
      <ComponenteBoton texto="Registrar" estilo="btn-header" />
      <ComponenteBoton texto="Opciones" estilo="btn-opciones" />
      <ComponenteBoton texto="Carne" estilo="btn-carne" />
      <ComponenteBoton texto="Pescado" estilo="btn-pescado" />
      <ComponenteBoton texto="Verdura" estilo="btn-verdura" />
      <ComponenteBoton texto="Panaderia" estilo="btn-panaderia" />
      <ComponenteBoton texto="Lacteos" estilo="btn-lacteos" />
      <ComponenteBoton texto="Congelados" estilo="btn-congelados" />
      <ComponenteBoton texto="Fruta" estilo="btn-fruta" />
    </>
  )
}

export default App
