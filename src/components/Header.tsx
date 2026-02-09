import Logo from "../assets/Logo.png"
import Boton from "./Boton"

const Header = () => {
    return (
        <section className="py-4 p-8 flex items-center justify-between bg-emerald-700">
            <div className="flex items-center">
                 <img src={Logo} alt="Logo" className="h-12" />
                 <h1 className="text-2xl text-white">Todo Caduca</h1>
             </div>
            <div className="flex items-center">
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0 text-white">
                    <li>
                        <p className="hover:underline hover:cursor-pointer me-4 md:me-6 text-2xl">Home</p>
                    </li>
                    <li>
                        <p className="hover:underline hover:cursor-pointer me-4 md:me-6 text-2xl">Añadir producto</p>
                    </li>
                    <li>
                        <p className="hover:underline hover:cursor-pointer me-4 md:me-6 text-2xl">Lista producto</p>
                    </li>
                </ul>
            </div>
            <div className="flex gap-3">
                <Boton estilo="header">Registrar</Boton>
                <Boton estilo="header">Login</Boton>
            </div>
        </section>
        // <section className="py-4 p-8 flex items-center justify-between bg-amber-300">
        //     <div className="flex items-center">
        //         <img src={Logo} alt="Logo" className="h-12" />
        //         <h1 className="text-2xl">Todo Caduca</h1>
        //     </div>
        //     <div className="flex gap-3">
        //         <Boton estilo="header">Registrar</Boton>
        //         <Boton estilo="header">Login</Boton>
        //     </div>
        // </section>
    )
}
export default Header