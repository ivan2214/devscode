import Link from "next/link"
import React from "react"

export const Footer = () => {
  return (
    <footer className="flex items-center justify-between bg-gray-900 px-6 py-4 text-white md:px-8">
      <p className="text-sm">© 2024 Ayuda de Código. Todos los derechos reservados.</p>
      <nav className="flex items-center space-x-4">
        <Link className="hover:underline" href="#">
          Términos de Servicio
        </Link>
        <Link className="hover:underline" href="#">
          Política de Privacidad
        </Link>
      </nav>
    </footer>
  )
}
