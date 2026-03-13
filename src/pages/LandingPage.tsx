import '../App.css'
import { useTranslation } from 'react-i18next'
import Footer from '../components/Footer'
import Tarjeta from '../components/Tarjeta'
import image1 from "../assets/imagen-landing-1.webp"
import image2 from "../assets/imagen-landing-2.webp"
import image3 from "../assets/imagen-landing-3.webp"
import Hero from '../components/Hero'

function LandingPage() {
  const { t } = useTranslation()

  return (
    <div className="w-full overflow-x-hidden bg-white dark:bg-gray-800 transition-colors">
      <Hero />
      <br />
      <Tarjeta
        imagen={image1}
        titulo={t('landingPage.tarjetas.tarjeta1.titulo')}
        texto={t('landingPage.tarjetas.tarjeta1.texto')}
      />
      <br />
      <Tarjeta
        imagen={image2}
        titulo={t('landingPage.tarjetas.tarjeta2.titulo')}
        texto={t('landingPage.tarjetas.tarjeta2.texto')}
        invertida={true}
      />
      <br />
      <Tarjeta
        imagen={image3}
        titulo={t('landingPage.tarjetas.tarjeta3.titulo')}
        texto={t('landingPage.tarjetas.tarjeta3.texto')}
      />
      <br />
      <Footer />
    </div>
  )
}

export default LandingPage