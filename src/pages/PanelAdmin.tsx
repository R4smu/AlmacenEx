import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts"
import { FaRegTrashCan } from "react-icons/fa6"
import { FiShield, FiUsers, FiUserCheck } from "react-icons/fi"

interface Usuario {
  id_usuario: string
  nombre: string | null
  fecha_registro: string | null
  roles: { nombre: string } | null
}

interface DatoGrafica {
  fecha: string
  registrados: number
  activos: number
}

function formatearFecha(iso: string) {
  const [, mes, dia] = iso.split("T")[0].split("-")
  return `${dia}/${mes}`
}

function ultimosDias(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (n - 1 - i))
    return d.toISOString().split("T")[0]
  })
}

const PanelAdmin = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [datosGrafica, setDatosGrafica] = useState<DatoGrafica[]>([])
  const [loading, setLoading] = useState(true)
  const [eliminando, setEliminando] = useState<string | null>(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const calcularGrafica = (lista: Usuario[]) => {
    const dias = ultimosDias(14)
    const registrosPorDia: Record<string, number> = {}
    dias.forEach(d => { registrosPorDia[d] = 0 })

    lista.forEach(u => {
      if (!u.fecha_registro) return
      const dia = u.fecha_registro.split("T")[0]
      if (registrosPorDia[dia] !== undefined) registrosPorDia[dia]++
    })

    const datos: DatoGrafica[] = dias.map(dia => ({
      fecha: formatearFecha(dia + "T00:00:00"),
      registrados: registrosPorDia[dia],
      activos: lista.filter(u =>
        u.fecha_registro && u.fecha_registro.split("T")[0] <= dia
      ).length,
    }))

    setDatosGrafica(datos)
  }

  const cargarDatos = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("usuarios")
      .select("id_usuario, nombre, fecha_registro, roles(nombre)")
      .order("fecha_registro", { ascending: false })

    if (error) {
      console.error("Error cargando usuarios:", error)
    } else {
      const lista = (data as unknown as Usuario[]) ?? []
      setUsuarios(lista)
      calcularGrafica(lista)
    }

    setLoading(false)
  }

  const handleEliminar = async (idUsuario: string, nombre: string | null) => {
    if (!window.confirm(`¿Eliminar al usuario "${nombre ?? idUsuario}"? Esta acción no se puede deshacer.`)) return
    setEliminando(idUsuario)

    const { error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id_usuario", idUsuario)

    if (error) {
      alert("Error eliminando usuario: " + error.message)
    } else {
      const nuevaLista = usuarios.filter(u => u.id_usuario !== idUsuario)
      setUsuarios(nuevaLista)
      calcularGrafica(nuevaLista)
    }
    setEliminando(null)
  }

  const totalUsuarios = usuarios.length
  const totalAdmins = usuarios.filter(u => u.roles?.nombre === "admin").length

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors p-8">

      {/* Cabecera */}
      <div className="flex items-center gap-3 mb-8">
        <FiShield size={28} className="text-emerald-600 dark:text-emerald-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Panel de Administración</h1>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow p-6 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-xl">
            <FiUsers size={24} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total usuarios</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{totalUsuarios}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
            <FiUserCheck size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Registros hoy</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {datosGrafica[datosGrafica.length - 1]?.registrados ?? 0}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow p-6 flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-xl">
            <FiShield size={24} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Administradores</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{totalAdmins}</p>
          </div>
        </div>
      </div>

      {/* Gráfica */}
      <div className="bg-white dark:bg-gray-700 rounded-2xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-6">
          Actividad de usuarios — últimos 14 días
        </h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={datosGrafica}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="fecha" stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderColor: "#e5e7eb",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="registrados"
              name="Registros del día"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#fff", stroke: "#10b981", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="activos"
              name="Usuarios acumulados"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#fff", stroke: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white dark:bg-gray-700 rounded-2xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-600">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Usuarios registrados</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400 dark:text-gray-500">Cargando usuarios...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300">Nombre</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300">ID</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300">Rol</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300">Registro</th>
                  <th className="px-6 py-3 text-center font-medium text-gray-500 dark:text-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-600">
                {usuarios.map(u => (
                  <tr key={u.id_usuario} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                      {u.nombre ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                      {u.id_usuario.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        u.roles?.nombre === "admin"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-500 dark:text-gray-200"
                      }`}>
                        {u.roles?.nombre ?? "sin rol"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {u.fecha_registro
                        ? new Date(u.fecha_registro).toLocaleDateString("es-ES")
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {u.roles?.nombre !== "admin" ? (
                        <button
                          onClick={() => handleEliminar(u.id_usuario, u.nombre)}
                          disabled={eliminando === u.id_usuario}
                          style={{ border: "none" }}
                          className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors bg-transparent cursor-pointer disabled:opacity-40"
                          title="Eliminar usuario"
                        >
                          <FaRegTrashCan size={16} />
                        </button>
                      ) : (
                        <span className="text-xs text-gray-300 dark:text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default PanelAdmin