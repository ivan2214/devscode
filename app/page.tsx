import Link from "next/link"

import {Button} from "@ui/button"
import {Separator} from "@ui/separator"
import {CardProblem} from "@components/card-problem"
import {SideFilter} from "@components/side-filter"
import {getFilteredProblems} from "@/data/problem/get-filtered-problems"
import {ActiveIa} from "@components/active-ia"

export default async function Home() {
  const {problems} = await getFilteredProblems()

  return (
    <main className="container px-4 sm:px-6 lg:px-8">
      <section className="flex items-start justify-between py-8">
        <div className="sticky  top-10 flex max-w-xs flex-col gap-y-5 space-y-4">
          <SideFilter />
          <ActiveIa />
        </div>
        <Separator orientation="vertical" />
        <section className="w-full flex-1 ">
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between p-3">
              <h2 className="text-2xl font-bold">Problemas de Código</h2>
              <Button role="link" type="button">
                <Link href="/ask/create">Publicar problem</Link>
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
