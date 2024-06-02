import {Separator} from "@ui/separator"
import {QueryComponent} from "@/app/(routes)/problems/components/query-component"
import {CardProblem} from "@components/card-problem"
import {type QueryProps} from "@/types"
import {getFilteredProblems} from "@/data/problem/get-filtered-problems"

export default async function ProblemsPage({searchParams}: {searchParams?: QueryProps}) {
  const {problems} = await getFilteredProblems(searchParams)

  const hasQuery = searchParams && Object.keys(searchParams).length > 0

  return (
    <main className="w-full">
      <section className="px-4 py-6 lg:px-8">
        {hasQuery ? <QueryComponent searchParams={searchParams} /> : null}

        <Separator className="my-4" />

        <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
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
