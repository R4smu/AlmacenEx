import '../App.css'
import Footer from '../components/Footer'
import Tarjeta from '../components/Tarjeta'
import image1 from "../assets/imagen-landing-1.webp"
import image2 from "../assets/imagen-landing-2.webp"
import image3 from "../assets/imagen-landing-3.webp"

import Hero from '../components/Hero'

function LandingPage() {

  return (
    <div className="w-full overflow-x-hidden bg-white dark:bg-gray-800 transition-colors">
      <Hero></Hero>
      <br />
      <Tarjeta imagen={image1} titulo='Lorem Ipsum' texto={'Nuestra aplicación te ayuda a llevar un control sencillo y rápido de los alimentos que compras. Podrás registrar cada producto con su cantidad y fecha de caducidad, evitando olvidar lo que tienes en casa y manteniendo tu despensa siempre organizada.'}></Tarjeta><br />
      <Tarjeta imagen={image2} titulo='Lorem Ipsum' texto={'Muchas veces los alimentos se estropean porque no recordamos cuándo caducan. Con esta herramienta podrás ver fácilmente qué productos están próximos a vencer, lo que te permitirá consumirlos a tiempo y reducir el desperdicio de comida.'} invertida={true}></Tarjeta><br />
      <Tarjeta imagen={image3} titulo='Lorem Ipsum' texto={'Busca, clasifica y visualiza tus alimentos de forma clara gracias a categorías y herramientas de búsqueda. Todo está pensado para que gestionar tu comida diaria sea más cómodo, rápido y eficiente.'}></Tarjeta><br />
      <Footer></Footer>
    </div>
  )
}
export default LandingPage