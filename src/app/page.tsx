import createClient from "@/utils/server"
import { getServerSession } from "next-auth/next"
import { options } from "./api/auth/[...nextauth]/options"
import HistoryIcon from "../../public/history.svg"
import Image from "next/image"
import QuizIcon from "../../public/quiz.svg"
import PastAttempts from "@/components/pastAttempts"
import Link from "next/link"

export default async function Home() {
   const supabase = await createClient()
   const session = await getServerSession(options)
   const { data: pastAttempts } = await supabase
      .from("quiz")
      .select()
      .eq("user", session?.user?.email)

   const recentTopics = await supabase.from("quiz").select("id, topic").limit(5)

   return (
      <div className="h-full w-full flex flex-col gap-9 p-8">
         <Link
            href={"/quiz"}
            className="w-[510px] card px-7 py-5 flex flex-row justify-between border rounded-lg cursor-pointer"
         >
            <div>
               <h1 className="font-bold text-xl">Start Quiz Now!</h1>
               <p>Challenge yourself to a quiz with a topic of your choice.</p>
            </div>
            <Image alt="Quiz icon" src={QuizIcon} width={40} />
         </Link>
         <div className="flex flex-row gap-9 w-full">
            <div className="w-[400px] grow-0 card-body px-7 py-5 border rounded-lg">
               <h2 className="card-title mb-4"># Recent Topics</h2>
               <table className="table">
                  <tbody>
                     {recentTopics.data?.map((topic, index) => (
                        <tr key={topic.id}>
                           <th>{index + 1}.</th>
                           <th>{topic.topic}</th>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="grow card-body px-7 py-5  border rounded-lg">
               <h2 className="card-title mb-4 flex">
                  <Image alt="Quiz icon" src={HistoryIcon} width={27} />
                  Your past attempts
               </h2>
               {pastAttempts && <PastAttempts data={pastAttempts} />}
            </div>
         </div>
      </div>
   )
}
