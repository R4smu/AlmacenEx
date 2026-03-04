import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";

const TarjetaAlimento = ({nombre_alimento, fecha, cantidad, children} : any) => {
  return (
    <>
      <div className="flex h-37.5 w-full justify-between rounded-xl shadow-[0px_2px_4px_0px_black] bg-white dark:bg-gray-800 transition-colors">

        <div className="flex flex-col items-start justify-normal ml-4 gap-3">
          <p className="mt-4 font-semibold text-gray-800 dark:text-white">{nombre_alimento}</p>
          
          <div className="flex flex-row items-start justify-around gap-2">
            {children}
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
    </>
  );
};

export default TarjetaAlimento;