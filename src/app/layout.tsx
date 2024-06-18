import type { Metadata } from "next"
import "./globals.css"
import SessionWrapper from "@/components/sessionWrapper"
import Navbar from "@/components/navbar"

export const metadata: Metadata = {
   title: "Quizme",
   description: "AI powered quiz platform",
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en" data-theme="light" id="layout">
         <SessionWrapper>
            <body className="flex flex-col h-screen">
               <Navbar />
               <div className="grow">
                  {children}
               </div>
            </body>
         </SessionWrapper>
      </html>
   )
}
