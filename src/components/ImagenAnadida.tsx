import { useTranslation } from "react-i18next";

type Props = {
  onFileSelect: (file: File | null) => void
}

export default function ImagenAnadida({ onFileSelect }: Props) {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0])
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {t('imagenAnadida.label')}
      <button>
        {t('imagenAnadida.button')}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </button>
    </div>
  )
}