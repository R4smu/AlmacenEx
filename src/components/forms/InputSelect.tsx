import type { SelectHTMLAttributes } from "react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

interface Option {
  value: string;
  name: string;
}

export default function InputSelect({ options, ...props }: SelectProps) {
  return (
    <div>
      Categoria *
      <select {...props} className="w-100 p-2 flex items-center gap-2 rounded border">

        <option value="">Selecciona categoría</option>

        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}

      </select>
    </div>
  )
}