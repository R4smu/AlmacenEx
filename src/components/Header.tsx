import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useTranslation } from "react-i18next";

import Logo from "../assets/Logo.png"
import Boton from "./Boton"
import BotonOscuro from "./BotonOscuro"
import BotonIdioma from "./BotonIdioma"

const Header = () => {
    const { t } = useTranslation();
    const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Carga el nombre al montar el componente si ya hay sesión activa
        const cargarUsuario = async (userId: string, emailFallback?: string) => {
            console.log("Buscando userId:", userId);
            const { data, error } = await supabase
                .from("usuarios")
                .select("nombre")
                .eq("id_usuario", userId)
                .maybeSingle();

            console.log("cargarUsuario →", { data, error });

            if (data?.nombre) {
                setNombreUsuario(data.nombre);
            } else if (emailFallback) {
                // Fallback: muestra la parte del email antes del @
                setNombreUsuario(emailFallback.split("@")[0]);
            }
        };

        // Comprueba sesión actual
        supabase.auth.getSession().then(({ data: { session } }: { data: { session: { user: { id: string; email?: string } } | null } }) => {
            console.log("getSession →", session);
            if (session?.user) cargarUsuario(session.user.id, session.user.email);
        });

        // Escucha cambios de sesión (login / logout)
        const { data: listener } = supabase.auth.onAuthStateChange((_event: string, session: { user: { id: string; email?: string } } | null) => {
            console.log("onAuthStateChange →", _event, session);
            if (session?.user) {
                cargarUsuario(session.user.id, session.user.email);
            } else {
                setNombreUsuario(null);
            }
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setNombreUsuario(null);
        navigate("/landingPage");
    };

    return (
        <section className="py-4 p-8 flex items-center justify-between bg-emerald-700 transition-colors duration-500 dark:bg-slate-900">
            <NavLink to="/landingPage">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl text-white">{t('header.title')}</h1>
                    <img src={Logo} alt="Logo" className="h-12" />
                </div>
            </NavLink>
            <div className="flex items-center">
                <nav>
                    <ul className="flex items-center text-white text-2xl font-medium gap-6">
                        <li>
                            <NavLink to="/landingPage" className="hover:underline">
                                {t('header.nav.home')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/anadirAlimentos" className="hover:underline">
                                {t('header.nav.addProduct')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/listaProducto" className="hover:underline">
                                {t('header.nav.productList')}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="flex items-center gap-4">
                {nombreUsuario ? (
                    // Usuario autenticado: muestra nombre y botón de cerrar sesión
                    <>
                        <span className="text-white font-medium text-lg">
                            {t('header.user.greeting', { nombre: nombreUsuario })}
                        </span>
                        <Boton estilo="header" onClick={handleLogout}>
                            {t('header.user.logout')}
                        </Boton>
                    </>
                ) : (
                    // Usuario no autenticado: muestra Registrar y Login
                    <div className="flex gap-3">
                        <NavLink to="/registro">
                            <Boton estilo="header">{t('header.auth.register')}</Boton>
                        </NavLink>
                        <NavLink to="/login">
                            <Boton estilo="header">{t('header.auth.login')}</Boton>
                        </NavLink>
                    </div>
                )}

                <BotonOscuro />
                <BotonIdioma />
            </div>
        </section>
    );
};

export default Header;