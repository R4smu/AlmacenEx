import '../App.css'
import Footer from '../components/Footer'
import Tarjeta from '../components/Tarjeta'
import image from "../assets/Image1_landing_page.png"
import Hero from '../components/Hero'

function LandingPage() {

  return (
    <div className="w-full overflow-x-hidden bg-white dark:bg-gray-800 transition-colors">
      <Hero></Hero>
      <br />
      <Tarjeta imagen={image} titulo='Lorem Ipsum' texto={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Tarjeta><br />
      <Tarjeta imagen={image} titulo='Lorem Ipsum' texto={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} invertida={true}></Tarjeta><br />
      <Tarjeta imagen={image} titulo='Lorem Ipsum' texto={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Tarjeta><br />
      <Footer></Footer>
    </div>
  )
}
export default LandingPage