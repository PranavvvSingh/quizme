import Link from "next/link"
import React from "react"

interface QuizOverProps {
   status: "terminate" | "timeup" | "ended"
   quizId: number
}
const QuizOver = (props: QuizOverProps) => {
   let heading
   switch (props.status) {
      case "timeup":
         heading = "Time Over"
         break
      case "terminate":
         heading = "Quiz Terminated!"
         break
      case "ended":
         heading = "Quiz Completed"
         break
   }
   
   return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-7">
         <h3 className="font-bold text-lg">{heading}</h3>
         <p className="py-4">
            Your quiz session has ended. Thank you for participating!
         </p>
         <div className="flex gap-2">
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

export default QuizOver
