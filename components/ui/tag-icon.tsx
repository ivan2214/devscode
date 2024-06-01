import {type SVGProps} from "react"

import {
  DeviconAngular,
  DeviconCsharp,
  DeviconDocker,
  DeviconGit,
  DeviconGitlab,
  DeviconGooglecloud,
  DeviconJava,
  DeviconJavascript,
  DeviconMongodb,
  DeviconMysql,
  DeviconNodejs,
  DeviconOracle,
  DeviconPhp,
  DeviconPostgresql,
  DeviconPython,
  DeviconReact,
  DeviconSqlite,
  DeviconSvelte,
  DeviconTailwindcss,
  DeviconTypescript,
  DeviconVuejs,
  DeviconWeb3,
  HugeiconsMobileProgramming01,
  SimpleIconsApollographql,
  VscodeIconsFileTypeGraphql,
  CodiconGithubInverted,
  DeviconAmazonwebservicesWordmark,
  DeviconAzure,
  DeviconC,
  DeviconCoffeescript,
  DeviconCplusplus,
  DeviconCss3,
  DeviconDart,
  DeviconElixir,
  DeviconErlang,
  DeviconFlutter,
  DeviconGo,
  DeviconGradle,
  DeviconGroovy,
  DeviconHaskell,
  DeviconHtml5,
  DeviconKubernetes,
  DeviconMariadb,
  DeviconMicrosoftsqlserver,
  DeviconNextjs,
  DeviconNuxtjs,
  StreamlineProgrammingBrowserCode1CodeBrowserLineShellProgrammingCommandTerminal,
  StreamlineProgrammingBrowserCode2CodeBrowserTagsAngleProgrammingBracket,
  HugeiconsBlockchain01,
} from "@ui/icons-svg"

export const TagIcons: Record<string, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  mobile: HugeiconsMobileProgramming01,
  "front end": StreamlineProgrammingBrowserCode1CodeBrowserLineShellProgrammingCommandTerminal,
  "back end": StreamlineProgrammingBrowserCode2CodeBrowserTagsAngleProgrammingBracket,
  "full stack": DeviconJava,
  tailwind: DeviconTailwindcss,
  web3: DeviconWeb3,
  react: DeviconReact,
  vue: DeviconVuejs,
  angular: DeviconAngular,
  flutter: DeviconFlutter,
  nextjs: DeviconNextjs,
  nuxt: DeviconNuxtjs,
  svelte: DeviconSvelte,
  python: DeviconPython,
  java: DeviconJava,
  c: DeviconC,
  coffeescript: DeviconCoffeescript,
  cplusplus: DeviconCplusplus,
  "c#": DeviconCsharp,
  css: DeviconCss3,
  dart: DeviconDart,
  elixir: DeviconElixir,
  erlang: DeviconErlang,
  go: DeviconGo,
  gradle: DeviconGradle,
  groovy: DeviconGroovy,
  haskell: DeviconHaskell,
  html: DeviconHtml5,
  php: DeviconPhp,
  javascript: DeviconJavascript,
  typescript: DeviconTypescript,
  docker: DeviconDocker,
  kubernetes: DeviconKubernetes,
  aws: DeviconAmazonwebservicesWordmark,
  azure: DeviconAzure,
  gcp: DeviconGooglecloud,
  git: DeviconGit,
  gitlab: DeviconGitlab,
  nodejs: DeviconNodejs,
  mongodb: DeviconMongodb,
  mysql: DeviconMysql,
  postgresql: DeviconPostgresql,
  sqlite: DeviconSqlite,
  sqlserver: DeviconMicrosoftsqlserver,
  oracle: DeviconOracle,
  mariadb: DeviconMariadb,
  github: CodiconGithubInverted,
  graphql: VscodeIconsFileTypeGraphql,
  apollo: SimpleIconsApollographql,
  blockchain: HugeiconsBlockchain01,
}

export const TagIcon = ({
  name,
  className,
}: {
  name: string
  className?: HTMLDivElement["className"]
}) => {
  const Icon = TagIcons[name]

  return <Icon className={className} />
}
