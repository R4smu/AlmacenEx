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
    <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden animate-slide-in-right">
      <div className={`flex flex-col md:flex-row ${invertida ? 'md:flex-row-reverse' : ''}`}>
        {/* Imagen */}
        <div className="md:w-[30%]">
          <img 
            src={imagen} 
            alt={altImagen || titulo}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        
        {/* Contenido de texto */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
            {titulo}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {texto}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tarjeta;