import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";

import Logo from "../assets/Logo.png"
import Boton from "./Boton"
import BotonOscuro from "./BotonOscuro"
import BotonIdioma from "./BotonIdioma"

const Header = () => {
    const { t } = useTranslation();
    const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
    const [esAdmin, setEsAdmin] = useState(false);

    const [menuAbierto, setMenuAbierto] = useState(false); 
    
    const navigate = useNavigate();

    const cerrarMenu = () => setMenuAbierto(false);

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
        cerrarMenu(); // Cerramos el menú al desloguearse
        navigate("/landingPage");
    };

    // Función auxiliar para las clases de los NavLink
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `transition-colors hover:text-emerald-200 ${isActive ? 'underline underline-offset-4 text-emerald-200' : ''}`;

    return (
        <header className="bg-emerald-700 dark:bg-slate-900 transition-colors duration-500">
            {/* Barra principal */}
            <section className="py-4 px-4 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <NavLink to="/landingPage" onClick={cerrarMenu}>
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl md:text-2xl text-white font-semibold">{t('header.title')}</h1>
                        <img src={Logo} alt="Logo" className="h-10 md:h-12" />
                    </div>
                </NavLink>

                {/* Nav — solo visible en desktop (md+) */}
                <nav className="hidden md:block">
                    <ul className="flex items-center text-white text-xl font-medium gap-6">
                        <li>
                            <NavLink to="/landingPage" className={navLinkClass}>
                                {t('header.nav.home')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/anadirAlimentos" className={navLinkClass}>
                                {t('header.nav.addProduct')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/listaProducto" className={navLinkClass}>
                                {t('header.nav.productList')}
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
                                {t('header.user.greeting', { nombre: nombreUsuario })}
                            </span>
                            <Boton estilo="header" onClick={handleLogout}>
                                {t('header.user.logout')}
                            </Boton>
                        </>
                    ) : (
                        <div className="flex gap-3">
                            <NavLink to="/registro">
                                <Boton estilo="header">{t('header.auth.register')}</Boton>
                            </NavLink>
                            <NavLink to="/login">
                                <Boton estilo="header">{t('header.auth.login')}</Boton>
                            </NavLink>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <BotonIdioma />
                        <BotonOscuro />
                    </div>
                </div>

                <div className="flex md:hidden items-center gap-2">
                    <BotonIdioma />
                    <BotonOscuro />
                    <button
                        onClick={() => setMenuAbierto(prev => !prev)}
                        className="p-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors border border-emerald-600 dark:border-slate-600 ml-1"
                        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
                    >
                        {menuAbierto
                            ? <X size={20} className="text-white" />
                            : <Menu size={20} className="text-white" />}
                    </button>
                </div>
            </section>

            {/* Menú desplegable móvil */}
            {menuAbierto && (
                <div className="md:hidden border-t border-emerald-600 dark:border-slate-700 bg-emerald-700 dark:bg-slate-900 transition-colors duration-300">
                    <nav className="flex flex-col px-4 py-3 gap-1">
                        <ul className="flex flex-col">
                            <li>
                                <NavLink
                                    to="/landingPage"
                                    onClick={cerrarMenu}
                                    className="block text-white text-lg font-medium py-3 border-b border-emerald-600 dark:border-slate-700 hover:text-emerald-200"
                                >
                                    {t('header.nav.home')}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/anadirAlimentos"
                                    onClick={cerrarMenu}
                                    className="block text-white text-lg font-medium py-3 border-b border-emerald-600 dark:border-slate-700 hover:text-emerald-200"
                                >
                                    {t('header.nav.addProduct')}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/listaProducto"
                                    onClick={cerrarMenu}
                                    className="block text-white text-lg font-medium py-3 border-b border-emerald-600 dark:border-slate-700 hover:text-emerald-200"
                                >
                                    {t('header.nav.productList')}
                                </NavLink>
                            </li>
                            {esAdmin && (
                                <li>
                                    <NavLink 
                                        to="/admin" 
                                        onClick={cerrarMenu}
                                        className="block py-3 border-b border-emerald-600 dark:border-slate-700 transition-colors text-amber-300 hover:text-amber-200 text-lg font-medium"
                                    >
                                        ⚙ Admin
                                    </NavLink>
                                </li>
                            )}
                        </ul>

                        {/* Separador usuario (Móvil) */}
                        <div className="pt-4 pb-2">
                            {nombreUsuario ? (
                                <div className="flex flex-col gap-3">
                                    <span className="text-white font-medium text-base text-center">
                                        {t('header.user.greeting', { nombre: nombreUsuario })}
                                    </span>
                                    <Boton estilo="header" onClick={handleLogout} className="w-full text-center">
                                        {t('header.user.logout')}
                                    </Boton>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <NavLink to="/registro" onClick={cerrarMenu}>
                                        <Boton estilo="header" className="w-full !h-12 text-base text-center flex items-center justify-center">
                                            {t('header.auth.register')}
                                        </Boton>
                                    </NavLink>
                                    <NavLink to="/login" onClick={cerrarMenu}>
                                        <Boton estilo="header" className="w-full !h-12 text-base text-center flex items-center justify-center">
                                            {t('header.auth.login')}
                                        </Boton>
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