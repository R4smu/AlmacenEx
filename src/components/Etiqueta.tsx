import "../App.css";

import { LuMilk, LuApple, LuFish, LuCarrot } from "react-icons/lu";
import { GiMeat } from "react-icons/gi";
import { FaBreadSlice } from "react-icons/fa6";
import { WiSnowflakeCold } from "react-icons/wi";

const ICONOS: any = {
  lacteos: LuMilk,
  fruta: LuApple,
  pescados: LuFish,
  verdura: LuCarrot,
  carne: GiMeat,
  panaderia: FaBreadSlice,
  congelados: WiSnowflakeCold,
};

const Etiqueta = ({ texto, tipo }: any) => {

  const IconoComponente = ICONOS[tipo];

  const claseEstilo = `etiqueta-${tipo}`;

  return (
    <div className={claseEstilo}>
        {IconoComponente && <IconoComponente className="etiqueta-icono" />}
        {texto}
    </div>
  );
};

export default Etiqueta;