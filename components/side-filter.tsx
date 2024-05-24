import {Button} from "./ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card"
import {Label} from "./ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select"

export const SideFilter = () => {
  return (
    <div className="sticky top-10 max-w-sm space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="language">Lenguaje</Label>
              <Select defaultValue="javascript">
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un lenguaje" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                  <SelectItem value="php">PHP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="framework">Framework</Label>
              <Select defaultValue="react">
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="vue">Vue.js</SelectItem>
                  <SelectItem value="django">Django</SelectItem>
                  <SelectItem value="laravel">Laravel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="library">Biblioteca</Label>
              <Select defaultValue="jquery">
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una biblioteca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jquery">jQuery</SelectItem>
                  <SelectItem value="lodash">Lodash</SelectItem>
                  <SelectItem value="moment">Moment.js</SelectItem>
                  <SelectItem value="axios">Axios</SelectItem>
                  <SelectItem value="redux">Redux</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
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
    </div>
  )
}
