import {Suspense} from "react"

import {Separator} from "@/components/ui/separator"
import {SearchBar} from "@/components/search-bar"
import SearchBarFallback from "@/components/fallbacks/search-bar-fallback"
import {type QueryProps, getFilteredProblems} from "@/data/problem/get-filtered-problems"
import {QueryComponent} from "@/app/(routes)/problems/components/query-component"
import {CardProblem} from "@/components/card-problem"

export default async function ProblemsPage({searchParams}: {searchParams?: QueryProps}) {
  const {problems} = await getFilteredProblems(searchParams)

  const hasQuery = searchParams && Object.keys(searchParams).length > 0

  return (
    <main className="col-span-5 border-t lg:col-span-4 lg:border-l">
      <section className="h-full px-4 py-6 lg:px-8">
        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Listado de ofertas</h2>
            <p className="text-sm text-muted-foreground">
              Encuentra las mejores ofertas, descuentos y promociones.
            </p>
          </div>
        </div>

        {hasQuery ? <QueryComponent searchParams={searchParams} /> : null}

        <Separator className="my-4" />

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3 xl:grid-cols-4">
          {problems.map((problem) => (
            <CardProblem key={problem.id} problem={problem} />
          ))}
        </section>
      </section>
    </main>
  )
}
