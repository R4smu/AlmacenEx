import InputBuscarAlimentos from '../components/InputBuscarAlimentos'
import Boton from '../components/Boton'
import TarjetaAlimento from '../components/TarjetaAlimento'
import Etiqueta from '../components/Etiqueta'
import GraficoCategoria from '../components/GraficoCategoria'
import "../index.css"
import '../App.css'

const alimentosPrueba = [
  { categoria: "carne" },
  { categoria: "carne" },
  { categoria: "lacteos" },
  { categoria: "fruta" },
  { categoria: "fruta" },
  { categoria: "fruta" },
  { categoria: "verdura" },
  { categoria: "congelados" },
]

export const ListarProducto = () => {
  return (
    <div className="w-full overflow-x-hidden bg-white dark:bg-gray-800 min-h-screen transition-colors">
      <div className='flex justify-center gap-3 p-10'>
        <InputBuscarAlimentos></InputBuscarAlimentos>
      </div>
      <div className="flex justify-evenly flex-wrap gap-3 p-4">
        <Boton estilo='carne' style={{ width: '160px' }}>Carne</Boton>
        <Boton estilo='pescado' style={{ width: '160px' }}>Pescado</Boton>
        <Boton estilo='verdura' style={{ width: '160px' }}>Verdura</Boton>
        <Boton estilo='panaderia' style={{ width: '160px' }}>Panaderia</Boton>
        <Boton estilo='lacteos' style={{ width: '160px' }}>Lacteos</Boton>
        <Boton estilo='congelados' style={{ width: '160px' }}>Congelados</Boton>
        <Boton estilo='fruta' style={{ width: '160px' }}>Fruta</Boton>
      </div>

      <div className="grid grid-cols-2 gap-12 p-10 max-w-8xl mx-auto">
        <TarjetaAlimento><Etiqueta texto="Caducado" tipo="caducado"></Etiqueta></TarjetaAlimento>
        <TarjetaAlimento></TarjetaAlimento>
        <TarjetaAlimento></TarjetaAlimento>
        <TarjetaAlimento></TarjetaAlimento>
        <TarjetaAlimento></TarjetaAlimento>
        <TarjetaAlimento></TarjetaAlimento>
      </div>

      {/* Gráfico de categorías */}
      <div className="px-10 py-4 max-w-md mx-auto">
        <GraficoCategoria alimentos={alimentosPrueba} />
      </div>
    </div>
  )
}