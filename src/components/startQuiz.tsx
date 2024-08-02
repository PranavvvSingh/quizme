"use client"

interface StartQuizProps {
   onStartQuiz: () => void
}
const StartQuiz = (props: StartQuizProps) => {

   return (
      <div className="flex h-full w-full justify-center items-stretch p-10">
         <div className="flex flex-col gap-10 w-[50%] justify-center items-center">
            <ul className="list-inside list-disc text-lg space-y-8 text-center">
               <li>Do not try to exit full screen mode.</li>
               <li>Pressing Esc key will terminate the quiz.</li>
               <li>You can only attempt the quiz once.</li>
               <li>Navigating between questions is not allowed.</li>
            </ul>
            <button
               className="btn text-lg btn-primary"
               onClick={props.onStartQuiz}
            >
               Start Quiz
            </button>
         </div>
      </div>
   )
}

export default StartQuiz
