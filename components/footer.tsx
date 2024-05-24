import Link from "next/link";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6 md:px-8 flex items-center justify-between">
      <p className="text-sm">
        © 2024 Ayuda de Código. Todos los derechos reservados.
      </p>
      <nav className="flex items-center space-x-4">
        <Link className="hover:underline" href="#">
          Términos de Servicio
        </Link>
        <Link className="hover:underline" href="#">
          Política de Privacidad
        </Link>
      </nav>
    </footer>
  );
};
