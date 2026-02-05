import Logo from "../assets/Logo.png"
import Boton from "./Boton"

const Header = () => {
    return (
        <section className="p-8 flex items-center justify-between bg-amber-300">
            <div className="flex items-center">
                <img src={Logo} alt="Logo" className="h-20 mr-4" />
                <h1 className="text-4xl">Todo Caduca</h1>
            </div>
            <div className="flex gap-4">
                <Boton texto="Registrar" estilo="btn-header" />
                <Boton texto="Login" estilo="btn-header" />
            </div>
        </section>
    )
}
export default Header