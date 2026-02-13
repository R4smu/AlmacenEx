import '../App.css'
import InputNombreProducto from '../components/forms/InputNombreProducto'
import InputSelect from '../components/forms/InputSelect'
import InputTextArea from '../components/forms/InputTextArea'
import "../index.css"
import ImagenAnadida from '../components/ImagenAnadida'
import Etiqueta from '../components/Etiqueta'
import TarjetaAlimento from '../components/TarjetaAlimento'
import InputFechaCaducidad from '../components/forms/InputFechaCaducidad'

// ==============================
// Esto es para comprobar en el navegador que funcionen los componentes que tenemos y que se ven realmente como queremos.
// Luego este archivo lo borraremos porque no lo vamos a necesitar, asi que cuando creeis un componente nuevo,
// ponedlo aqui tambien para que se vea en el navegador.
// Al final, cuando meergemos la rama components-review al main,
// solo vamos a añadir realmente toda la carpeta de components (todos los componentes nuevos que hemos creado en esta rama).
// ==============================

function AnadirAlimentos() {

    return (
        <div className='flex justify-center gap-20'>
            <aside className="min-h-screen bg-gray-50 flex p-6">
                <div className="w-full max-w-md bg-white p-6 rounded shadow space-y-4">
                    <h1 className="text-xl font-semibold">
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
    )
}

export default AnadirAlimentos