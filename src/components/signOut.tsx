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
      <button
         className="btn btn-outline px-2 py-1 min-h-[30px] h-[30px]"
         onClick={() => signOut()}
      >
         Sign Out
      </button>
   )
}

export default SignOut
