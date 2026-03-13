import '../App.css'
import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

import InputNombreProducto from '../components/forms/InputNombreProducto'
import InputTextArea from '../components/forms/InputTextArea'
import Boton from '../components/Boton'
import "../index.css"
import { useTranslation } from 'react-i18next'

function AnadirAlimentos() {
    const { t } = useTranslation();

    const [nombre, setNombre] = useState("")
    const [categorias, setCategorias] = useState<{ id_categoria: number, nombre: string }[]>([])
    const [idCategoria, setIdCategoria] = useState("")
    const [fechaCaducidad, setFechaCaducidad] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [imagen, setImagen] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const cargarCategorias = async () => {
            const { data, error } = await supabase
                .from("categorias")
                .select("id_categoria, nombre")
                .order("nombre", { ascending: true })

            console.log("Categorías data:", data)
            console.log("Categorías error:", error)

            if (!error && data) {
                setCategorias(data)
            }
        }
        cargarCategorias()
    }, [])

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

        const { data: productoExistente } = await supabase
            .from("productos")
            .select("id_producto")
            .ilike("nombre", nombre)
            .maybeSingle()

        let productoId = productoExistente?.id_producto

        if (!productoId) {
            const { data: nuevoProducto, error: errorProducto } = await supabase
                .from("productos")
                .insert([{
                    nombre: nombre,
                    id_categoria: idCategoria
                }])
                .select("id_producto")
                .single()

            if (errorProducto || !nuevoProducto) {
                alert("Error creando producto: " + errorProducto?.message)
                setLoading(false)
                return
            }

            productoId = nuevoProducto.id_producto
        }

        let imageUrl: string | null = null

        if (imagen) {
            const fileName = `${Date.now()}-${imagen.name}`

            const { error: uploadError } = await supabase.storage
                .from("imagenes-alimentos")
                .upload(fileName, imagen, { cacheControl: '3600', upsert: false })

            if (uploadError) {
                alert("Error subiendo imagen: " + uploadError.message)
                setLoading(false)
                return
            }

            const { data: urlData } = supabase.storage
                .from("imagenes-alimentos")
                .getPublicUrl(fileName)

            imageUrl = urlData.publicUrl
        }

        const { error } = await supabase
            .from("alimentos_registrados")
            .insert([{
                cantidad: Number(cantidad),
                unidad_medida: "unidad",
                fecha_caducidad: fechaCaducidad,
                estado: "activo",
                id_producto: productoId,
                id_usuario: user.id,
                imagen_url: imageUrl
            }])

        if (error) {
            alert("Error: " + error.message)
            setLoading(false)
            return
        }

        alert("¡Alimento añadido correctamente!")
        setNombre("")
        setIdCategoria("")
        setFechaCaducidad("")
        setCantidad("")
        setImagen(null)
        setPreview(null)
        setLoading(false)
    }

    const formularioIncompleto = !nombre || !idCategoria || !fechaCaducidad || !cantidad

    return (
        <div className="flex flex-1 justify-center items-start bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="w-full max-w-md mx-auto p-4 md:p-8">
                <form
                    onSubmit={handleSubmit}
                    className="w-full p-5 md:p-6 rounded shadow space-y-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                >
                    <h1 className="text-xl font-semibold">Añadir alimentos</h1>

                    {/* Imagen */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Imagen</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="border rounded w-full p-1 cursor-pointer border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-200 dark:file:bg-gray-600 file:text-gray-700 dark:file:text-gray-200 transition-colors duration-300"
                        />
                        {preview && (
                            <img src={preview} alt="Preview" className="w-32 rounded border border-gray-200 dark:border-gray-600" />
                        )}
                    </div>

                    {/* Nombre */}
                    <InputNombreProducto value={nombre} onChange={setNombre} />

                    {/* Categoría */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Categoría *</label>
                        {categorias.length === 0 ? (
                            <p className="text-sm text-red-500 dark:text-red-400">
                                No se pudieron cargar las categorías. Revisa la consola.
                            </p>
                        ) : (
                            <select
                                value={idCategoria}
                                onChange={(e) => setIdCategoria(e.target.value)}
                                required
                                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                            >
                                <option value="">Selecciona categoría</option>
                                {categorias.map(cat => (
                                    <option key={cat.id_categoria} value={cat.id_categoria}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Cantidad */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Cantidad *</label>
                        <input
                            type="number"
                            placeholder={t('formularios.placeholders.cantidad')}
                            className="
                                w-100 p-2 flex items-center gap-2 rounded border
                                border-gray-300 dark:border-white
                                bg-white dark:bg-gray-700
                                text-gray-900 dark:text-white
                                placeholder-gray-400 dark:placeholder-white
                                transition-colors duration-300
                            "
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            required
                        />
                    </div>

                    {/* Fecha */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Fecha de caducidad *</label>
                        <input
                            type="date"
                            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                            value={fechaCaducidad}
                            onChange={(e) => setFechaCaducidad(e.target.value)}
                            required
                        />
                    </div>

                    {/* Notas */}
                    <InputTextArea />

                    {/* Botón */}
                    <Boton
                        type="submit"
                        disabled={loading || formularioIncompleto}
                        estilo='anadir'
                        className="w-full"
                    >
                        {loading ? "Guardando..." : "Guardar"}
                    </Boton>
                </form>
            </div>
        </div>
    )
}

export default AnadirAlimentos