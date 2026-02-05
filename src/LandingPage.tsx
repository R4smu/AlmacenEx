import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Tarjeta from './components/Tarjeta'
import image from "./assets/Image1_landing_page.png"
import Hero from './components/Hero'

function App() {

  return (
    <div className='btn-secundario'>
      <Header></Header>
      <Hero></Hero>
      <Tarjeta imagen={image} titulo='' texto={''}></Tarjeta><br />
      <Tarjeta imagen={image} titulo='' texto={''} invertida={true}></Tarjeta><br />
      <Tarjeta imagen={image} titulo='' texto={''}></Tarjeta><br />
      <Footer></Footer>
    </div>
  )
}
export default App
