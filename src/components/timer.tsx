"use client"

import { formatTime } from "@/utils/utilities"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { RxLapTimer as TimerIcon } from "react-icons/rx"

interface TimerProps {
   numOfQuestions: number
   stopTimer: boolean
   onTimeUp: () => void
}
const Timer = (props: TimerProps) => {
   const [time, setTime] = useState(20 * props.numOfQuestions) // 30s for each

   useEffect(() => {
      if (props.stopTimer) return
      const intervalId = setInterval(() => {
         if (time === 0) {
            props.onTimeUp()
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
