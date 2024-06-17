import React from "react"
import SignOut from "./signOut"
import ThemeButton from "./themeButton"
import Link from "next/link"

const Navbar = () => {
   return (
      <div className="sticky navbar justify-between px-5">
         <button className="btn text-xl font-bold border-black border border-e-4 border-b-4">
            <Link href="/">QuizMe</Link>
         </button>
         <div className="flex gap-7">
            <ThemeButton />
            <SignOut />
         </div>
      </div>
   )
}

export default Navbar
