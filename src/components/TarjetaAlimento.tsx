import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";

import Etiqueta from './Etiqueta'

const TarjetaAlimento = ({nombre_alimento, fecha, cantidad} : any) => {
  return (
    <>
      <div className="flex h-[150px] w-[610px] justify-between rounded-xl shadow-[0px_2px_4px_0px_black]">

        <div className="flex flex-col items-start justify-around ml-[10px]">
          <p>{nombre_alimento}</p>
          
          <div className="flex flex-row items-start justify-around gap-2">
            <Etiqueta texto="a punto" tipo="apunto" />
            <Etiqueta texto="Lácteos" tipo="lacteos" />
          </div>
            
          <div className="flex items-center justify-evenly text-gray-500 gap-2">
              <CiCalendar />
              <p>{fecha}</p>
              <p>Cantidad: {cantidad}</p>
          </div>
        </div>

        <div className="flex m-[10px]">

          <div className="flex px-[10px] text-gray-500">
            <FiEdit />
          </div>

          <div className="flex px-[10px] text-gray-500">
            <FaRegTrashCan />
          </div>

        </div>
      </div>
    </>
  );
};

export default TarjetaAlimento;