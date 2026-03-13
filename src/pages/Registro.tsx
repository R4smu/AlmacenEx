import { useState } from 'react';
import { supabase } from '../supabaseClient';
import Boton from '../components/Boton';
import { useNavigate, NavLink } from 'react-router-dom';

function Registro() {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [repetirContrasena, setRepetirContrasena] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const contrasenasCoinciden = contrasena && repetirContrasena && contrasena === repetirContrasena;
    const contrasenasNoCoinciden = contrasena && repetirContrasena && contrasena !== repetirContrasena;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (contrasena !== repetirContrasena) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (contrasena.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password: contrasena,
            options: { data: { nombre: usuario } }
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        if (!data.user) {
            setError('Error al crear el usuario. Inténtalo de nuevo.');
            return;
        }

        navigate('/landingPage');
    };

    return (
        <div className="flex flex-1 bg-gray-50 dark:bg-gray-800 transition-colors">

            {/* Columna izquierda */}
            <div className="hidden md:flex w-3/4 bg-gray-200 dark:bg-gray-800 items-center justify-center p-12 relative overflow-hidden">
                <div className="max-w-md relative z-10">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-4">
                        Todo Caduca
                    </span>
                    <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                        Controla tus alimentos
                    </h2>
                    <div className="w-12 h-1 bg-emerald-500 rounded mb-6"></div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                        Registra tus productos, controla las fechas de caducidad y reduce el desperdicio alimentario desde un solo lugar.
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
                        Crear cuenta
                    </h1>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
                        Rellena los campos para registrarte
                    </p>

                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nombre de usuario
                            </label>
                            <input
                                type="text"
                                id="usuario"
                                value={usuario}
                                onChange={(e) => { setUsuario(e.target.value); setError(''); }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border-2 border-transparent focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                                placeholder="Tu nombre"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border-2 border-transparent focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
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
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border-2 border-transparent focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                                placeholder="Mínimo 6 caracteres"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="repetircontrasena" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Repetir contraseña
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
                                placeholder="Repite tu contraseña"
                                required
                            />
                            {contrasenasNoCoinciden && (
                                <p className="text-xs text-red-500 mt-1">Las contraseñas no coinciden</p>
                            )}
                            {contrasenasCoinciden && (
                                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Las contraseñas coinciden</p>
                            )}
                        </div>

                        <div className="pt-2">
                            <Boton estilo="acceso" type="submit" disabled={loading}>
                                {loading ? 'Registrando...' : 'Crear cuenta'}
                            </Boton>
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                        ¿Ya tienes cuenta?{' '}
                        <NavLink to="/login" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
                            Inicia sesión
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Registro;