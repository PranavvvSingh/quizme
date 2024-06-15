import Link from "next/link"
import React from "react"

interface TimeoutProps {
   quizId: number
}

const Timeout = (props: TimeoutProps) => {
   return (
      <dialog id="timeout_modal" className="modal">
            <div className="modal-box">
               <h3 className="font-bold text-lg">Time Over</h3>
               <p className="py-4">
                  Your quiz session has ended. Thank you for participating!
               </p>
               <div className="modal-action">
                  <form method="dialog">
                     <button className="btn mr-2"><Link href="/">Go to dashboard</Link></button>
                     <button className="btn btn-outline">
                        <Link href={`/result/${props.quizId}`}>View Statistics</Link>
                     </button>
                  </form>
               </div>
            </div>
      </dialog>
   )
}

export default Timeout
