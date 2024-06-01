import React from "react"
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter"
import {atomDark} from "react-syntax-highlighter/dist/esm/styles/prism"

import {ProblemForm} from "@components/problem/problem-form"
import {auth} from "@/auth"
import {getUserById} from "@/data/user/user"

interface AskPageCreateProps {
  params: {problemId: string}
}

const AskPageCreate: React.FC<AskPageCreateProps> = async ({}) => {
  const session = await auth()
  const user = await getUserById(session?.user?.id)

  return (
    <main className="container flex flex-col gap-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 lg:px-8 ">
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

        <div className="mx-auto">
          <h2 className="mb-4 text-xl font-bold">Cómo escribir bloques de código en Markdown</h2>
          <ol className="mb-4 list-inside list-decimal pl-6">
            <li className="list-item text-sm font-extralight">
              Utiliza tres tildes invertidas (\`\`\`) para comenzar y terminar un bloque de código.
            </li>
            <li className="list-item text-sm font-extralight">
              Opcionalmente, puedes especificar el lenguaje de programación después del primer
              conjunto de tildes invertidas para obtener un resaltado de sintaxis adecuado.
            </li>
            <li className="list-item text-sm font-extralight">
              Escribe tu código dentro del bloque de código, respetando la estructura de indentación
              y las líneas de separación.
            </li>
          </ol>
          <h3 className="mb-2 text-lg font-semibold">Ejemplo:</h3>
          <div className="h-40 overflow-y-auto">
            <p className="mb-4">```javascript</p>
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {`function saludar() {
              console.log('¡Hola Mundo!');
              }

          saludar();
          `}
            </SyntaxHighlighter>
            <p className="mb-4">```</p>
          </div>
        </div>
      </section>
      <ProblemForm user={user} />
    </main>
  )
}

export default AskPageCreate
