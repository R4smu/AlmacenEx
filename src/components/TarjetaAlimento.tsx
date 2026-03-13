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
  fecha?: string
  fechaRaw?: string
  cantidad?: number | string
  imagen_url?: string | null
  categorias?: Categoria[]
  idCategoriaActual?: string
  confirmandoEliminar?: boolean
  onSolicitarEliminar?: () => void
  onCancelarEliminar?: () => void
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
  confirmandoEliminar = false,
  onSolicitarEliminar,
  onCancelarEliminar,
  onEliminar,
  onGuardar,
  children
}: TarjetaAlimentoProps) => {
  // Extraemos t() al principio del componente para poder usarlo en todos los return
  const { t } = useTranslation()

  const [editando, setEditando] = useState(false)
  const [guardando, setGuardando] = useState(false)

  const [nombreEdit, setNombreEdit] = useState(nombre_alimento)
  const [fechaEdit, setFechaEdit] = useState(fechaRaw)
  const [cantidadEdit, setCantidadEdit] = useState(Number(cantidad))
  const [categoriaEdit, setCategoriaEdit] = useState(idCategoriaActual)

  const handleEditar = () => {
    setNombreEdit(nombre_alimento)
    setFechaEdit(fechaRaw)
    setCantidadEdit(Number(cantidad))
    setCategoriaEdit(idCategoriaActual)
    setEditando(true)
  }

  const handleCancelar = () => setEditando(false)

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
    return (
      <div className="flex flex-col w-full rounded-xl shadow-[0px_2px_4px_0px_black] bg-white dark:bg-gray-700 transition-colors overflow-hidden p-4 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {t('tarjetaAlimento.editLabels.nombre')}
          </label>
          <input
            type="text"
            value={nombreEdit}
            onChange={e => setNombreEdit(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {t('tarjetaAlimento.editLabels.categoria')}
          </label>
          <select
            value={categoriaEdit}
            onChange={e => setCategoriaEdit(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none"
          >
            {categorias.map(cat => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {/* Se asume que la categoría viene traducida o mapeada */}
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {t('tarjetaAlimento.editLabels.cantidad')}
            </label>
            <input
              type="number"
              min={1}
              value={cantidadEdit}
              onChange={e => setCantidadEdit(Number(e.target.value))}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {t('tarjetaAlimento.editLabels.fecha')}
            </label>
            <input
              type="date"
              value={fechaEdit}
              onChange={e => setFechaEdit(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-1">
          <button
            onClick={handleCancelar}
            style={{ border: 'none' }}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors cursor-pointer"
          >
            <MdOutlineClose size={16} /> {t('tarjetaAlimento.actions.cancel')}
          </button>
          <button
            onClick={handleGuardar}
            disabled={guardando || !nombreEdit || !fechaEdit || !cantidadEdit}
            style={{ border: 'none' }}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <MdOutlineCheck size={16} /> {guardando ? t('tarjetaAlimento.actions.saving') : t('tarjetaAlimento.actions.save')}
          </button>
        </div>
      </div>
    )
  }

  // ── CONFIRMACIÓN BORRADO ──────────────────────────────────
  if (confirmandoEliminar) {
    return (
      <div className="flex flex-col w-full rounded-xl shadow-[0px_2px_4px_0px_black] bg-white dark:bg-gray-700 transition-colors overflow-hidden p-5 gap-3">
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          {t('tarjetaAlimento.confirmDelete.title', { nombre: nombre_alimento })}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t('tarjetaAlimento.confirmDelete.warning')}
        </p>
        <div className="flex gap-2 justify-end mt-1">
          <button
            onClick={onCancelarEliminar}
            style={{ border: 'none' }}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors cursor-pointer"
          >
            <MdOutlineClose size={16} /> {t('tarjetaAlimento.actions.cancel')}
          </button>
          <button
            onClick={onEliminar}
            style={{ border: 'none' }}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-red-500 text-white text-sm hover:bg-red-600 transition-colors cursor-pointer"
          >
            <FaRegTrashCan size={14} /> {t('tarjetaAlimento.actions.delete')}
          </button>
        </div>
      </div>
    )
  }

  // ── MODO NORMAL ───────────────────────────────────────────
  return (
    <div className="flex w-full min-h-38 justify-between rounded-xl shadow-[0px_2px_4px_0px_black] bg-white dark:bg-gray-700 transition-colors overflow-hidden">

      {imagen_url && (
        <div className="w-28 shrink-0">
          <img src={imagen_url} alt={nombre_alimento} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex flex-col justify-between flex-1 px-4 py-3 gap-2">
        <p className="font-semibold text-gray-800 dark:text-white text-base">{nombre_alimento}</p>

        <div className="flex flex-row flex-wrap items-center gap-2">
          {children}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <CiCalendar size={18} />
          <span>{t('tarjetaAlimento.caduca', { fecha: fecha })}</span>
          <span>·</span>
          <span>{t('tarjetaAlimento.quantity', { cantidad: cantidad })}</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start p-2 gap-1">
        <button
          style={{ border: 'none' }}
          className="p-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors bg-transparent"
          title={t('tarjetaAlimento.actions.edit')}
          onClick={handleEditar}
        >
          <FiEdit size={20} />
        </button>

        <button
          style={{ border: 'none' }}
          className="p-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors bg-transparent"
          title={t('tarjetaAlimento.actions.delete')}
          onClick={onSolicitarEliminar}
        >
          <FaRegTrashCan size={20} />
        </button>
      </div>
    </div>
  )
}

export default TarjetaAlimento