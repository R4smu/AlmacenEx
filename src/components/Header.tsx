import { useEffect, useState } from "react";
import Logo from "../assets/Logo.png"
import Boton from "./Boton"
import BotonOscuro from "./BotonOscuro"
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Menu, X } from "lucide-react";

const Header = () => {
    const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
    const [esAdmin, setEsAdmin] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navigate = useNavigate();

    const cargarUsuario = async (userId: string, emailFallback?: string) => {
        const { data, error } = await supabase
            .from("usuarios")
            .select("nombre, id_rol")
            .eq("id_usuario", userId)
            .maybeSingle();

        console.log("cargarUsuario →", { data, error });

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

            console.log("rol →", rolData)
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

    // Cerrar menú al cambiar de ruta
    const cerrarMenu = () => setMenuAbierto(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setNombreUsuario(null);
        setEsAdmin(false);
        cerrarMenu();
        navigate("/landingPage");
    };

    return (
        <header className="bg-emerald-700 dark:bg-slate-900 transition-colors duration-500">
            {/* Barra principal */}
            <section className="py-4 px-4 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <NavLink to="/landingPage" onClick={cerrarMenu}>
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl md:text-2xl text-white font-semibold">Todo Caduca</h1>
                        <img src={Logo} alt="Logo" className="h-10 md:h-12" />
                    </div>
                </NavLink>

                {/* Nav — solo visible en desktop (md+) */}
                <nav className="hidden md:block">
                    <ul className="flex items-center text-white text-xl font-medium gap-6">
                        <li>
                            <NavLink to="/landingPage" className="hover:underline">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/anadirAlimentos" className="hover:underline">
                                Añadir producto
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/listaProducto" className="hover:underline">
                                Lista producto
                            </NavLink>
                        </li>
                        {esAdmin && (
                            <li>
                                <NavLink
                                    to="/admin"
                                    className="hover:underline flex items-center gap-1 text-amber-300 hover:text-amber-200"
                                >
                                    ⚙ Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Acciones derechas — desktop */}
                <div className="hidden md:flex items-center gap-4">
                    {nombreUsuario ? (
                        <>
                            <span className="text-white font-medium text-lg">
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

                {/* Botones móvil: toggle oscuro + hamburguesa */}
                <div className="flex md:hidden items-center gap-3">
                    <BotonOscuro />
                    <button
                        onClick={() => setMenuAbierto(prev => !prev)}
                        className="p-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors border border-emerald-600 dark:border-slate-600"
                        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
                    >
                        {menuAbierto
                            ? <X size={20} className="text-white" />
                            : <Menu size={20} className="text-white" />
                        }
                    </button>
                </div>
            </section>

            {/* Menú desplegable móvil */}
            {menuAbierto && (
                <div className="md:hidden border-t border-emerald-600 dark:border-slate-700 bg-emerald-700 dark:bg-slate-900 transition-colors duration-300">
                    <nav className="flex flex-col px-4 py-3 gap-1">
                        <NavLink
                            to="/landingPage"
                            onClick={cerrarMenu}
                            className="text-white text-lg font-medium py-3 border-b border-emerald-600 dark:border-slate-700 hover:text-emerald-200"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/anadirAlimentos"
                            onClick={cerrarMenu}
                            className="text-white text-lg font-medium py-3 border-b border-emerald-600 dark:border-slate-700 hover:text-emerald-200"
                        >
                            Añadir producto
                        </NavLink>
                        <NavLink
                            to="/listaProducto"
                            onClick={cerrarMenu}
                            className="text-white text-lg font-medium py-3 border-b border-emerald-600 dark:border-slate-700 hover:text-emerald-200"
                        >
                            Lista producto
                        </NavLink>
                        {esAdmin && (
                            <NavLink
                                to="/admin"
                                onClick={cerrarMenu}
                                className="text-amber-300 text-lg font-medium py-3 border-b border-emerald-600 dark:border-slate-700 hover:text-amber-200 flex items-center gap-1"
                            >
                                ⚙ Admin
                            </NavLink>
                        )}

                        {/* Separador usuario */}
                        <div className="pt-3">
                            {nombreUsuario ? (
                                <div className="flex flex-col gap-3">
                                    <span className="text-white font-medium text-base">
                                        Hola, {nombreUsuario}
                                    </span>
                                    <Boton estilo="header" onClick={handleLogout} className="w-full">
                                        Cerrar sesión
                                    </Boton>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <NavLink to="/registro" onClick={cerrarMenu}>
                                        <Boton estilo="header" className="w-full !h-12 text-base">Registrar</Boton>
                                    </NavLink>
                                    <NavLink to="/login" onClick={cerrarMenu}>
                                        <Boton estilo="header" className="w-full !h-12 text-base">Login</Boton>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;