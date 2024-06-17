"use client"

import { signIn, useSession } from "next-auth/react"
import github from "../../../public/github.svg"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"
import DashboardIcon from "../../../public/dashboard.svg"

export default function SignIn() {
   const { data: session, status } = useSession()
   const [showToast, setShowToast] = useState(false)

   useEffect(() => {
      if (!showToast) return
      const timeoutId = setTimeout(() => setShowToast(false), 3000)
      return () => clearTimeout(timeoutId)
   }, [showToast])

   useEffect(() => {
      if (status === "authenticated") setShowToast(true)
   }, [status])

   return (
      <>
         <div className="h-full w-full flex flex-col gap-8 justify-center items-center pb-10">
            {status === "authenticated" && (
               <>
                  <h1 className="text-2xl">
                     You are signed in as {session.user?.name}
                  </h1>
                  <button className="btn">
                     <Image
                        src={DashboardIcon}
                        alt="Score"
                        height={25}
                        width={25}
                     />
                     <Link href="/" className="text-lg">
                        Back to Dashboard
                     </Link>
                  </button>
               </>
            )}
            {status === "loading" && (
               <>
                  <h1 className="text-2xl">Loading ...</h1>
                  <span className="loading loading-dots loading-lg"></span>
               </>
            )}
            {status === "unauthenticated" && (
               <>
                  <h1 className="text-2xl">Sign in to get started</h1>
                  <button
                     className="btn text-lg"
                     onClick={() => signIn("github")}
                  >
                     Sign in with Github
                     <Image
                        src={github}
                        alt="Github_logo"
                        height={25}
                        width={25}
                     />
                  </button>
               </>
            )}
         </div>
         {showToast && (
            <div className="toast toast-end">
               <div className="alert alert-success text-white">
                  <span>Sign-in successful!</span>
               </div>
            </div>
         )}
      </>
   )
}
