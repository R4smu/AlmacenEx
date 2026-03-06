type Props = {
  value: string
  onChange: (value: string) => void
}

const InputNombreProducto = ({ value, onChange }: Props) => {
  return (
    <div className="flex flex-col">
      Nombre *
      <input
        className="w-100 p-2 rounded border"
        type="text"
        placeholder="Ej: Leche entera"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default InputNombreProducto