import { FaFacebookMessenger } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";

const socialIcons = [
  { icon: <MdEmail />, label: "Email" },
  { icon: <FaFacebook />, label: "Facebook" },
  { icon: <FaFacebookMessenger />, label: "Messenger" },
  { icon: <FaXTwitter />, label: "Twitter/X" },
  { icon: <FaYoutube />, label: "YouTube" },
  { icon: <FaInstagram />, label: "Instagram" },
  { icon: <FaLinkedin />, label: "LinkedIn" },
  { icon: <AiFillTikTok />, label: "TikTok" },
];

const Footer = () => {
  return (
    <footer className="bg-emerald-700 dark:bg-slate-900 w-full p-6 shadow-sm transition-colors duration-500">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:flex-wrap">
        
        {/* Links */}
        <ul className="flex flex-wrap items-center gap-3 text-sm font-medium text-white justify-center">
          <li>
            <span className="text-white text-sm">© 2026 All Rights Reserved.</span>
          </li>
          <li>
            <p className="hover:underline cursor-pointer transition-opacity hover:opacity-80">Sobre nosotros</p>
          </li>
          <li>
            <p className="hover:underline cursor-pointer transition-opacity hover:opacity-80">Política de privacidad</p>
          </li>
          <li>
            <p className="hover:underline cursor-pointer transition-opacity hover:opacity-80">Licencias</p>
          </li>
          <li className="flex items-center gap-1 cursor-pointer hover:underline transition-opacity hover:opacity-80">
            <FaPhoneAlt />
            <p>Contacto</p>
          </li>
        </ul>

        {/* Iconos de redes sociales */}
        <ul className="flex items-center gap-3">
          {socialIcons.map(({ icon, label }) => (
            <li
              key={label}
              title={label}
              className="
                text-white text-xl cursor-pointer
                transition-all duration-200
                hover:scale-125 hover:text-emerald-200
                dark:hover:text-blue-400 
              "
            >
              {icon}
            </li>
          ))}
        </ul>

      </div>
    </footer>
  );
};

export default Footer;