import Cloud from "@/components/cloud"
import PastAttempts from "@/components/pastAttempts"
import { createClient } from "@/utils/client"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { options } from "../api/auth/[...nextauth]/options"
import HistoryIcon from "../../../public/history.svg"
import QuizIcon from "../../../public/quiz.svg"
import Image from "next/image"

export default async function Dashboard() {
   const supabase = await createClient()
   const session = await getServerSession(options)
   const { data: pastAttempts } = await supabase
      .from("quiz")
      .select()
      .eq("user", session?.user?.email)
      .order("created_at", { ascending: false })

   const { data: recentTopics } = await supabase
      .from("quiz")
      .select("id, topic, created_at")
      .limit(10)
      .order("created_at", { ascending: false })

   return (
      // <div className="h-full w-full flex flex-col gap-9 p-8 text-secondary">
      <div className="flex flex-row gap-9 w-full h-full grow p-8 text-secondary">
         <div className="w-[500px] grow-0 card-body flex flex-col p-0 gap-5">
            <Link
               href={"/quiz"}
               className="card px-7 py-5 flex flex-row justify-between border border-accent rounded-lg cursor-pointer"
            >
               <div>
                  <h1 className="font-bold text-xl text-primary">
                     Start Quiz Now!
                  </h1>
                  <p>
                     Challenge yourself to a quiz with a topic of your choice.
                  </p>
               </div>
            </Link>
            <div className="border border-accent rounded-lg px-7 py-5">
               <h2 className="card-title mb-4 text-primary"># Recent Topics</h2>
               {recentTopics && <Cloud data={recentTopics} />}
            </div>
         </div>
         <div className="card-body px-7 py-5 border border-accent rounded-lg">
            <h2 className="card-title mb-4 flex text-primary">
               <Image alt="Quiz icon" src={HistoryIcon} width={27} />
               Your past attempts
            </h2>
            {pastAttempts && pastAttempts?.length === 0 ? (
               <div className="text-lg h-full flex justify-center items-center text-primary">
                  No history found
               </div>
            ) : (
               <div className="h-[60vh] overflow-y-auto">
                  {pastAttempts && <PastAttempts data={pastAttempts} />}
               </div>
            )}
         </div>
      </div>
      // </div>
   )
}
