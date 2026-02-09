import Logo from "../assets/Logo.png"
import Boton from "./Boton"

const Header = () => {
    return (
        <section className="py-4 p-8 flex items-center justify-between bg-amber-300">
            <div className="flex items-center">
                <img src={Logo} alt="Logo" className="h-12" />
                <h1 className="text-2xl">Todo Caduca</h1>
            </div>
            <div className="flex gap-3">
                <Boton texto="Registrar" estilo="btn-header cursor-pointer " />
                <Boton texto="Login" estilo="btn-header cursor-pointer" />
            </div>
        </section>
    )
}
export default Header