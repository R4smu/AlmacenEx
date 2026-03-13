import { useTranslation } from "react-i18next";

type Props = {
  value: string
  onChange: (value: string) => void
}

const InputNombreProducto = ({ value, onChange }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {t('formularios.labels.nombre')}
      <input
        className="w-full p-2 rounded border text-gray-700 dark:text-white"
        type="text"
        placeholder={t('formularios.placeholders.nombre')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default InputNombreProducto