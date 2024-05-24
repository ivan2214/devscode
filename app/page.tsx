import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {getProblems} from "@/data/problem/get-problems"
import {CardProblem} from "@/components/card-problem"
import {SideFilter} from "@/components/side-filter"

export default async function Home() {
  const {problems} = await getProblems()

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <section className="flex items-start justify-between py-8">
        <SideFilter />
        <section className="w-full flex-1 ">
          <div className="space-y-6 p-6">
            <div className="sticky top-10 z-10 flex items-center justify-between p-3 backdrop-blur">
              <h2 className="text-2xl font-bold">Problemas de Código</h2>
              <Button size="sm" variant="outline">
                Publicar Problema
              </Button>
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-6">
              {problems?.map((problem) => <CardProblem key={problem.id} problem={problem} />)}
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
