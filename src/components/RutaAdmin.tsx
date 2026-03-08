import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FiShield } from "react-icons/fi";
import Boton from "./Boton";

interface RutaAdminProps {
    children: React.ReactNode;
}

function RutaAdmin({ children }: RutaAdminProps) {
    const [estado, setEstado] = useState<"cargando" | "admin" | "denegado">("cargando");
    const navigate = useNavigate();

    useEffect(() => {
        const comprobar = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setEstado("denegado"); return; }

            const { data } = await supabase
                .from("usuarios")
                .select("roles(nombre)")
                .eq("id_usuario", user.id)
                .single();

            const rol = (data?.roles as any)?.nombre;
            setEstado(rol === "admin" ? "admin" : "denegado");
        };
        comprobar();
    }, []);

    if (estado === "cargando") {
        return (
            <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-800">
                <p className="text-gray-500 dark:text-gray-400">Verificando permisos...</p>
            </div>
        );
    }

    if (estado === "denegado") {
        return (
            <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-800">
                <div className="bg-white dark:bg-gray-700 rounded-3xl shadow-2xl p-12 w-full max-w-md text-center">
                    <FiShield size={48} className="text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        Acceso denegado
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        No tienes permisos de administrador.
                    </p>
                    <Boton estilo="acceso" onClick={() => navigate("/landingPage")}>
                        Volver al inicio
                    </Boton>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export default RutaAdmin;