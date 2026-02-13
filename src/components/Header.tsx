import Logo from "../assets/Logo.png"
import Boton from "./Boton"
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <section className="py-4 p-8 flex items-center justify-between bg-emerald-700">
            <NavLink to="/landingPage">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl text-white">Todo Caduca</h1>
                    <img src={Logo} alt="Logo" className="h-12" />
                </div>
            </NavLink>
            <div className="flex items-center">
                <nav>
                    <ul className="flex items-center text-white text-2xl font-medium gap-6">
                        <li>
                            <NavLink
                                to="/landingPage"
                                className="hover:underline">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/anadirAlimentos"
                                className="hover:underline">
                                Añadir producto
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/listaProducto"
                                className="hover:underline">
                                Lista producto
                            </NavLink>
                        </li>
                    </ul>
                </nav>

            </div>
            <div className="flex gap-3">
                <NavLink to="/registro">
                    <Boton estilo="header">Registrar</Boton>
                </NavLink>
                <NavLink to="/login">
                    <Boton estilo="header">Login</Boton>
                </NavLink>
            </div>
        </section >
    )
}
export default Header

