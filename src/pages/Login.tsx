import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Boton from '../components/Boton';

function Login() {
  const { t } = useTranslation();

  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: usuario,
      password: contrasena
    });

    if (error) {
      alert(t('alertas.errorLogin', { error: error.message }));
      return;
    }

    alert(t('alertas.exitoLogin'));
    navigate("/landingPage");
  };

  return (
    <>
      <div className="flex flex-1 items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="bg-white dark:bg-gray-700 rounded-3xl shadow-2xl p-12 w-full max-w-md transition-colors">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t('authForms.login.titulo')}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 pl-1">
                {t('authForms.login.labels.email')}
              </label>
              <input
                type="email"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-600 border-2 border-transparent focus:border-(--color-secondary) focus:outline-none transition-colors text-gray-800 dark:text-white placeholder-gray-400"
                placeholder={t('authForms.login.labels.email')}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 dark:text-gray-300  pl-1">
                {t('authForms.login.labels.contrasena')}
              </label>
              <input
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 border-2 border-transparent focus:border-(--color-secondary) focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                placeholder={t('authForms.login.labels.contrasena')}
                required
              />
            </div>

            <div className="flex justify-center mt-8">
              <Boton estilo="login">{t('authForms.login.boton')}</Boton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;