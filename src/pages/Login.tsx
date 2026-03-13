import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Boton from '../components/Boton';

function Login() {
  const { t } = useTranslation();

  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Cambiamos el nombre de la variable de 'error' a 'authError' para que no choque con nuestro estado
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: usuario,
      password: contrasena
    });

    setLoading(false);

    if (authError) {
      setError(t('authForms.login.errores.credenciales'));
      return;
    }

    navigate('/landingPage');
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 dark:bg-gray-800 transition-colors">
      <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-10 w-full max-w-md transition-colors">

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
          {t('authForms.login.titulo')}
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
          {t('authForms.login.subtitulo')}
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('authForms.login.labels.email')}
            </label>
            <input
              type="email"
              id="usuario"
              value={usuario}
              onChange={(e) => { setUsuario(e.target.value); setError(''); }}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-600 border-2 border-transparent focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 dark:text-white placeholder-gray-400"
              placeholder={t('authForms.login.placeholders.email')}
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('authForms.login.labels.contrasena')}
            </label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => { setContrasena(e.target.value); setError(''); }}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 border-2 border-transparent focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
              placeholder={t('authForms.login.placeholders.contrasena')}
              required
            />
          </div>

          <div className="pt-2">
            <Boton estilo="acceso" type="submit" disabled={loading}>
              {loading ? t('authForms.login.estados.entrando') : t('authForms.login.boton')}
            </Boton>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          {t('authForms.login.enlaces.noTienes')}{' '}
          <NavLink to="/registro" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
            {t('authForms.login.enlaces.registrate')}
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;