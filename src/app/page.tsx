import Link from "next/link"

export default async function Home() {
   return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-9 p-8 text-secondary bg-gradient-to-t via-60% from-primary/[0.3] via-transparent to-transparent">
         <h1 className="text-5xl text-secondary font-bold">
            Your AI powered Quiz Assistant
         </h1>
         <h2>Challenge yourself to a quiz with a topic of your choice!</h2>
         <Link href="/quiz" className="btn btn-primary text-lg">
            Get Started
         </Link>
      </div>
   )
}
