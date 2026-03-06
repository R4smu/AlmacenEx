import '../App.css'
import { useState } from 'react'
import { supabase } from '../supabaseClient'

import InputNombreProducto from '../components/forms/InputNombreProducto'
import InputSelect from '../components/forms/InputSelect'
import InputTextArea from '../components/forms/InputTextArea'
import InputFechaCaducidad from '../components/forms/InputFechaCaducidad'
import Boton from '../components/Boton'
import "../index.css"

function AnadirAlimentos() {

    const [nombre, setNombre] = useState("")
    const [categoria, setCategoria] = useState("")
    const [fechaCaducidad, setFechaCaducidad] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [imagen, setImagen] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImagen(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            alert("Usuario no autenticado")
            setLoading(false)
            return
        }
        console.log(user.id)

        let { data: productoExistente } = await supabase
            .from("productos")
            .select("*")
            .ilike("nombre", nombre)
            .single()

        let productoId = productoExistente?.id_producto

        if (!productoExistente) {
            const { data: categoriaData } = await supabase
                .from("categorias")
                .select("id_categoria")
                .eq("nombre", categoria)
                .single()

            const { data: nuevoProducto, error: errorProducto } = await supabase
                .from("productos")
                .insert([
                    {
                        nombre: nombre,
                        id_categoria: categoriaData?.id_categoria
                    }
                ])
                .select()
                .single()

            if (errorProducto) {
                alert("Error creando producto")
                setLoading(false)
                return
            }

            productoId = nuevoProducto.id_producto
        }

        let imageUrl = null

        if (imagen) {
            const fileName = `${Date.now()}-${imagen.name}`

            const { error: uploadError } = await supabase.storage
                .from("imagenes-alimentos")
                .upload(fileName, imagen, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (uploadError) {
                console.log(uploadError)
                alert("Error subiendo imagen")
                setLoading(false)
                return
            }

            const { data } = supabase.storage
                .from("imagenes-alimentos")
                .getPublicUrl(fileName)

            imageUrl = data.publicUrl
        }

        const { error } = await supabase
            .from("alimentos_registrados")
            .insert([
                {
                    cantidad: Number(cantidad),
                    unidad_medida: "unidad",
                    fecha_caducidad: fechaCaducidad,
                    estado: "activo",
                    id_producto: productoId,
                    id_usuario: user.id,
                    imagen_url: imageUrl
                }
            ])

        if (error) {
            console.log("ERROR PRODUCTO:", error)
            alert(error.message)
            return
        } else {
            alert("Alimento añadido correctamente")
            setNombre("")
            setCategoria("")
            setFechaCaducidad("")
            setCantidad("")
            setImagen(null)
            setPreview(null)
        }

        setLoading(false)
    }

    return (
        <>
            <div className='flex flex-1 justify-center gap-20'>
                <aside className="h-full bg-gray-50 dark:bg-gray-900 flex p-6 transition-colors duration-300">
                    <form
                        onSubmit={handleSubmit}
                        className="
                            w-full max-w-md p-6 rounded shadow space-y-4
                            bg-white dark:bg-gray-800
                            text-gray-900 dark:text-gray-100
                            transition-colors duration-300
                        "
                    >
                        <h1 className="text-xl font-semibold">
                            Añadir alimentos
                        </h1>

                        <div className="flex flex-col gap-2">
                            <strong>Imagen</strong>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="
                                    border rounded w-60 p-1 cursor-pointer
                                    border-gray-300 dark:border-gray-600
                                    bg-white dark:bg-gray-700
                                    text-gray-900 dark:text-gray-100
                                    file:mr-2 file:py-1 file:px-2
                                    file:rounded file:border-0
                                    file:bg-gray-200 dark:file:bg-gray-600
                                    file:text-gray-700 dark:file:text-gray-200
                                    transition-colors duration-300
                                "
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    className="w-32 rounded border border-gray-200 dark:border-gray-600"
                                />
                            )}
                        </div>

                        <InputNombreProducto
                            value={nombre}
                            onChange={setNombre}
                        />

                        <InputSelect
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            options={[
                                { value: "Carne", name: "Carne" },
                                { value: "Pescado", name: "Pescado" },
                                { value: "Lácteos", name: "Lácteos" },
                                { value: "Fruta", name: "Fruta" },
                                { value: "Verdura", name: "Verdura" },
                                { value: "Panadería", name: "Panadería" },
                                { value: "Congelados", name: "Congelados" }
                            ]}
                        />

                        <input
                            type="number"
                            placeholder="Cantidad"
                            className="
                                w-100 p-2 flex items-center gap-2 rounded border
                                border-gray-300 dark:border-gray-600
                                bg-white dark:bg-gray-700
                                text-gray-900 dark:text-gray-100
                                placeholder-gray-400 dark:placeholder-gray-500
                                transition-colors duration-300
                            "
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                        />

                        <InputFechaCaducidad
                            value={fechaCaducidad}
                            onChange={setFechaCaducidad}
                        />

                        <InputTextArea />

                        <Boton
                            type="submit"
                            disabled={loading}
                            estilo='anadir'
                        >
                            {loading ? "Guardando..." : "Guardar"}
                        </Boton>
                    </form>
                </aside>
            </div>
        </>
    )
}

export default AnadirAlimentos