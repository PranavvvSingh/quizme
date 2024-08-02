export { default } from "next-auth/middleware"

export const config = {
   matcher: ["/dashboard", "/quiz/:path*", "/result/:path*"],
}
