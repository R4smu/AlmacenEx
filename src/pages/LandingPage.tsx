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
      <Tarjeta imagen={image1} titulo='Lorem Ipsum' texto={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Tarjeta><br />
      <Tarjeta imagen={image2} titulo='Lorem Ipsum' texto={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} invertida={true}></Tarjeta><br />
      <Tarjeta imagen={image3} titulo='Lorem Ipsum' texto={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Tarjeta><br />
      <Footer></Footer>
    </div>
  )
}
export default LandingPage