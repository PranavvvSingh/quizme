"use client"

import { formatTime } from "@/utils/utilities"
import React, { SetStateAction, useEffect, useState } from "react"
import { RxLapTimer as TimerIcon } from "react-icons/rx"

interface TimerProps {
   // setIsTimeUp: React.Dispatch<SetStateAction<boolean>>
   numOfQuestions: number
   // submitQuiz: () => Promise<void>
}
const Timer = (props: TimerProps) => {
   const [time, setTime] = useState(10 * props.numOfQuestions) // 30s for each

   useEffect(() => {
      const intervalId = setInterval(() => {
         if (time === 0) {
            // props.submitQuiz()
            const element = document.getElementById(
               "timeout_modal",
            ) as HTMLFormElement
            if (element) element.showModal()
            return
         }
         setTime(time - 1)
      }, 1000)
      if (intervalId) return () => clearInterval(intervalId)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [time])

   return (
      <span className="absolute top-5 flex items-center gap-1 text-xl">
         <TimerIcon className="text-2xl" />
         {formatTime(time)}
      </span>
   )
}

export default React.memo(Timer)
