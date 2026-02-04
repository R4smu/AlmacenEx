import Tarjeta from './componentes/Tarjeta'
import './App.css'
import imagenTarjeta from './imagenes/Captura de pantalla 2026-01-28 183213.png'

function App() {

  return (
    <>
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <Tarjeta
        imagen={imagenTarjeta}
        titulo="Título"
        texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        altImagen="Descripción de la imagen"
      />
      <br />
      <Tarjeta
        imagen={imagenTarjeta}
        titulo="Título"
        texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        altImagen="Descripción de la imagen"
        invertida={true}
      />
      <br />
      <Tarjeta
        imagen={imagenTarjeta}
        titulo="Título"
        texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        altImagen="Descripción de la imagen"
      />
    </div>
    </>
  )
}

export default App
