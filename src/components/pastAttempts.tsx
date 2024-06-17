"use client"
import { stringToDateAndTime } from "@/utils/utilities"
import { useRouter } from "next/navigation"
import React from "react"

interface PastAttemptsProps {
   data: QuizData[]
}

const PastAttempts = (props: PastAttemptsProps) => {
   const router = useRouter()
   const onNavigateToQuiz = (id: number) => {
      router.push(`/result/${id}`)
   }

   return (
      <table className="table h-full">
         <thead>
            <tr>
               <th></th>
               <th>Topic</th>
               <th>Started At</th>
               <th>Score</th>
            </tr>
         </thead>
         <tbody className="">
            {props.data?.map((quiz, index) => (
               <tr
                  key={index}
                  className="hover cursor-pointer"
                  onClick={() => onNavigateToQuiz(quiz.id)}
               >
                  <th>{index + 1}.</th>
                  <th>{quiz.topic}</th>
                  <th>{stringToDateAndTime(quiz.created_at)}</th>
                  <th>
                     {quiz.score}/{quiz.responses.length}
                  </th>
               </tr>
            ))}
         </tbody>
      </table>
   )
}

export default PastAttempts
