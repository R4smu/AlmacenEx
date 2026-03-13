import { CiSearch } from "react-icons/ci";

interface InputBuscarAlimentosProps {
  value?: string
  onChange?: (value: string) => void
}

const InputBuscarAlimentos = ({ value = "", onChange }: InputBuscarAlimentosProps) => {
  return (
    <div className="p-2 flex items-center gap-2 rounded border w-full md:w-96 border-black dark:border-white">
      <CiSearch className="text-xl text-gray-500 dark:text-white flex-shrink-0" />
      <input
        type="search"
        placeholder="Escribe tu producto aquí..."
        className="flex-1 outline-none text-gray-700 dark:text-white bg-transparent"
        value={value}
        onChange={e => onChange?.(e.target.value)}
      />
    </div>
  )
}

export default InputBuscarAlimentos