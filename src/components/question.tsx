"use client"

import React, { useEffect, useState } from "react"
import { MdNavigateNext as NextIcon } from "react-icons/md"

interface QuestionPropsTypes {
   questionType: QuestionType
   saveAnswer: (selectedOption: number) => Promise<void>
   totalQuestions: number
}
const Question = (props: QuestionPropsTypes) => {
   const [selectedOption, setSelectedOption] = useState(-1)

   useEffect(() => {
      setSelectedOption(-1)
   }, [props])

   return (
      <div className="card-body py-[25px] border rounded-md">
         <h2 className="card-title">{`Question ${props.questionType.id + 1}/${
            props.totalQuestions
         }`}</h2>
         <p>{props.questionType.question}</p>
         <p className="mt-3">Choose option:</p>

         <div className="flex flex-col items-start justify-center gap-2">
            {props.questionType.options.map((option, index) => (
               <div
                  key={index}
                  className="flex items-start justify-center gap-2"
               >
                  <input
                     type="radio"
                     name="radio-3"
                     checked={selectedOption === index}
                     onClick={() => setSelectedOption(index)}
                     className="radio h-[20px] w-[20px] mt-[3px] accent-primary"
                  />
                  <p onClick={() => setSelectedOption(index)}>{option}</p>
               </div>
            ))}
         </div>

         <div className="card-actions justify-end mt-3">
            <button
               className="btn btn-outline btn-primary"
               disabled={selectedOption === -1}
               onClick={() => props.saveAnswer(selectedOption)}
            >
               Save Answer
               <NextIcon />
            </button>
         </div>
      </div>
   )
}

export default Question
