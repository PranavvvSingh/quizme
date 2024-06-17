import Link from "next/link"
import React from "react"

interface EndQuizProps {
   quizId: number
}

const EndQuiz = (props: EndQuizProps) => {
   return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-7">
         <h3 className="font-bold text-lg">Quiz Ended</h3>
         <p className="py-4">
            Your quiz session has ended premptively. Thank you for
            participating!
         </p>
         <div className="flex gap-4">
            <button className="btn">
               <Link href="/">Go to dashboard</Link>
            </button>
            <button className="btn btn-outline">
               <Link href={`/result/${props.quizId}`}>View Summary</Link>
            </button>
         </div>
      </div>
   )
}

export default EndQuiz
