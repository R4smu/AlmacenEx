import type { ButtonHTMLAttributes } from "react";
import "../App.css"; 

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  estilo?: "header" | "opciones" | "login" | "carne" | "pescado" | "verdura" | "panaderia" | "lacteos" | "congelados" | "fruta";
}

export default function Boton({ children, estilo = "login", className = "", ...props }: BotonProps) {

  const clasesPorEstilo = {
    header: "btn-header",
    opciones: "btn-opciones",
    login: "btn-login",
    carne: "btn-carne",
    pescado: "btn-pescado",
    verdura: "btn-verdura",
    panaderia: "btn-panaderia",
    lacteos: "btn-lacteos",
    congelados: "btn-congelados",
    fruta: "btn-fruta",
  };
  
  const claseSeleccionada = clasesPorEstilo[estilo] || clasesPorEstilo.login;

  return (
    <button className={`${claseSeleccionada} ${className}`} {...props}>
      {children}
    </button>
  );
}