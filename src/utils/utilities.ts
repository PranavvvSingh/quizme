export function formatTime(seconds: number) {
   const hours = Math.floor(seconds / 3600)
   const minutes = Math.floor((seconds % 3600) / 60)
   const remainingSeconds = seconds % 60

   const formattedHours = String(hours).padStart(2, "0")
   const formattedMinutes = String(minutes).padStart(2, "0")
   const formattedSeconds = String(remainingSeconds).padStart(2, "0")

   return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

export const stringToDateAndTime = (dateString: string) => {
   const date = new Date(dateString)
   const hours = date.getHours()
   const minutes = date.getMinutes()
   const ampm = hours >= 12 ? "PM" : "AM"
   const formattedDate = `${date.getDate()}-${date.toLocaleString("default", {
      month: "short",
   })}-${date.getFullYear()}`
   const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
   }${minutes} ${ampm}`

   return `${formattedTime}, ${formattedDate}`
}

