import { useState } from 'react';
import { supabase } from '../supabaseClient';
import Boton from '../components/Boton';
import { useNavigate, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Registro() {
    const { t } = useTranslation();

    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [repetirContrasena, setRepetirContrasena] = useState('');
    const [guardarContrasena, setGuardarContrasena] = useState(false);
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const contrasenasCoinciden = contrasena && repetirContrasena && contrasena === repetirContrasena;
    const contrasenasNoCoinciden = contrasena && repetirContrasena && contrasena !== repetirContrasena;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (contrasena !== repetirContrasena) {
            setError(t('alertas.errorContrasenasNoCoinciden'));
            return;
        }

        if (contrasena.length < 6) {
            setError(t('authForms.registro.validacion.longitud'));
            return;
        }

        setLoading(true);

        const { data, error: authError } = await supabase.auth.signUp({
            email,
            password: contrasena,
            options: { data: { nombre: usuario } }
        });

        setLoading(false);

        if (authError) {
            setError(authError.message);
            return;
        }

        if (!data.user) {
            setError(t('alertas.errorCrearUsuario'));
            return;
        }

        navigate('/landingPage');
    };

    return (
        <div className="flex flex-1 bg-gray-50 dark:bg-gray-800 transition-colors">

            {/* Columna izquierda: Nuevo diseño */}
            <div className="hidden md:flex w-3/4 bg-gray-200 dark:bg-gray-800 items-center justify-center p-12 relative overflow-hidden">
                <div className="max-w-md relative z-10">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-4">
                        {t('authForms.registro.brand')}
                    </span>
                    <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                        {t('authForms.registro.slogan')}
                    </h2>
                    <div className="w-12 h-1 bg-emerald-500 rounded mb-6"></div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                        {t('authForms.registro.descripcion')}
                    </p>
                </div>
                {/* Decoración de fondo */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500 dark:bg-emerald-700 opacity-10 rounded-full translate-x-16 translate-y-16"></div>
                <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500 dark:bg-emerald-700 opacity-10 rounded-full -translate-x-10 -translate-y-10"></div>
            </div>

            {/* Columna derecha */}
            <div className="w-full md:w-2/4 flex items-center justify-center p-12 bg-white dark:bg-gray-900 transition-colors">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
                        {t('authForms.registro.titulo')}
                    </h1>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
                        {t('authForms.registro.subtitulo')}
                    </p>

                    {/* Alerta de errores */}
                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('authForms.registro.labels.usuario')}
                            </label>
                            <input
                                type="text"
                                id="usuario"
                                value={usuario}
                                onChange={(e) => { setUsuario(e.target.value); setError(''); }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border-2 border-transparent focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                                placeholder={t('authForms.registro.placeholders.usuario')}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('authForms.registro.labels.email')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border-2 border-transparent focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                                placeholder={t('authForms.registro.placeholders.email')}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('authForms.registro.labels.contrasena')}
                            </label>
                            <input
                                type="password"
                                id="contrasena"
                                value={contrasena}
                                onChange={(e) => { setContrasena(e.target.value); setError(''); }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border-2 border-transparent focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                                placeholder={t('authForms.registro.placeholders.contrasena')}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="repetircontrasena" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('authForms.registro.labels.repetirContrasena')}
                            </label>
                            <input
                                type="password"
                                id="repetircontrasena"
                                value={repetirContrasena}
                                onChange={(e) => { setRepetirContrasena(e.target.value); setError(''); }}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border-2 focus:outline-none transition-colors text-gray-800 placeholder-gray-400
                                    ${contrasenasNoCoinciden ? 'border-red-400' : ''}
                                    ${contrasenasCoinciden ? 'border-emerald-500' : ''}
                                    ${!contrasena || !repetirContrasena ? 'border-transparent focus:border-emerald-500' : ''}
                                `}
                                placeholder={t('authForms.registro.placeholders.repetirContrasena')}
                                required
                            />
                            {contrasenasNoCoinciden && (
                                <p className="text-xs text-red-500 mt-1">{t('authForms.registro.validacion.noCoinciden')}</p>
                            )}
                            {contrasenasCoinciden && (
                                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{t('authForms.registro.validacion.coinciden')}</p>
                            )}
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-center space-x-2 pt-2">
                            <input
                                type="checkbox"
                                id="guardarContrasena"
                                checked={guardarContrasena}
                                onChange={(e) => setGuardarContrasena(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <label htmlFor="guardarContrasena" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                                {t('authForms.registro.labels.guardarContrasena')}
                            </label>
                        </div>

                        <div className="pt-2">
                            <Boton estilo="acceso" type="submit" disabled={loading}>
                                {loading ? t('authForms.registro.estados.registrando') : t('authForms.registro.boton')}
                            </Boton>
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                        {t('authForms.registro.enlaces.yaTienes')}{' '}
                        <NavLink to="/login" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
                            {t('authForms.registro.enlaces.iniciaSesion')}
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Registro;