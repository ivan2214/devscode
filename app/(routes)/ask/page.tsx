import React from "react"

import {ProblemForm} from "@/components/problem/problem-form"

interface AskPageProps {
  params: {problemId: string}
}

const AskPage: React.FC<AskPageProps> = ({params}) => {
  return (
    <main className="container px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <h2 className="mb-4 text-xl font-bold">Escribir una buena pregunta</h2>
        <p className="mb-4 font-extralight">
          Estás listo para hacer una pregunta relacionada con la programación y este formulario te
          ayudará a guiarte a través del proceso.
        </p>
        <h3 className="mb-2 text-lg font-semibold">Pasos</h3>
        <ol className="mb-4 list-inside list-decimal pl-6">
          <li className="list-item text-sm font-extralight">
            Resuma su problema en un título de una línea.
          </li>
          <li className="list-item text-sm font-extralight">
            Describa su problema con más detalle.
          </li>
          <li className="list-item text-sm font-extralight">
            Describa lo que intentó y qué esperaba que sucediera.
          </li>
          <li className="list-item text-sm font-extralight">
            Agregue etiquetas que ayuden a destacar su pregunta para los miembros de la comunidad.
          </li>
          <li className="list-item text-sm font-extralight">
            Revise su pregunta y publíquela en el sitio.
          </li>
        </ol>
      </div>
      <ProblemForm />
    </main>
  )
}

export default AskPage
