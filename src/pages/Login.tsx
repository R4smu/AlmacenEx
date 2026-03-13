import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, NavLink } from 'react-router-dom';
import Boton from '../components/Boton';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: usuario,
      password: contrasena
    });

    setLoading(false);

    if (error) {
      setError('Email o contraseña incorrectos. Inténtalo de nuevo.');
      return;
    }

    navigate('/landingPage');
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 dark:bg-gray-800 transition-colors">
      <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-10 w-full max-w-md transition-colors">

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
          Iniciar sesión
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
          Bienvenido de nuevo
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="usuario"
              value={usuario}
              onChange={(e) => { setUsuario(e.target.value); setError(''); }}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-600 border-2 border-transparent focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 dark:text-white placeholder-gray-400"
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => { setContrasena(e.target.value); setError(''); }}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-600 border-2 border-transparent focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 dark:text-white placeholder-gray-400"
              placeholder="Tu contraseña"
              required
            />
          </div>

          <div className="pt-2">
            <Boton estilo="acceso" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Boton>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          ¿No tienes cuenta?{' '}
          <NavLink to="/registro" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
            Regístrate
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;