const Footer = () => {
    return (
        <>
            <footer className="bg-emerald-700 w-full p-4 shadow-sm md:flex md:items-center md:justify-between md:p-6 mt-auto">
                <span className="text-white text-sm sm:text-center">© 2026 All Rights Reserved.</span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
                    <li>
                        <p className="hover:underline me-4 md:me-6 cursor-pointer">Sobre nosotros</p>
                    </li>
                    <li>
                        <p className="hover:underline me-4 md:me-6 cursor-pointer">Politica de privacidad</p>
                    </li>
                    <li>
                        <p className="hover:underline me-4 md:me-6 cursor-pointer">Licencias</p>
                    </li>
                    <li>
                        <p className="hover:underline cursor-pointer">Contacto</p>
                    </li>
                </ul>
            </footer>
        </>
    )
}

export default Footer