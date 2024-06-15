import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeButton from "@/components/themeButton"
import SessionWrapper from "@/components/sessionWrapper"
import { signOut } from "next-auth/react"
import SignOut from "@/components/signOut"
import Navbar from "@/components/navbar"

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en" data-theme="light">
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
