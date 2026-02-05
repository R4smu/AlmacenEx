const Footer = () => {
    return (
        <>
            <footer className=" bg-emerald-700 fixed bottom-0 left-0 z-20 w-full p-4 bg-neutral-primary-soft shadow-sm md:flex md:items-center md:justify-between md:p-6">
                <span className=" text-white text-sm text-body sm:text-center">© 2026 All Rights Reserved.</span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0 text-white">
                    <li>
                        <p className="hover:underline me-4 md:me-6">Sobre nosotros</p>
                    </li>
                    <li>
                        <p className="hover:underline me-4 md:me-6">Politica de privacidad</p>
                    </li>
                    <li>
                        <p className="hover:underline me-4 md:me-6">Licencias</p>
                    </li>
                    <li>
                        <p className="hover:underline">Contacto</p>
                    </li>
                </ul>
            </footer>
        </>
    )
}

export default Footer