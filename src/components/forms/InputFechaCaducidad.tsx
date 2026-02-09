
const FechaCaducidad = () => {
    return (
        <div className="flex flex-col">
            Fecha de caducidad *
            <input className="w-100 p-2 flex items-center gap-2 rounded border" type="datetime-local" placeholder="Introduce la fecha de caducidad" />
        </div>
    )
}

export default FechaCaducidad