import { useEffect, useState } from 'react'
import Boton from './Boton'
import imagenfondo from '../assets/imagenfondo.avif'
import { NavLink } from 'react-router-dom'

const Hero = () => {
    const [showBackground, setShowBackground] = useState(false)
    const [showTitle, setShowTitle] = useState(false)
    const [showSubtitle, setShowSubtitle] = useState(false)
    const [showButtons, setShowButtons] = useState(false)

    useEffect(() => {
        // Animación escalonada completa
        const bgTimer = setTimeout(() => setShowBackground(true), 100)
        const titleTimer = setTimeout(() => setShowTitle(true), 500)
        const subtitleTimer = setTimeout(() => setShowSubtitle(true), 900)
        const buttonsTimer = setTimeout(() => setShowButtons(true), 1300)

        return () => {
            clearTimeout(bgTimer)
            clearTimeout(titleTimer)
            clearTimeout(subtitleTimer)
            clearTimeout(buttonsTimer)
        }
    }, [])

    return (
        <div className='min-h-screen w-full relative overflow-hidden flex items-center justify-center md:justify-end px-8 md:px-12 lg:px-20'>
            {/* Imagen de fondo con animación de zoom y fade */}
            <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-x-[-1] transition-all duration-1500 ease-out ${
                    showBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                }`}
                style={{ backgroundImage: `url(${imagenfondo})` }}
            />
            {/* Overlay oscuro en dark mode */}
            <div className='absolute inset-0 bg-transparent dark:bg-black/40 transition-colors duration-500' />

            <div className='relative z-10 max-w-lg w-full flex flex-col gap-6 md:mr-12 lg:mr-20'>
                <div className='text-center md:text-right'>
                    {/* Título con animación */}
                    <h1 
                        className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight drop-shadow-md transition-all duration-1000 ease-out ${
                            showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        TODO CADUCA
                    </h1>
                    {/* Subtítulo con animación */}
                    <p 
                        className={`text-base md:text-lg text-gray-700 dark:text-gray-200 mt-3 drop-shadow transition-all duration-1000 ease-out ${
                            showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        Controla la caducidad de tus alimentos y evita desperdicios
                    </p>
                </div>

                {/* Botones con animación */}
                <section 
                    className={`flex flex-row gap-4 justify-center md:justify-end transition-all duration-1000 ease-out ${
                        showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <NavLink to="/anadirAlimentos">
                        <Boton estilo="opciones">Añadir alimento</Boton>
                    </NavLink>
                    <NavLink to="/listaProducto">
                        <Boton estilo="opciones">Lista de alimentos</Boton>
                    </NavLink>
                </section>
            </div>
        </div>
    )
}

export default Hero