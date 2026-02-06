import { CiSearch } from "react-icons/ci";

const NavBar = () => {
    return (
        <div className="p-2 flex items-center gap-2 rounded border">
            <CiSearch className="text-xl text-gray-500" />
            <input
                type="search"
                placeholder="Escribe tu producto aquí..."
                className="flex-1 outline-none"
            />
        </div>
    )
}

export default NavBar