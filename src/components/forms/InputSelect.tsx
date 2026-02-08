import type { SelectHTMLAttributes } from "react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[];
}

interface Option {
    value: string;
    name: string;
}

export default function Select({options, ...props }: SelectProps) {
    return (
        <div>
            Categoria *
            <select {...props} className="w-100 p-2 flex items-center gap-2 rounded border">
                {options.map(option=>
                    <option value={option.value}>{option.name}</option>
                )}                
            </select>
        </div>
    )
}