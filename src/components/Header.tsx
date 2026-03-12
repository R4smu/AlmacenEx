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
    const [esAdmin, setEsAdmin] = useState(false);
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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setNombreUsuario(null);
        setEsAdmin(false);
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
            </div>

            <div className="flex items-center gap-4">
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
                <BotonOscuro />
                <BotonIdioma />
            </div>
        </section>
    );
};

export default Header;