import dynamic from "next/dynamic"
import {type LucideProps} from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"
import {type HTMLAttributes} from "react"

export interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
  className?: HTMLAttributes<SVGElement>["className"]
}

const Icon = ({name, className, ...props}: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name])

  return <LucideIcon className={className} {...props} />
}

export default Icon
