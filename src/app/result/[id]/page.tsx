import Image from "next/image"
import React from "react"
import { GoTrophy as TrophyIcon } from "react-icons/go";
import { PiMedal as BadgeIcon} from "react-icons/pi"
import { MdOutlineSpaceDashboard as DashboardIcon } from "react-icons/md"
import AccuracyIcon from "../../../../public/accuracy.svg"
import QuestionReview from "@/components/questionReview"
import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"
import createClient from "@/utils/server"
import Link from "next/link"

async function fetchData(id: string) {
   const supabase = await createClient()
   const session = await getServerSession(options)
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
      <div className="w-[80%] mx-auto my-7 text-secondary">
         <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Summary</h1>
            <button className="btn btn-outline btn-primary px-2 min-h-[35px] h-[35px]">
               <DashboardIcon className="text-primary h-[20px] w-[20px]" />
               <Link href="/dashboard" className="text-lg">
                  Back to Dashboard
               </Link>
            </button>
         </div>
         <div className="card rounded-md border-2 border-accent mx-auto px-5 py-4 mt-5">
            <div className="flex justify-between items-center">
               <h1 className="text-xl font-bold text-primary">Results</h1>
               <BadgeIcon className="text-secondary h-[30px] w-[30px]" />
            </div>
            <TrophyIcon className="text-secondary h-[40px] w-[40px] mx-auto mb-2" />
            <h1 className="text-2xl mx-auto text-primary">
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
