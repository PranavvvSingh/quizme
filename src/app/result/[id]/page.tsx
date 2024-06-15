import Image from "next/image"
import React from "react"
import TrophyIcon from "../../../../public/trophy.svg"
import BadgeIcon from "../../../../public/badge.svg"
import DashboardIcon from "../../../../public/dashboard.svg"
import AccuracyIcon from "../../../../public/accuracy.svg"
import QuestionReview from "@/components/questionReview"
import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"
import createClient from "@/utils/server"
import Link from "next/link"

async function fetchData(id: string) {
   const supabase = await createClient()
   const session = await getServerSession(options)
   console.log(session?.user?.email)
   const quizResponse = await supabase
      .from("quiz")
      .select("score, responses, created_at")
      .match({ id: id, user: session?.user?.email })

   const response = await supabase
      .from("question")
      .select(`id, question, options, answer, quiz_mapping!inner(quiz_id)`)
      .eq("quiz_mapping.quiz_id", id)

   let questions
   if (response.data) {
      questions = response.data?.map((quest, index) => ({
         id: quest.id,
         question: quest.question,
         options: quest.options,
         answer: quest.answer,
         response: quizResponse.data?.[0].responses[index],
      }))
   } else questions = [{} as QuestionResponseType]
   return {
      score: quizResponse.data?.[0].score,
      created_at: quizResponse.data?.[0].created_at,
      questions: questions,
   }
}

const Result = async ({ params }: { params: { id: string } }) => {
   const res: QuizResult = await fetchData(params.id)

   return (
      <div className="w-[80%] mx-auto my-7">
         <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Summary</h1>
            <button className="btn px-2 min-h-[35px] h-[35px]">
               <Image src={DashboardIcon} alt="Score" height={25} width={25} />
               <Link href="/" className="text-lg">Back to Dashboard</Link>
            </button>
         </div>
         <div className="card rounded-md border-2 border-black mx-auto px-5 py-4 mt-5">
            <div className="flex justify-between items-center">
               <h1 className="text-xl font-bold">Results</h1>
               <Image src={BadgeIcon} alt="Score" height={25} width={25} />
            </div>
            <Image
               src={TrophyIcon}
               alt="Score"
               height={50}
               width={50}
               className="mx-auto"
            />
            <h1 className="text-2xl mx-auto">
               You scored {res.score}/{res.questions.length}
            </h1>
            <div className="flex gap-1 justify-center mt-2">
               <Image src={AccuracyIcon} alt="Score" height={20} width={20} />
               <p className=" text-neutral-500">
                  Accuracy{" "}
                  {Math.round((res.score / res.questions.length) * 100)}%
               </p>
            </div>
         </div>
         <ol className="list-decimal px-5 mt-5">
            {res.questions.map((item) => (
               <QuestionReview key={item.id} {...item} />
            ))}
         </ol>
      </div>
   )
}

export default Result
