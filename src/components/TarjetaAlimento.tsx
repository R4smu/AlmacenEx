import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";

//import Etiqueta.tsx
const TarjetaAlimento = () => {
  return (
    <>
      <div className="flex h-[150px] w-[610px] justify-between rounded-xl shadow-[0px_2px_4px_0px_black]">

        <div className="flex flex-col items-start justify-around ml-[10px]">
          <p>Hola</p>
          <p>Hola</p>

          <div className="flex items-center justify-evenly text-gray-500">
            <CiCalendar />
            <p>Hola</p>
          </div>
        </div>

        <div className="flex m-[10px]">

          <div className="flex px-[10px]">
            <FiEdit />
          </div>

          <div className="flex px-[10px]">
            <FaRegTrashCan />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default TarjetaAlimento;