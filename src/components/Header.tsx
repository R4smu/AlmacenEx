import { useEffect, useState } from "react";
import Logo from "../assets/Logo.png"
import Boton from "./Boton"
import BotonOscuro from "./BotonOscuro"
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Header = () => {
    const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
    const [esAdmin, setEsAdmin] = useState(false);
    const navigate = useNavigate();

    const cargarUsuario = async (userId: string, emailFallback?: string) => {
        const { data } = await supabase
            .from("usuarios")
            .select("nombre, id_rol")
            .eq("id_usuario", userId)
            .maybeSingle();

        if (data?.nombre) {
            setNombreUsuario(data.nombre);
        } else if (emailFallback) {
            setNombreUsuario(emailFallback.split("@")[0]);
        }

        if (data?.id_rol) {
            const { data: rolData } = await supabase
                .from("roles")
                .select("nombre")
                .eq("id_rol", data.id_rol)
                .maybeSingle();
            setEsAdmin(rolData?.nombre === "admin");
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }: any) => {
            if (session?.user) cargarUsuario(session.user.id, session.user.email);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
            if (session?.user) {
                cargarUsuario(session.user.id, session.user.email);
            } else {
                setNombreUsuario(null);
                setEsAdmin(false);
            }
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setNombreUsuario(null);
        setEsAdmin(false);
        navigate("/landingPage");
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `transition-colors hover:text-emerald-200 ${isActive ? 'underline underline-offset-4 text-emerald-200' : ''}`;

    return (
        <header className="py-4 px-8 flex items-center justify-between bg-emerald-700 dark:bg-slate-900 transition-colors duration-300 shadow-md">

            <NavLink to="/landingPage" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <h1 className="text-xl font-bold text-white">Todo Caduca</h1>
                <img src={Logo} alt="Logo Todo Caduca" className="h-10" />
            </NavLink>

            <nav>
                <ul className="flex items-center text-white text-base font-medium gap-6">
                    <li>
                        <NavLink to="/landingPage" className={navLinkClass}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/anadirAlimentos" className={navLinkClass}>
                            Añadir producto
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/listaProducto" className={navLinkClass}>
                            Lista producto
                        </NavLink>
                    </li>
                    {esAdmin && (
                        <li>
                            <NavLink to="/admin" className="transition-colors text-amber-300 hover:text-amber-200 flex items-center gap-1">
                                Admin
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>

            <div className="flex items-center gap-4">
                {nombreUsuario ? (
                    <>
                        <span className="text-white text-sm font-medium hidden sm:block">
                            Hola, {nombreUsuario}
                        </span>
                        <Boton estilo="header" onClick={handleLogout}>
                            Cerrar sesión
                        </Boton>
                    </>
                ) : (
                    <div className="flex gap-3">
                        <NavLink to="/registro">
                            <Boton estilo="header">Registrar</Boton>
                        </NavLink>
                        <NavLink to="/login">
                            <Boton estilo="header">Login</Boton>
                        </NavLink>
                    </div>
                )}
                <BotonOscuro />
            </div>
        </header>
    );
};

export default Header;