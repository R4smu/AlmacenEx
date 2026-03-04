import '../App.css'
import InputNombreProducto from '../components/forms/InputNombreProducto'
import InputSelect from '../components/forms/InputSelect'
import InputTextArea from '../components/forms/InputTextArea'
import "../index.css"
import ImagenAnadida from '../components/ImagenAnadida'
import Etiqueta from '../components/Etiqueta'
import TarjetaAlimento from '../components/TarjetaAlimento'
import InputFechaCaducidad from '../components/forms/InputFechaCaducidad'

function AnadirAlimentos() {

    return (
        <>
            <div className='flex flex-1 justify-center gap-20 bg-white dark:bg-gray-800 min-h-screen transition-colors'>
                <aside className="h-full bg-gray-50 dark:bg-gray-800 flex p-6 transition-colors">
                    <div className="w-full max-w-md bg-white dark:bg-gray-700 p-6 rounded shadow space-y-4 transition-colors">
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Añadir alimentos
                        </h1>
                        <ImagenAnadida></ImagenAnadida>
                        <InputNombreProducto></InputNombreProducto>
                        <InputSelect options={[]}></InputSelect>
                        <InputFechaCaducidad></InputFechaCaducidad>
                        <InputTextArea></InputTextArea>
                    </div>
                </aside>
                <div className='flex flex-col gap-8 p-2'>
                    <TarjetaAlimento nombre_alimento="Leche" fecha="12/12/2012" cantidad="1 L">
                        <Etiqueta texto="Caducado" tipo="caducado"></Etiqueta>
                        <Etiqueta texto="Carne" tipo="carne"></Etiqueta>
                    </TarjetaAlimento>
                    <TarjetaAlimento nombre_alimento="Lubina" fecha="12/12/2012" cantidad="1 L">
                        <Etiqueta texto="Fresco (30d)" tipo="nocaducado"></Etiqueta>
                        <Etiqueta texto="Pescados" tipo="pescados"></Etiqueta>
                    </TarjetaAlimento>
                    <TarjetaAlimento nombre_alimento="Alcachofa" fecha="12/12/2012" cantidad="1 L">
                        <Etiqueta texto="Próximo a vencer (3d)" tipo="apunto"></Etiqueta>
                        <Etiqueta texto="Verdura" tipo="verdura"></Etiqueta>
                    </TarjetaAlimento>
                    <TarjetaAlimento nombre_alimento="Calamares" fecha="12/12/2012" cantidad="1 L">
                        <Etiqueta texto="Fresco (30d)" tipo="nocaducado"></Etiqueta>
                        <Etiqueta texto="Congelados" tipo="congelados"></Etiqueta>
                    </TarjetaAlimento>
                </div>
            </div>
        </>
    )
}

export default AnadirAlimentos