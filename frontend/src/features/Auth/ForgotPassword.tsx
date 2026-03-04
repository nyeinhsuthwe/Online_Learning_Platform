import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NavLink } from "react-router-dom"
import { useApiMutation } from "@/hooks/useMutation"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const forgotPasswordMutation = useApiMutation<{ email: string }, { message?: string }>({
    onSuccess: (res) => {
      setMessage(res?.data?.message || "A reset link has been sent to your email.")
    },
    onError: (err: any) => {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.")
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage("")
    setError("")

    if (!email) {
      setError("Email is required")
      return
    }

    forgotPasswordMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/forgot-password`,
      method: "POST",
      body: { email },
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-100 text-green-700 p-3 rounded">
                {message}
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FieldDescription>
                Enter your email and we’ll send a reset link.
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button
                  type="submit"
                  disabled={forgotPasswordMutation.isPending}
                  className="bg-primary-dark text-white hover:bg-primary-hover w-full"
                >
                  {forgotPasswordMutation.isPending ? "Sending..." : "Send reset link"}
                </Button>

                <FieldDescription className="px-6 text-center mt-2">
                  Remember your password?{" "}
                  <NavLink
                    to="/login"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Login
                  </NavLink>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default ForgotPassword
