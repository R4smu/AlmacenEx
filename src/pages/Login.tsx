import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Boton from '../components/Boton';

function Login() {

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
      alert("Error al iniciar sesión: " + error.message);
      return;
    }

    // login correcto
    alert("Login correcto");

    // redirigir a la página principal
    navigate("/anadir-alimentos");
  };

  return (
    <>
      <div className="flex flex-1 items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="bg-white dark:bg-gray-700 rounded-3xl shadow-2xl p-12 w-full max-w-md transition-colors">
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
                Email
              </label>
              <input
                type="email"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-600 border-2 border-transparent focus:border-(--color-secondary) focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                placeholder="Email"
                required
              />
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <label
                htmlFor="contrasena"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300  pl-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 border-2 border-transparent focus:border-(--color-secondary) focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
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