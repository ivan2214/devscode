import {db} from "@/lib/db"
import {Sidebar} from "@/app/(routes)/problems/components/sidebar"

interface ProblemsLayoutProps {
  children: React.ReactNode
}

const ProblemsLayout: React.FC<ProblemsLayoutProps> = async ({children}) => {
  const tags = await db.tag.findMany()

  return (
    <div className="container grid grid-cols-5">
      <Sidebar className="hidden lg:block" tags={tags} />
      {children}
    </div>
  )
}

export default ProblemsLayout
