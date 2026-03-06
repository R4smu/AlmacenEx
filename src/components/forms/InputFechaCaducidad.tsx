type Props = {
  value: string
  onChange: (value: string) => void
}

const FechaCaducidad = ({ value, onChange }: Props) => {
  return (
    <div className="flex flex-col">
      Fecha de caducidad *
      <input
        className="w-100 p-2 rounded border"
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default FechaCaducidad