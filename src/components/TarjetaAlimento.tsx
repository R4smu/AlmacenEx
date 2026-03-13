import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";

interface Categoria {
  id_categoria: string
  nombre: string
}

interface TarjetaAlimentoProps {
  nombre_alimento?: string
  fecha?: string                 // "DD/MM/YYYY" para mostrar
  fechaRaw?: string              // "YYYY-MM-DD" para editar
  cantidad?: number | string
  imagen_url?: string | null
  categorias?: Categoria[]
  idCategoriaActual?: string
  onEliminar?: () => void
  onGuardar?: (datos: { nombre: string; fecha_caducidad: string; cantidad: number; id_categoria: string }) => Promise<void>
  children?: React.ReactNode
}

const TarjetaAlimento = ({
  nombre_alimento = "Sin nombre",
  fecha = "—",
  fechaRaw = "",
  cantidad = "—",
  imagen_url,
  categorias = [],
  idCategoriaActual = "",
  onEliminar,
  onGuardar,
  children
}: TarjetaAlimentoProps) => {

  const [editando, setEditando] = useState(false)
  const [guardando, setGuardando] = useState(false)

  // Campos editables
  const [nombreEdit, setNombreEdit] = useState(nombre_alimento)
  const [fechaEdit, setFechaEdit] = useState(fechaRaw)
  const [cantidadEdit, setCantidadEdit] = useState(Number(cantidad))
  const [categoriaEdit, setCategoriaEdit] = useState(idCategoriaActual)

  const handleEditar = () => {
    // Resetear a valores actuales al abrir
    setNombreEdit(nombre_alimento)
    setFechaEdit(fechaRaw)
    setCantidadEdit(Number(cantidad))
    setCategoriaEdit(idCategoriaActual)
    setEditando(true)
  }

  const handleCancelar = () => {
    setEditando(false)
  }

  const handleGuardar = async () => {
    if (!onGuardar) return
    setGuardando(true)
    await onGuardar({
      nombre: nombreEdit,
      fecha_caducidad: fechaEdit,
      cantidad: cantidadEdit,
      id_categoria: categoriaEdit,
    })
    setGuardando(false)
    setEditando(false)
  }

  // ── MODO EDICIÓN ──────────────────────────────────────────
  if (editando) {
    const { t } = useTranslation();

  return (
      <div className="flex flex-col w-full rounded-xl shadow-[0px_2px_4px_0px_black] bg-white dark:bg-gray-700 transition-colors overflow-hidden p-4 gap-3">

        {/* Nombre */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Nombre</label>
          <input
            type="text"
            value={nombreEdit}
            onChange={e => setNombreEdit(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
          />
        </div>

        {/* Categoría */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Categoría</label>
          <select
            value={categoriaEdit}
            onChange={e => setCategoriaEdit(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
          >
            {categorias.map(cat => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Cantidad y Fecha en fila */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Cantidad</label>
            <input
              type="number"
              min={1}
              value={cantidadEdit}
              onChange={e => setCantidadEdit(Number(e.target.value))}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
            />
          </div>
            
          <div className="flex items-center justify-evenly text-gray-500 dark:text-gray-400 font-normal gap-2">
            <CiCalendar size={20} />
            <p>{fecha}</p>
            <p>Cantidad: {cantidad}</p>
          </div>
        </div>

        <div className="flex m-2.5 items-start gap-2">

          <button style={{ border: 'none' }} className="flex p-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors bg-transparent" title="Editar">
            <FiEdit size={20} />
          </button>

          <button style={{ border: 'none' }} className="flex p-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors bg-transparent" title="Borrar">
            <FaRegTrashCan size={20} />
          </button>
        </div>
      </div>
    )
  }

  // ── MODO NORMAL ───────────────────────────────────────────
  return (
    <div className="flex w-full min-h-[9.5rem] justify-between rounded-xl shadow-[0px_2px_4px_0px_black] bg-white dark:bg-gray-700 transition-colors overflow-hidden">

      {/* Imagen */}
      {imagen_url && (
        <div className="w-28 flex-shrink-0">
          <img src={imagen_url} alt={nombre_alimento} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Contenido */}
      <div className="flex flex-col justify-between flex-1 px-4 py-3 gap-2">
        <p className="font-semibold text-gray-800 dark:text-white text-base">{nombre_alimento}</p>

        <div className="flex flex-row flex-wrap items-center gap-2">
          {children}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <CiCalendar size={18} />
          <span>Caduca: {fecha}</span>
          <span>·</span>
          <span>Cantidad: {cantidad}</span>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-col items-center justify-start p-2 gap-1">
        <button
          style={{ border: 'none' }}
          className="p-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors bg-transparent"
          title="Editar"
          onClick={handleEditar}
        >
          <FiEdit size={20} />
        </button>

        <button
          style={{ border: 'none' }}
          className="p-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors bg-transparent"
          title="Borrar"
          onClick={onEliminar}
        >
          <FaRegTrashCan size={20} />
        </button>
      </div>
    </div>
  )
}

export default TarjetaAlimento