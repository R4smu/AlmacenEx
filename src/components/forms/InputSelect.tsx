import type { SelectHTMLAttributes } from "react"
import { useTranslation } from "react-i18next";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

interface Option {
  value: string;
  name: string;
}

export default function InputSelect({ options, ...props }: SelectProps) {
  const { t } = useTranslation();

  return (
    <div>
      {t('formularios.labels.categoria')}
      <select {...props} className="w-100 p-2 flex items-center gap-2 rounded border">

        <option value="">{t('formularios.placeholders.categoria')}</option>

        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}

      </select>
    </div>
  )
}