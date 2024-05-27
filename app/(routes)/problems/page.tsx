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
    <main className="w-full border-t lg:col-span-4 lg:border-l">
      <section className="h-full px-4 py-6 lg:px-8">
        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Lista de problemas</h2>
            <p className="text-sm text-muted-foreground">
              Encontra los problems que estás buscando.
            </p>
          </div>
        </div>

        {hasQuery ? <QueryComponent searchParams={searchParams} /> : null}

        <Separator className="my-4" />

        <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {problems.length ? (
            problems.map((problem) => <CardProblem key={problem.id} problem={problem} />)
          ) : (
            <section>
              <p>No se encontraron problemas</p>
            </section>
          )}
        </section>
      </section>
    </main>
  )
}
