import {Card, CardContent, CardHeader, CardTitle} from "@ui/card"
import {Button} from "@ui/button"

export const ActiveIa = ({}) => {
  return (
    <Card className="flex flex-col items-start gap-y-5">
      <CardHeader>
        <CardTitle>IA Asistente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            ¿Necesitas ayuda con tu código? Activa la asistencia de IA para obtener respuestas más
            rápidas y precisas.
          </p>
          <Button>Activar Asistente de IA</Button>
        </div>
      </CardContent>
    </Card>
  )
}
