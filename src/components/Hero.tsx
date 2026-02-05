import Boton from './Boton'

const ComponentePrincipal = () => {
    return (
        <>
            {/* Titulo */}
            <div className='flex justify-center '>
                <h2>TODO CADUCA</h2>
            </div>
            {/* Botones */}
            <section className='flex justify-center '>
                <Boton texto="Añadir de alimentos" estilo="btn-opciones cursor-pointer" />
                <Boton texto="Lista de alimentos" estilo="btn-opciones cursor-pointer" />
            </section>
        </>
    )
}

export default ComponentePrincipal