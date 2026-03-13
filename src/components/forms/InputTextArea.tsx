import { useTranslation } from "react-i18next";

const TextArea = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col text-black dark:text-white">
            <label>{t('formularios.labels.notas')}</label>
            <textarea className="w-full p-2 flex items-center gap-2 rounded border"
                placeholder={t('formularios.placeholders.notas')}
                rows={5}></textarea>
        </div>
    )
}

export default TextArea