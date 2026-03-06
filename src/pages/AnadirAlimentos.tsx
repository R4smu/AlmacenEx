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
                <aside className="h-full bg-gray-50 flex p-6">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md bg-white p-6 rounded shadow space-y-4"
                    >                        <h1 className="text-xl font-semibold">
                            Añadir alimentos
                        </h1>

                        <div className="flex flex-col gap-2">
                            <strong>Imagen</strong>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className='border rounded w-60 p-1 cursor-pointer'
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    className="w-32 rounded"
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
                            ]} />

                        <input
                            type="number"
                            placeholder="Cantidad"
                            className="w-100 p-2 flex items-center gap-2 rounded border"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                        />

                        <InputFechaCaducidad
                            value={fechaCaducidad}
                            onChange={setFechaCaducidad}
                        />

                        <InputTextArea />

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </form>
                </aside>
            </div>
        </>
    )
}

export default AnadirAlimentos