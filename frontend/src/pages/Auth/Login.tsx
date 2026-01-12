import { ModeToggle } from "@/features/DarkMode"
import { LoginForm } from "@/features/LoginForm"

const Login = () => {
  return (
    <div>
       <div className="absolute top-4 right-4 ">
        <ModeToggle />
      </div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
      <div className="w-full max-w-sm">
         <LoginForm/>
         </div>
       </div>
    </div>
  )
}

export default Login
