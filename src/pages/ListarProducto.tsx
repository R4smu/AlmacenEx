import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import InputBuscarAlimentos from '../components/InputBuscarAlimentos'
import Boton from '../components/Boton'
import TarjetaAlimento from '../components/TarjetaAlimento'
import Etiqueta from '../components/Etiqueta'
import GraficoCategoria from '../components/GraficoCategoria'
import "../index.css"
import '../App.css'

const CATEGORIA_MAP: Record<string, string> = {
  "Carne":      "carne",
  "Pescado":    "pescados",
  "Lácteos":    "lacteos",
  "Fruta":      "fruta",
  "Verdura":    "verdura",
  "Panadería":  "panaderia",
  "Congelados": "congelados",
}

function calcularEstado(fecha: string): "caducado" | "apunto" | "nocaducado" {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const [anio, mes, dia] = fecha.split("-").map(Number)
  const fechaObj = new Date(anio, mes - 1, dia)
  const diffDias = (fechaObj.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
  if (diffDias < 0) return "caducado"
  if (diffDias <= 3) return "apunto"
  return "nocaducado"
}

const ESTADO_TEXTO: Record<string, string> = {
  caducado:   "Caducado",
  apunto:     "Caduca pronto",
  nocaducado: "En buen estado",
}

const CATEGORIA_BOTONES: Array<{ estilo: any; label: string; valor: string }> = [
  { estilo: "carne",      label: "Carne",      valor: "Carne" },
  { estilo: "pescado",    label: "Pescado",    valor: "Pescado" },
  { estilo: "verdura",    label: "Verdura",    valor: "Verdura" },
  { estilo: "panaderia",  label: "Panadería",  valor: "Panadería" },
  { estilo: "lacteos",    label: "Lácteos",    valor: "Lácteos" },
  { estilo: "congelados", label: "Congelados", valor: "Congelados" },
  { estilo: "fruta",      label: "Fruta",      valor: "Fruta" },
]

interface Categoria {
  id_categoria: string
  nombre: string
}

interface Alimento {
  id_alimento: string
  id_producto: string | null
  cantidad: number
  unidad_medida: string | null
  fecha_caducidad: string
  imagen_url: string | null
  productos: {
    nombre: string
    foto_producto: string | null
    id_categoria: string | null
    categorias: {
      nombre: string
    } | null
  } | null
}

export const ListarProducto = () => {
  const [alimentos, setAlimentos] = useState<Alimento[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarCategorias = async () => {
      const { data } = await supabase
        .from("categorias")
        .select("id_categoria, nombre")
        .order("nombre", { ascending: true })
      setCategorias(data ?? [])
    }
    cargarCategorias()
  }, [])

  useEffect(() => {
    const cargarAlimentos = async () => {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data, error } = await supabase
        .from("alimentos_registrados")
        .select(`
          id_alimento,
          id_producto,
          cantidad,
          unidad_medida,
          fecha_caducidad,
          imagen_url,
          productos (
            nombre,
            foto_producto,
            id_categoria,
            categorias (
              nombre
            )
          )
        `)
        .eq("id_usuario", user.id)
        .eq("estado", "activo")
        .order("fecha_caducidad", { ascending: true })

      if (error) {
        console.error("Error cargando alimentos:", error)
      } else {
        setAlimentos((data as unknown as Alimento[]) ?? [])
      }
      setLoading(false)
    }
    cargarAlimentos()
  }, [])

  const handleEliminar = async (id: string) => {
    if (!window.confirm("¿Seguro que quieres eliminar este alimento?")) return
    const { error } = await supabase
      .from("alimentos_registrados")
      .update({ estado: "eliminado" })
      .eq("id_alimento", id)

    if (error) {
      alert("Error al eliminar: " + error.message)
    } else {
      setAlimentos(prev => prev.filter(a => a.id_alimento !== id))
    }
  }

  const handleGuardar = async (
    id: string,
    idProductoActual: string | undefined,
    datos: { nombre: string; fecha_caducidad: string; cantidad: number; id_categoria: string }
  ) => {
    if (idProductoActual) {
      const { error } = await supabase
        .from("productos")
        .update({ nombre: datos.nombre, id_categoria: datos.id_categoria })
        .eq("id_producto", idProductoActual)

      if (error) {
        alert("Error actualizando producto: " + error.message)
        return
      }
    }

    const { error } = await supabase
      .from("alimentos_registrados")
      .update({ cantidad: datos.cantidad, fecha_caducidad: datos.fecha_caducidad })
      .eq("id_alimento", id)

    if (error) {
      alert("Error actualizando alimento: " + error.message)
      return
    }

    const categoriaNueva = categorias.find(c => c.id_categoria === datos.id_categoria) ?? null

    setAlimentos(prev => prev.map(a => {
      if (a.id_alimento !== id) return a
      return {
        ...a,
        cantidad: datos.cantidad,
        fecha_caducidad: datos.fecha_caducidad,
        productos: a.productos
          ? {
              ...a.productos,
              nombre: datos.nombre,
              id_categoria: datos.id_categoria,
              categorias: categoriaNueva
                ? { nombre: categoriaNueva.nombre }
                : a.productos.categorias,
            }
          : a.productos,
      }
    }))
  }

  const getImagen = (a: Alimento) =>
    a.imagen_url ?? a.productos?.foto_producto ?? null

  const alimentosFiltrados = alimentos.filter(a => {
    const categoriaNombre = a.productos?.categorias?.nombre ?? ""
    const nombreProducto = a.productos?.nombre?.toLowerCase() ?? ""
    const pasaCategoria = filtroCategoria ? categoriaNombre === filtroCategoria : true
    const pasaBusqueda = busqueda.trim() === ""
      ? true
      : nombreProducto.includes(busqueda.toLowerCase())
    return pasaCategoria && pasaBusqueda
  })

  const datosGrafico = alimentos.map(a => ({
    categoria: CATEGORIA_MAP[a.productos?.categorias?.nombre ?? ""] ?? ""
  }))

  return (
    <div className="w-full overflow-x-hidden bg-white dark:bg-gray-800 min-h-screen transition-colors">

      {/* Buscador */}
      <div className="flex justify-center px-4 md:px-10 pt-8 pb-4">
        <InputBuscarAlimentos value={busqueda} onChange={setBusqueda} />
      </div>

      {/* Botones categoría — flex-wrap para que se adapten en móvil */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4 md:px-6 pb-4">
        {CATEGORIA_BOTONES.map(({ estilo, label, valor }) => (
          <Boton
            key={valor}
            estilo={estilo}
            style={{
              outline: filtroCategoria === valor ? '3px solid #009966' : undefined,
              outlineOffset: '2px',
            }}
            onClick={() => setFiltroCategoria(filtroCategoria === valor ? null : valor)}
          >
            {label}
          </Boton>
        ))}
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-10 py-4 max-w-8xl mx-auto">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400 col-span-2 text-center py-10">
            Cargando alimentos...
          </p>
        ) : alimentosFiltrados.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 col-span-2 text-center py-10">
            No hay alimentos registrados{filtroCategoria ? ` en "${filtroCategoria}"` : ""}.
          </p>
        ) : (
          alimentosFiltrados.map(alimento => {
            const categoriaNombre = alimento.productos?.categorias?.nombre ?? ""
            const categoriaKey = CATEGORIA_MAP[categoriaNombre] ?? ""
            const estado = alimento.fecha_caducidad
              ? calcularEstado(alimento.fecha_caducidad)
              : "nocaducado"
            const fechaFormateada = alimento.fecha_caducidad
              ? alimento.fecha_caducidad.split("-").reverse().join("/")
              : "Sin fecha"

            return (
              <TarjetaAlimento
                key={alimento.id_alimento}
                nombre_alimento={alimento.productos?.nombre ?? "Sin nombre"}
                fecha={fechaFormateada}
                fechaRaw={alimento.fecha_caducidad ?? ""}
                cantidad={alimento.cantidad}
                imagen_url={getImagen(alimento)}
                categorias={categorias}
                idCategoriaActual={alimento.productos?.id_categoria ?? ""}
                onEliminar={() => handleEliminar(alimento.id_alimento)}
                onGuardar={(datos) =>
                  handleGuardar(
                    alimento.id_alimento,
                    alimento.id_producto ?? undefined,
                    datos
                  )
                }
              >
                <Etiqueta texto={ESTADO_TEXTO[estado]} tipo={estado} />
                {categoriaKey && (
                  <Etiqueta texto={categoriaNombre} tipo={categoriaKey} />
                )}
              </TarjetaAlimento>
            )
          })
        )}
      </div>

      {/* Gráfico */}
      <div className="px-4 md:px-10 py-4 max-w-md mx-auto">
        <GraficoCategoria alimentos={datosGrafico} />
      </div>
    </div>
  )
}