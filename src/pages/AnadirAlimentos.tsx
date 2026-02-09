import '../App.css'
import InputFechaCaducidad from '../components/forms/InputFechaCaducidad'
import InputNombreProducto from '../components/forms/InputNombreProducto'
import InputSelect from '../components/forms/InputSelect'
import InputTextArea from '../components/forms/InputTextArea'
import "../index.css"
import ImagenAnadida from '../components/ImagenAnadida'

// ==============================
// Esto es para comprobar en el navegador que funcionen los componentes que tenemos y que se ven realmente como queremos.
// Luego este archivo lo borraremos porque no lo vamos a necesitar, asi que cuando creeis un componente nuevo,
// ponedlo aqui tambien para que se vea en el navegador.
// Al final, cuando meergemos la rama components-review al main,
// solo vamos a añadir realmente toda la carpeta de components (todos los componentes nuevos que hemos creado en esta rama).
// ==============================

function AnadirAlimentos() {

    return (
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
    )
}

export default AnadirAlimentos