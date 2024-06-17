"use client"

import { useCallback, useEffect, useRef } from "react"

const StartQuiz = () => {
   const enteredFullScreen = useRef(false)

   const onEnterFullScreen = useCallback(() => {
      if (typeof document !== "undefined") {
         const layout = document.getElementById("layout")
         if (!document.fullscreenElement) {
            if (layout) {
               layout.requestFullscreen()
               enteredFullScreen.current = true
               console.log("in full screen")
            }
         }
      }
   }, [])

   const onChangeFullScreen = useCallback(() => {
      if (typeof document === "undefined") return
      if (enteredFullScreen.current && !document.fullscreenElement) {
         console.log("terminate the quiz and show error")
         alert("terminate the quiz and show error")
      }
   }, [])

   const handleVisibilityChange = useCallback(() => {
      if (document.visibilityState === "hidden") {
         console.log("Tab or window change detected")
      }
   }, [])

   useEffect(() => {
      document.addEventListener("fullscreenchange", onChangeFullScreen)
      document.addEventListener("visibilitychange", handleVisibilityChange)

      return () => {
         document.removeEventListener("fullscreenchange", onChangeFullScreen)
         document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange,
         )
      }
   }, [])

   return (
      <div className="flex h-full w-full justify-center items-stretch p-10">
         <div className="flex flex-col gap-10 w-[50%] justify-center items-center">
            <ul className="list-inside list-disc text-lg space-y-8 text-center">
               <li>Do not try to exit full screen mode.</li>
               <li>Pressing Esc key will terminate the quiz.</li>
               <li>You can only attempt the quiz once.</li>
               <li>Navigating between questions is not allowed.</li>
            </ul>
            <button className="btn text-lg" onClick={onEnterFullScreen}>
               Start Quiz
            </button>
         </div>
      </div>
   )
}

export default StartQuiz
