import Boton from './Boton'

const ComponentePrincipal = () => {
    return (
        <>
            <div className='flex justify-center'>
                <h2>TODO CADUCA</h2>
            </div>
            <section className='flex justify-center'>
                
                <Boton estilo="opciones" className="cursor-pointer">
                    Añadir de alimentos
                </Boton>

                <Boton estilo="opciones" className="cursor-pointer">
                    Lista de alimentos
                </Boton>

            </section>
        </>
    )
}

export default ComponentePrincipal