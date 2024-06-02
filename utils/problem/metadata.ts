import {type Metadata} from "next"

import {getProblem} from "@/data/problem/get-problem"

interface GenerateMetadataProps {
  params: {problemId: string}
}

export const generateMetadata = async ({
  params: {problemId},
}: GenerateMetadataProps): Promise<Metadata> => {
  const {problem} = await getProblem(problemId)

  if (!problem) return {}

  return {
    title: problem?.title,
    description: problem?.description,
    openGraph: {
      title: problem?.title,
      description: problem?.description,
      type: "website",
      url: `${process.env.PAGE_URL}/problem/${problemId}`,
      siteName: "Devs Code",
      locale: "es-AR",
      countryName: "Argentina",
    },
    twitter: {
      card: "summary",
      title: problem?.title,
      description: problem?.description,
      site: `${process.env.PAGE_URL}/problem/${problemId}`,
      creator: "@DevsCode",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `${process.env.PAGE_URL}/problem/${problemId}`,
    },
    keywords: problem?.tags?.map(({tag}) => tag.name),
    authors: [{name: "Devs Code", url: "https://Devscode.dev"}],
  }
}
