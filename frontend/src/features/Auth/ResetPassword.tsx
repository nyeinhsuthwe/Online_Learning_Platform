import { useState } from "react"
import { useParams, useNavigate, NavLink } from "react-router-dom"
import axios from "axios"

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
import { Eye, EyeOff } from "lucide-react"

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError("")
        setMessage("")

        if (password.length < 6) return setError("Password must be at least 6 characters")
        if (password !== confirmPassword) return setError("Passwords do not match")

        try {
            setLoading(true)

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/reset-password/${token}`,
                { password }
            )

            setMessage(res.data.message || "Password reset successful")
            setTimeout(() => navigate("/login"), 2000)
        } catch (err: any) {
            setError(err.response?.data?.message || "Reset link is invalid or expired")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
                        {message && <div className="bg-green-100 text-green-700 p-3 rounded">{message}</div>}

                        {/* New Password */}
                        <Field className="relative">
                            <FieldLabel htmlFor="password">New Password</FieldLabel>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </Field>

                        {/* Confirm Password */}
                        <Field className="relative">
                            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-2.5 text-gray-500"
                                >
                                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            <FieldDescription>Make sure both passwords match.</FieldDescription>
                        </Field>

                        <FieldGroup>
                            <Field>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-primary-dark text-white hover:bg-primary-hover w-full"
                                >
                                    {loading ? "Resetting..." : "Reset Password"}
                                </Button>

                                <FieldDescription className="px-6 text-center mt-2">
                                    Back to{" "}
                                    <NavLink to="/login" className="text-blue-500 hover:text-blue-600">
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

export default ResetPassword
