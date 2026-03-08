import { useTranslation } from "react-i18next";

type Props = {
  value: string
  onChange: (value: string) => void
}

const FechaCaducidad = ({ value, onChange }: Props) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col">
      {t('formularios.labels.fechaCaducidad')}
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