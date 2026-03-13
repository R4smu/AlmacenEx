const TextArea = () => {
    return (
        <div className="flex flex-col text-black dark:text-white">
            <label>Notas (opcional)</label>
            <textarea className="w-full p-2 flex items-center gap-2 rounded border"
                placeholder="Añade cualquier información adicional al producto..."
                rows={5}></textarea>
        </div>
    )
}

export default TextArea