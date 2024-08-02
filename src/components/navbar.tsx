import React from "react"
import SignOut from "./signOut"
import ThemeButton from "./themeButton"
import Link from "next/link"
import QuizIcon from "../../public/quiz_logo.svg"
import Image from "next/image"

const Navbar = () => {
   return (
      <div className="sticky navbar justify-between px-5">
         <div className="text-xl font-bold border border-accent text-secondary rounded-xl px-3 py-2 border-e-4 border-b-4">
            <Image alt="Quiz icon" src={QuizIcon} width={30} height={30} />
            <Link href="/" className="text-xl text-primary ml-2">
               QuizMe
            </Link>
         </div>
         <div className="flex gap-7">
            <Link href="/" className="text-primary ml-2">
               Home
            </Link>
            <Link href="/dashboard" className="text-primary ml-2">
               Dashboard
            </Link>
            <SignOut />
            <ThemeButton />
         </div>
      </div>
   )
}

export default Navbar
