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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema, type LoginInfo } from "@/schemas/loginSchema"
import { useApiMutation } from "@/hooks/useMutation"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { useUserStore } from "@/store/user"
import { Eye, EyeOff } from "lucide-react"

type LoginResponse = {
    _id: string
    name: string
    email: string
    phone?: string
    avatar?: string
    role: "user" | "admin"
    bio?: string
    password: string
    token?: string
    msg?: string
}

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useUserStore()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginInfo>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange",
    })

    const loginMutation = useApiMutation<{ email: string; password: string }, LoginResponse>({
        onSuccess: (res) => {
            if (!res.token) return toast.error("Token missing")
            Cookies.set("Token", res.token)
            localStorage.setItem("userRole", res.data.role)
            setUser(res.data, res.token)
            toast(res.msg || "Login successful")

            if (res.data.role === "admin") {
                navigate("/admin", { replace: true })
            } else {
                navigate("/user", { replace: true })
            }
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.error || "Login failed")
        }
    })

    const onSubmit = (data: LoginInfo) => {
        loginMutation.mutate({
            endpoint: `${import.meta.env.VITE_API_URL}/login`,
            method: "POST",
            body: data,
        })
    }

    return (
        <Card {...props} className="glass-card border-0 shadow-lg">
            <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <p className="text-sm text-muted-foreground">Sign in to continue learning.</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* Email Field */}
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                className="h-12 rounded-xl bg-background/70"
                                {...register("email")}
                            />
                            {errors.email && (
                                <FieldDescription className="text-red-500">
                                    {errors.email.message}
                                </FieldDescription>
                            )}
                        </Field>

                        {/* Password Field */}
                        <Field >
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="h-12 rounded-xl bg-background/70"
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && (
                                <FieldDescription className="text-red-500">
                                    {errors.password.message}
                                </FieldDescription>
                            )}
                            <FieldDescription className="text-end text-[13px]">
                                <NavLink
                                    to="/forgot-password"
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    Forgot password?
                                </NavLink>
                            </FieldDescription>
                        </Field>

                        {/* Submit Button */}
                        <FieldGroup>
                            <Field>
                                <Button
                                    type="submit"
                                    className="h-11 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-500 text-white shadow-sm hover:shadow-md"
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending ? "Login..." : "Login"}
                                </Button>
                                <FieldDescription className="px-6 text-center mt-2">
                                    If you don't have an account?{" "}
                                    <NavLink to="/register" className="text-primary hover:text-primary/80">
                                        Register
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
