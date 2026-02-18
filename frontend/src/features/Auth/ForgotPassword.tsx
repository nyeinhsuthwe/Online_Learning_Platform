import { useState } from "react"
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
import axios from "axios"
import { NavLink } from "react-router-dom"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setMessage("")
    setError("")

    if (!email) {
      return setError("Email is required")
    }

    try {
      setLoading(true)

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        { email }
      )

      setMessage(
        res.data.message ||
        "A reset link has been sent to your emial."
      )
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      )
    } finally {
      setLoading(false)
    }
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
                  disabled={loading}
                  className="bg-primary-dark text-white hover:bg-primary-hover w-full"
                >
                  {loading ? "Sending..." : "Send reset link"}
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
