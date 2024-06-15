"use client"
import { signIn } from "next-auth/react"
import github from "../../../public/github.svg"
import Image from "next/image"

export default function SignIn() {
   return (
      <div className="h-full w-full flex flex-col gap-8 justify-center items-center pb-10">
         <h1 className="text-3xl">Sign in to get started</h1>
         <button className="btn text-lg" onClick={() => signIn("github")}>
            Sign in with Github
            <Image src={github} alt="Github_logo" height={25} />
         </button>
      </div>
   )
}
