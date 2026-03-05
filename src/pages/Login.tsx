import { useState } from 'react';
import fondoLogin from '../assets/fondoLogin1.jpg'

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de autenticación aquí
    console.log('Login:', { usuario, contrasena });
  };

  return (
    <>
      <div className="flex flex-1 items-center justify-center bg-center bg-no-repeat" 
      style={{ backgroundImage: `url(${fondoLogin})`,backgroundSize:'100% 100%'}}>
        <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Usuario */}
            <div className="space-y-2">
              <label
                htmlFor="usuario"
                className="block text-sm font-medium text-gray-700 pl-1"
              >
                Usuario
              </label>
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-(--color-secondary) focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                placeholder="Usuario"
                required
              />
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <label
                htmlFor="contrasena"
                className="block text-sm font-medium text-gray-700 pl-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-(--color-secondary) focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                placeholder="Contraseña"
                required
              />
            </div>

            {/* Botón Entrar */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg text-white font-medium text-sm transition-all hover:opacity-90 hover:shadow-lg bg-emerald-700">
                ENTRAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;