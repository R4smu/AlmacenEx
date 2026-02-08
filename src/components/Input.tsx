import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error? : string
}

export default function InputField({label, name, value, ...props}: InputFieldProps) {

    const baseStyles = "...";
    const hoverStyles = "hover: color-green";
    const sizeStyles = "sm: color-red";

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input  
                className={`${baseStyles} ${hoverStyles} ${sizeStyles}`}
                name = {name}
                id = {name}
                value = {value}
                {...props}
            />
        </div>
    )
}