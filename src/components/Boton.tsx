<<<<<<< HEAD
import "../index.css"

const Boton = ({texto, estilo}:any) => {
  return (
    <button className={estilo}>{texto}</button>
  )
}

export default Boton
=======
import type { ButtonHTMLAttributes } from "react";
import "../App.css"; 

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  estilo?: "header" | "opciones" | "login" | "carne" | "pescado" | "verdura" | "panaderia" | "lacteos" | "congelados" | "fruta";
}

export default function Boton(
    { children, estilo = "header", className = "", ...props }: BotonProps) {

    const clasesEstilo = {
      header: "btn-header",
      opciones: "btn-opciones",
      login: "btn-login",
      carne: "btn-carne",
      pescado: "btn-pescado",
      verdura: "btn-verdura",
      panaderia: "btn-panaderia",
      lacteos: "btn-lacteos",
      congelados: "btn-congelados",
      fruta: "btn-fruta"
    };

    const claseSeleccionada = clasesEstilo[estilo];

    return (
      <button className={`${claseSeleccionada} ${className}`} {...props}>
        {children}
      </button>
    );
}   
>>>>>>> components-review
