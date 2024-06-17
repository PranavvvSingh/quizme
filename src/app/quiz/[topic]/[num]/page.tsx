"use client"

import Loader from "@/components/loader"
import Question from "@/components/question"
import Timer from "@/components/timer"
import axios from "axios"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { TbCheck as CorrectIcon } from "react-icons/tb"
import { RxCross2 as WrongIcon } from "react-icons/rx"
import { createClient } from "@/utils/client"
import { useSession } from "next-auth/react"
import CorrectAns from "../../../../../public/correct.svg"
import IncorrectAns from "../../../../../public/incorrect.svg"
import Image from "next/image"
import StartQuiz from "@/components/startQuiz"
import QuizOver from "@/components/quizOver"

const Quiz = () => {
   const params = useParams()

   const topic = useRef(params.topic)
   const numOfQuestions = useRef(parseInt(params.num[0]))
   const [quiz, setQuiz] = useState<OllamaResponseType>()
   const [currentQuestion, setCurrentQuestion] = useState(0)
   const [correct, setCorrect] = useState(0)
   const [incorrect, setIncorrect] = useState(0)
   const [showToast, setShowToast] = useState<"success" | "error" | null>(null)
   const [quizStatus, setQuizStatus] = useState<
      "pending" | "started" | "timeup" | "ended" | "terminate" | null
   >(null)

   const supabase = createClient()
   const quizId = useRef<number>()
   const answers = useRef<number[]>([])
   const { data: session } = useSession()

   const enteredFullScreen = useRef(false)

   const fetchQuestions = async () => {
      const res = await axios.post("http://localhost:11434/api/generate", {
         model: "quizme",
         prompt: `Topic: ${topic.current} Questions: ${numOfQuestions.current}`,
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
            topic: topic.current,
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

      setQuizStatus("pending")
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
            .then(({ error }) => {
               if (error) console.log(error)
            })
         setCorrect((prev) => prev + 1)
         setShowToast("success")
      } else {
         supabase
            .from("quiz")
            .update({ responses: answers.current })
            .eq("id", quizId.current)
            .then(({ error }) => {
               if (error) console.log(error)
            })
         setIncorrect((prev) => prev + 1)
         setShowToast("error")
      }

      if (currentQuestion + 1 === quiz?.questions.length) {
         setQuizStatus("ended")
         submitQuiz()
         return
      }

      setCurrentQuestion((prev) => prev + 1)
   }

   const submitQuiz = () => {
      if (typeof document !== "undefined") {
         if (document.fullscreenElement) {
            document.exitFullscreen()
            enteredFullScreen.current = false
         }
      }
      // router.push(`/result/${quizId.current}`)
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

   const onEnterFullScreen = useCallback(() => {
      if (typeof document !== "undefined") {
         const layout = document.getElementById("layout")
         if (!document.fullscreenElement && layout) {
            layout.requestFullscreen()
            enteredFullScreen.current = true
         }
      }
   }, [])

   const onChangeFullScreen = useCallback(() => {
      if (typeof document === "undefined") return
      if (enteredFullScreen.current && !document.fullscreenElement) {
         setQuizStatus("terminate")
         submitQuiz()
      }
   }, [])

   const onChangeVisibility = useCallback(() => {
      if (typeof document === "undefined") return
      if (document.visibilityState === "hidden") {
         setQuizStatus("terminate")
         submitQuiz()
      }
   }, [])

   useEffect(() => {
      if (quizStatus === "started") {
         document.addEventListener("fullscreenchange", onChangeFullScreen)
         document.addEventListener("visibilitychange", onChangeVisibility)
      }

      return () => {
         document.removeEventListener("fullscreenchange", onChangeFullScreen)
         document.removeEventListener("visibilitychange", onChangeVisibility)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [quizStatus])

   if (!quizStatus || !quiz) return <Loader />
   else if (quizStatus === "pending")
      return (
         <StartQuiz
            onStartQuiz={() => {
               setQuizStatus("started")
               onEnterFullScreen()
            }}
         />
      )
   // make one component for all of these
   else if (
      (quizStatus === "ended" ||
         quizStatus === "timeup" ||
         quizStatus === "terminate") &&
      quizId.current
   ) {
      return <QuizOver quizId={quizId.current} status={quizStatus} />
   }

   return (
      <div className="h-full flex items-center justify-center relative">
         <Timer
            numOfQuestions={numOfQuestions.current}
            stopTimer={quizStatus === "terminate"}
            onTimeUp={() => setQuizStatus("timeup")}
         />
         <div className="w-[600px]">
            <div className="flex justify-between items-center mb-5">
               <div>
                  Topic: <button className="btn btn-sm">{topic.current}</button>
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
                     alt="Correct Answer"
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
                     alt="Incorrect Answer"
                     height={20}
                     width={20}
                  />
                  <span>Wrong answer</span>
               </div>
            </div>
         )}
      </div>
   )
}

export default Quiz
