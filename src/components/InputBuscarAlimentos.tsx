import { CiSearch } from "react-icons/ci";
import { useTranslation } from "react-i18next";

const InputBuscarAlimentos = () => {
    const { t } = useTranslation();

    return (
        <div className="p-2 flex items-center gap-2 rounded border w-250 border-black dark:border-white">
            <CiSearch className="text-xl text-gray-500 dark:text-white" />
            <input
                type="search"
                placeholder={t('busqueda.placeholder')}
                className="flex-1 outline-none text-gray-500 dark:text-white"
            />
        </div>
    )
}

export default InputBuscarAlimentos