import "./globals.css"
import {Inter as FontSans} from "next/font/google"
import {Suspense, type ReactNode} from "react"
import {type Metadata} from "next"

import {Toaster} from "@ui/sonner"
import {cn} from "@/lib/utils"
import {auth} from "@/auth"
import {getUserById} from "@/data/user/user"
import {ThemeProvider} from "@/providers/theme-provider"
import {ModalProvider} from "@/providers/modal-provider"
import SearchBarFallback from "@components/fallbacks/search-bar-fallback"
import {Menu} from "@components/menu"
import {ClientOnly} from "@/components/client-only"
import {getAllTags} from "@/data/tag/get-all-tags"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "DevsCode",
  description:
    "Comunidad de programadores de todo el mundo donde aprendemos y compartimos soluciones de programación.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default async function RootLayout({children}: RootLayoutProps) {
  const session = await auth()
  const {tags} = await getAllTags()
  const user = await getUserById(session?.user?.id)

  return (
    <html suppressHydrationWarning lang="es">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider
          disableTransitionOnChange
          enableSystem
          attribute="class"
          defaultTheme="system"
        >
          <ClientOnly>
            <ModalProvider />
            <Toaster />
          </ClientOnly>
          <Suspense fallback={<SearchBarFallback />}>
            <Menu tags={tags} user={user} />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
