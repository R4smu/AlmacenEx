import "../App.css";
import { LuMilk, LuApple, LuFish, LuCarrot } from "react-icons/lu";
import { GiMeat } from "react-icons/gi";
import { FaBreadSlice } from "react-icons/fa6";
import { WiSnowflakeCold } from "react-icons/wi";

const ICONOS: Record<string, any> = {
  lacteos:    LuMilk,
  fruta:      LuApple,
  pescados:   LuFish,
  verdura:    LuCarrot,
  carne:      GiMeat,
  panaderia:  FaBreadSlice,
  congelados: WiSnowflakeCold,
}

// Estos tipos no llevan icono
const ESTADOS = new Set(["caducado", "apunto", "nocaducado"])

const Etiqueta = ({ texto, tipo }: { texto: string; tipo: string }) => {
  const IconoComponente = ICONOS[tipo]
  const claseEstilo = `etiqueta-${tipo}`

  return (
    <div className={claseEstilo}>
      {!ESTADOS.has(tipo) && IconoComponente && (
        <IconoComponente />
      )}
      {texto}
    </div>
  )
}

export default Etiqueta
