import { useTranslation } from 'react-i18next';

const BotonIdioma = () => {
  const { i18n } = useTranslation();

  const idiomaActual = i18n.language || 'es';
  const esEspanol = idiomaActual.startsWith('es');

  const toggleLanguage = () => {
    const nextLang = esEspanol ? 'en' : 'es';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors border border-emerald-600 dark:border-slate-600 flex items-center justify-center min-w-[40px]"
      title="Cambiar idioma / Change language"
    >
      <span className="text-white font-semibold text-sm">
        {esEspanol ? 'EN' : 'ES'}
      </span>
    </button>
  );
};

export default BotonIdioma;