import React from "react"
import { redirect } from "next/navigation"

const startQuiz = async (formData: FormData) => {
   "use server"
   const topic = formData.get("topic") as string
   const numOfQuestions = formData.get("numOfQuestions") as string
   redirect(`/quiz/${topic}/${numOfQuestions}`)
}

const Quiz = () => {
   return (
      <div className="flex items-center justify-center mx-auto h-full">
         <div className="w-[400px]">
            <form
               action={startQuiz}
               className="card-body px-7 py-5  border rounded-lg"
            >
               <h2 className="card-title mb-4">Begin your quiz now!</h2>
               <label className="form-control w-full max-w-xs">
                  <div className="label">
                     <span className="label-text">Mention your topic</span>
                  </div>
                  <input
                     type="text"
                     name="topic"
                     placeholder="Enter here"
                     className="input input-bordered input-sm h-[40px] w-full max-w-xs mb-2"
                  />
                  <div className="label">
                     <span className="label-text">No. of questions</span>
                  </div>
                  <input
                     type="number"
                     name="numOfQuestions"
                     placeholder="Enter here"
                     className="input input-bordered input-sm h-[40px] w-full max-w-xs mb-7"
                  />
               </label>
               <div className="card-actions justify-center">
                  <button type="submit" className="btn">
                     Start Quiz
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default Quiz
