import { useState } from 'react';
import Boton from '../components/Boton';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { usuario, contrasena });
  };

  return (
    <>
      <div className="flex flex-1 items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 w-full max-w-md transition-colors">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Usuario */}
            <div className="space-y-2">
              <label
                htmlFor="usuario"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 pl-1"
              >
                Usuario
              </label>
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-2 border-transparent focus:border-(--color-secondary) focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                placeholder="Usuario"
                required
              />
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <label
                htmlFor="contrasena"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 pl-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-2 border-transparent focus:border-(--color-secondary) focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                placeholder="Contraseña"
                required
              />
            </div>

            {/* Botón Entrar */}
            <div className="flex justify-center mt-8">
              <Boton estilo="login">Entrar</Boton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;