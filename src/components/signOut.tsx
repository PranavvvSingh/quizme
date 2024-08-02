"use client"

import { signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import React from "react"

const SignOut = () => {
   const { data: session } = useSession()
   const pathname = usePathname()
   const hideSignOut = pathname.split("/")[1] === "quiz"

   if (!session?.user) return null

   else if (pathname.split("/")[1] === "quiz") return null

   return (
      <div
         className="text-primary cursor-pointer"
         onClick={() => signOut()}
      >
         Sign Out
      </div>
   )
}

export default SignOut
