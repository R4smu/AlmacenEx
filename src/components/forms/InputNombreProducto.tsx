
const InputNombreProducto = () => {
    return (
        <div className="flex flex-col text-black dark:text-stone-50">
            Nombre *
            <input className="w-100 p-2 flex items-center gap-2 rounded border" type="text" placeholder="Ej: Leche entera" />
        </div>
    )
}

export default InputNombreProducto