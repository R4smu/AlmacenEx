import Boton from './Boton'
import imagenfondo from '../assets/imagenfondo.avif'

const Hero = () => {
    return (
        <div className='min-h-screen w-full relative overflow-hidden flex items-center justify-center md:justify-end px-8 md:px-12 lg:px-20'>
            <div
                className='absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-x-[-1]'
                style={{ backgroundImage: `url(${imagenfondo})` }}
            />
            <div className='relative z-10 max-w-lg w-full flex flex-col gap-6 md:mr-12 lg:mr-20'>

                <div className='text-center md:text-right'>
                    <h1 className='text-4xl md:text-5xl font-bold text-gray-900 leading-tight'>
                        TODO CADUCA
                    </h1>
                    <p className='text-base md:text-lg text-gray-700 mt-3'>
                        Controla la caducidad de tus alimentos y evita desperdicios
                    </p>
                </div>

                <section className='flex flex-row gap-4 justify-center md:justify-end'>
                    <Boton estilo="opciones">Añadir alimento</Boton>
                    <Boton estilo="opciones">Lista de alimentos</Boton>
                </section>
            </div>
        </div>
    )
}

export default Hero