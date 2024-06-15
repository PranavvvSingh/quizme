"use client"

import Loader from "@/components/loader"
import Question from "@/components/question"
import Timer from "@/components/timer"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { TbCheck as CorrectIcon } from "react-icons/tb"
import { RxCross2 as WrongIcon } from "react-icons/rx"
import { createClient } from "@/utils/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import CorrectAns from "../../../../../public/correct.svg"
import IncorrectAns from "../../../../../public/incorrect.svg"
import Image from "next/image"
import Timeout from "@/components/timeout"

const Quiz = () => {
   const params = useParams()
   const router = useRouter()
   const [numOfQuestions] = useState<number>(parseInt(params.num[0]))
   const [topic] = useState(params.topic)
   const [quiz, setQuiz] = useState<OllamaResponseType>()
   const [currentQuestion, setCurrentQuestion] = useState(0)
   const [correct, setCorrect] = useState(0)
   const [incorrect, setIncorrect] = useState(0)
   const [isTimeUp, setIsTimeUp] = useState(false)
   const [showToast, setShowToast] = useState<"success" | "error" | null>(null)

   const supabase = createClient()
   const quizId = useRef<number>()
   const answers = useRef<number[]>([])
   const { data: session } = useSession()

   const fetchQuestions = async () => {
      const res = await axios.post("http://localhost:11434/api/generate", {
         model: "quizme",
         prompt: `Topic: ${topic} Questions: ${numOfQuestions}`,
         format: "json",
         stream: false,
      })
      const data: OllamaResponseType = JSON.parse(res.data.response)
      console.log(data)
      setQuiz(data)
      // save the data in database
      const insertDataIntoQuestion = data.questions.map((question) => {
         return {
            question: question.question,
            options: question.options,
            answer: question.answer,
         }
      })
      // 1. fill the question table. collect the question_ids
      const question_response = await supabase
         .from("question")
         .insert(insertDataIntoQuestion)
         .select()

      let question_ids
      if (question_response.data) {
         question_ids = question_response.data.map((question) => question.id)
      }
      // 2. fill the quiz table. collect the quiz_id
      const insertDataIntoQuiz = data.questions.map(() => -1)
      answers.current = insertDataIntoQuiz
      const quiz_response = await supabase
         .from("quiz")
         .insert({
            user: session?.user?.email ?? "test@gmail.com",
            responses: insertDataIntoQuiz,
            topic: topic,
            score: 0,
         })
         .select()
      let quiz_id: number
      if (quiz_response.data) {
         quiz_id = quiz_response.data[0].id
         quizId.current = quiz_id
      }
      // 3. fill enteries in quiz_mapping
      const insertDataIntoQuizMapping = question_ids?.map((data) => ({
         quiz_id,
         question_id: data,
      }))
      await supabase.from("quiz_mapping").insert(insertDataIntoQuizMapping)
   }

   const saveAnswer = async (selectedOption: number) => {
      const isCorrect =
         selectedOption === Number(quiz?.questions[currentQuestion].answer)
      answers.current[currentQuestion] = selectedOption

      if (isCorrect) {
         supabase
            .from("quiz")
            .update({ responses: answers.current, score: correct + 1 })
            .eq("id", quizId.current)
            .then(({ data, error }) => {
               console.log(data)
               if (error) console.log(error)
            })
         setCorrect((prev) => prev + 1)
         setShowToast("success")
      } else {
         supabase
            .from("quiz")
            .update({ responses: answers.current })
            .eq("id", quizId.current)
            .then(({ data, error }) => {
               console.log(data)
               if (error) console.log(error)
            })
         setIncorrect((prev) => prev + 1)
         setShowToast("error")
      }

      if (currentQuestion + 1 === quiz?.questions.length) {
         console.log("submitting quiz")
         submitQuiz()
         return
      }

      setCurrentQuestion((prev) => prev + 1)
   }

   const submitQuiz = async () => {
      router.push(`/result/${quizId.current}`)
   }

   useEffect(() => {
      fetchQuestions()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [params])

   useEffect(() => {
      if (!showToast) return
      const timeoutId = setTimeout(() => setShowToast(null), 3000)
      return () => clearTimeout(timeoutId)
   }, [showToast])

   if (!quiz) return <Loader />

   return (
      <>
         <div className="h-full flex items-center justify-center relative">
            <Timer numOfQuestions={numOfQuestions} />
            <div className="w-[600px]">
               <div className="flex justify-between items-center mb-5">
                  <div>
                     Topic: <button className="btn btn-sm">{topic}</button>
                  </div>
                  <div className="stats shadow ">
                     <div className="stat bg-green-500/[0.9] font-bold text-white px-4 py-[5px] flex items-center">
                        <CorrectIcon />
                        {correct}
                     </div>
                     <div className="stat bg-red-500/[0.9] font-bold text-white px-4 py-[5px] flex items-center">
                        <WrongIcon />
                        {incorrect}
                     </div>
                  </div>
               </div>
               <Question
                  questionType={quiz.questions[currentQuestion]}
                  saveAnswer={saveAnswer}
                  totalQuestions={quiz.questions.length}
               />
            </div>
            {showToast === "success" && (
               <div className="toast toast-end">
                  <div className="alert alert-success text-white">
                     <Image
                        src={CorrectAns}
                        alt="Correct Anse"
                        height={20}
                        width={20}
                     />
                     <span>You got it right!</span>
                  </div>
               </div>
            )}
            {showToast === "error" && (
               <div className="toast toast-end">
                  <div className="alert alert-error text-white">
                     <Image
                        src={IncorrectAns}
                        alt="Correct Anse"
                        height={20}
                        width={20}
                     />
                     <span>Wrong answer</span>
                  </div>
               </div>
            )}
            {quizId.current && <Timeout quizId={quizId.current} />}
         </div>
      </>
   )
}

export default Quiz
