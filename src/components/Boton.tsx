import type { ButtonHTMLAttributes } from "react";
import "../App.css"; 

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  estilo?: "header" | "opciones" | "login" | "registro" | "anadir" | "carne" | "pescado" | "verdura" | "panaderia" | "lacteos" | "congelados" | "fruta";
}

export default function Boton(
    { children, estilo = "header", className = "", ...props }: BotonProps) {

    const clasesEstilo = {
      header: "btn-header",
      opciones: "btn-opciones",
      registro: "btn-registro",
      login: "btn-login",
      anadir: "btn-anadir",
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