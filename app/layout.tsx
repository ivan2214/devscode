import "./globals.css"
import {Inter as FontSans} from "next/font/google"
import {Suspense, type ReactNode} from "react"

import {Toaster} from "@ui/sonner"
import {cn} from "@/lib/utils"
import {db} from "@/lib/db"
import {auth} from "@/auth"
import {getUserById} from "@/data/user/user"
import {ThemeProvider} from "@/providers/theme-provider"
import {ModalProvider} from "@/providers/modal-provider"
import SearchBarFallback from "@components/fallbacks/search-bar-fallback"
import {Menu} from "@components/menu"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({children}: RootLayoutProps) {
  const tags = await db.tag.findMany({})
  const session = await auth()

  const user = await getUserById(session?.user?.id)

  return (
    <html suppressHydrationWarning lang="es">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
          <ModalProvider />
          <Toaster />
          <Suspense fallback={<SearchBarFallback />}>
            <Menu tags={tags} user={user} />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
