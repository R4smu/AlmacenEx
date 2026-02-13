import { useState } from 'react';

function Registro() {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [repetirContrasena, setRepetirContrasena] = useState('');
    const [guardarContrasena, setGuardarContrasena] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica de autenticación aquí
        console.log('Registro:', { usuario, email, contrasena, repetirContrasena, guardarContrasena });
    };

    return (
        <>
            <div className="flex flex-1" style={{ backgroundColor: '#f5f5f5' }}>
                {/* Columna izquierda - Información */}
                <div className="w-3/4 bg-gray-200 flex items-center justify-center p-12">
                    <div className="max-w-md">
                        <h2 className="text-5xl font-bold text-black mb-8">
                            Lorem ipsum
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-sm">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                </div>

                {/* Columna derecha - Formulario */}
                <div className="w-2/4 flex items-center justify-center p-12">
                    <div className="w-full max-w-md">
                        <h1 className="text-4xl font-bold text-center mb-12 text-black">
                            REGISTRO
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Campo Usuario */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="usuario"
                                    className="block text-xs font-medium text-gray-600"
                                >
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    id="usuario"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-emerald-600 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                                    placeholder=""
                                    required
                                />
                            </div>

                            {/* Campo Email */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-medium text-gray-600"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-emerald-600 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                                    placeholder=""
                                    required
                                />
                            </div>

                            {/* Campo Contraseña */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="contrasena"
                                    className="block text-xs font-medium text-gray-600"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="contrasena"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-emerald-600 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                                    placeholder=""
                                    required
                                />
                            </div>

                            {/* Campo Repetir Contraseña */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="repetircontrasena"
                                    className="block text-xs font-medium text-gray-600"
                                >
                                    Repetir Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="repetircontrasena"
                                    value={repetirContrasena}
                                    onChange={(e) => setRepetirContrasena(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-emerald-600 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                                    placeholder=""
                                    required
                                />
                            </div>

                            {/* Checkbox Guardar Contraseña */}
                            <div className="flex items-center space-x-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="guardarContrasena"
                                    checked={guardarContrasena}
                                    onChange={(e) => setGuardarContrasena(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <label
                                    htmlFor="guardarContrasena"
                                    className="text-sm text-gray-700 cursor-pointer"
                                >
                                    Guardar Contraseña
                                </label>
                            </div>

                            {/* Botón Entrar */}
                            <div className="flex justify-center mt-8 pt-4">
                                <button
                                    type="submit"
                                    className="px-12 py-3 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 hover:shadow-lg uppercase"
                                    style={{ backgroundColor: '#009966' }}
                                >
                                    Entrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Registro;