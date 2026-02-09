interface TarjetaProps {
  imagen: string;
  titulo: string;
  texto: string;
  altImagen?: string;
  invertida?: boolean;
}

const Tarjeta: React.FC<TarjetaProps> = ({ 
  imagen, 
  titulo, 
  texto, 
  altImagen,
  invertida = false 
}) => {
  return (
    <div className="w-[70%] mx-auto bg-white  shadow-md overflow-hidden">
      <div className={`flex flex-col md:flex-row ${invertida ? 'md:flex-row-reverse' : ''}`}>
        {/* Imagen */}
        <div className="md:w-1/2">
          <img 
            src={imagen} 
            alt={altImagen || titulo}
            className="w-full h-56 md:h-full object-cover"
          />
        </div>
        
        {/* Contenido de texto */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">
            {titulo}
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            {texto}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tarjeta;