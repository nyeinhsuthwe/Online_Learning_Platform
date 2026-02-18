import ResetPassword from "@/features/Auth/ResetPassword"
import { ModeToggle } from "@/features/DarkMode"

const ResetPasswordPage = () => {
  return (
    <div>
      <div className="absolute top-4 right-4 ">
        <ModeToggle />
      </div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
        <div className="w-full max-w-sm">
         <ResetPassword/>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
