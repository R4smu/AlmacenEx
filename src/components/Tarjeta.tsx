import { useEffect, useRef, useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2, // La tarjeta debe estar al menos 20% visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`w-[70%] mx-auto bg-white shadow-md overflow-hidden transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : `opacity-0 ${invertida ? '-translate-x-32' : 'translate-x-32'}`
      }`}
    >
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
        <div className="md:w-1/2 p-6 flex flex-col justify-center bg-white dark:bg-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 uppercase tracking-wide">
            {titulo}
          </h2>
          <p className="text-gray-600 dark:text-white leading-relaxed text-sm">
            {texto}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tarjeta;