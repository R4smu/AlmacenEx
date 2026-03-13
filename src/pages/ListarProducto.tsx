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
  const [errorMsg, setErrorMsg] = useState('')
  const [confirmandoId, setConfirmandoId] = useState<string | null>(null)

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
        setErrorMsg('Error al cargar los alimentos.')
      } else {
        setAlimentos((data as unknown as Alimento[]) ?? [])
      }
      setLoading(false)
    }
    cargarAlimentos()
  }, [])

  const handleEliminar = async (id: string) => {
    const { error } = await supabase
      .from("alimentos_registrados")
      .update({ estado: "eliminado" })
      .eq("id_alimento", id)

    if (error) {
      setErrorMsg('Error al eliminar el alimento.')
    } else {
      setAlimentos(prev => prev.filter(a => a.id_alimento !== id))
      setConfirmandoId(null)
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
        setErrorMsg('Error al actualizar el producto.')
        return
      }
    }

    const { error } = await supabase
      .from("alimentos_registrados")
      .update({ cantidad: datos.cantidad, fecha_caducidad: datos.fecha_caducidad })
      .eq("id_alimento", id)

    if (error) {
      setErrorMsg('Error al actualizar el alimento.')
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

      <div className="flex justify-center gap-3 p-10 pb-4">
        <InputBuscarAlimentos value={busqueda} onChange={setBusqueda} />
      </div>

      <div className="flex justify-evenly flex-wrap gap-3 px-4 pb-6">
        {CATEGORIA_BOTONES.map(({ estilo, label, valor }) => (
          <Boton
            key={valor}
            estilo={estilo}
            style={{
              width: '160px',
              outline: filtroCategoria === valor ? '3px solid #009966' : undefined,
              outlineOffset: '2px',
              transition: 'opacity 0.2s',
              opacity: filtroCategoria && filtroCategoria !== valor ? 0.45 : 1,
            }}
            onClick={() => setFiltroCategoria(filtroCategoria === valor ? null : valor)}
          >
            {label}
          </Boton>
        ))}
      </div>

      {errorMsg && (
        <div className="mx-10 mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 text-sm flex justify-between items-center">
          {errorMsg}
          <button style={{ border: 'none', background: 'none' }} className="text-red-400 hover:text-red-600 ml-4 cursor-pointer" onClick={() => setErrorMsg('')}>✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10 pb-10 max-w-8xl mx-auto">
        {loading ? (
          <div className="col-span-2 flex justify-center items-center py-16">
            <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500">
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Cargando alimentos...</p>
            </div>
          </div>
        ) : alimentosFiltrados.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500 gap-2">
            <p className="text-4xl">🥦</p>
            <p className="text-base font-medium">No hay alimentos registrados{filtroCategoria ? ` en "${filtroCategoria}"` : ""}.</p>
            {filtroCategoria && (
              <button
                style={{ border: 'none', background: 'none' }}
                className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer mt-1"
                onClick={() => setFiltroCategoria(null)}
              >
                Ver todos
              </button>
            )}
          </div>
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
                confirmandoEliminar={confirmandoId === alimento.id_alimento}
                onSolicitarEliminar={() => setConfirmandoId(alimento.id_alimento)}
                onCancelarEliminar={() => setConfirmandoId(null)}
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

      <div className="px-10 py-4 max-w-md mx-auto">
        <GraficoCategoria alimentos={datosGrafico} />
      </div>
    </div>
  )
}