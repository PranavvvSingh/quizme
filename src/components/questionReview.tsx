import React from "react"
import TickIcon from "../../public/tick.svg"
import CrossIcon from "../../public/cross.svg"
import Image from "next/image"

const QuestionReview = (props: QuestionResponseType) => {
   const showCorrect = (index: number) => {
      return index === props.answer
   }
   const showIncorrect = (index: number) => {
      return index === props.response && index !== props.answer
   }

   return (
      <li className="p-4">
         <h1 className="font-bold space-x-5">
            {props.question}
            {props.response === -1 ? (
               <div className="badge badge-neutral ml-2 pb-[3px] text-white">
                  Unanswered
               </div>
            ) : props.response === props.answer ? (
               <div className="badge badge-neutral ml-2 pb-[3px] text-white bg-green-500 border-0">
                  Correct
               </div>
            ) : (
               <div className="badge badge-neutral ml-2 pb-[3px] text-white bg-red-500 border-0">
                  Incorrect
               </div>
            )}
         </h1>
         <ul className="list-inside list-disc">
            {props.options.map((option, index) => (
               <li
                  key={option}
                  className={`${showCorrect(index) && "text-green-500"} ${
                     showIncorrect(index) && "text-red-500"
                  } `}
               >
                  {option}
                  {showCorrect(index) && (
                     <Image
                        src={TickIcon}
                        alt="Correct Icon"
                        height={25}
                        width={25}
                        className="inline"
                     />
                  )}
                  {showIncorrect(index) && (
                     <Image
                        src={CrossIcon}
                        alt="Incorrect Icon"
                        height={25}
                        width={25}
                        className="inline"
                     />
                  )}
               </li>
            ))}
         </ul>
      </li>
   )
}

export default QuestionReview
