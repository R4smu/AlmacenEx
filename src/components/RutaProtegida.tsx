import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Boton from "./Boton";

interface RutaProtegidaProps {
    children: React.ReactNode;
}

function RutaProtegida({ children }: RutaProtegidaProps) {
    const [sesion, setSesion] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }: any) => {
            setSesion(!!session);
        });
    }, []);

    if (sesion === null) return null;

    if (!sesion) {
        return (
            <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-800 transition-colors">
                <div className="bg-white dark:bg-gray-700 rounded-3xl shadow-2xl p-12 w-full max-w-md text-center transition-colors">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        Acceso restringido
                    </h2>
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                                ¿Ya tienes cuenta? Inicia sesión para continuar.
                            </p>
                            <Boton estilo="acceso" onClick={() => navigate("/login")}>
                                Iniciar sesión
                            </Boton>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                                ¿No tienes cuenta? Regístrate para acceder.
                            </p>
                            <Boton estilo="acceso-secundario" onClick={() => navigate("/registro")}>
                                Crear cuenta
                            </Boton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export default RutaProtegida;