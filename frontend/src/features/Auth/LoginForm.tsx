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
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginInfo } from "@/schemas/loginSchema"
import { useApiMutation } from '@/hooks/useMutation'
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { useUserStore } from "@/store/user"

type LoginResponse = {
    _id: string
    email: string
    role: "admin" | "user"
}


export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginInfo>({
        resolver: zodResolver(LoginSchema),
        mode: 'onChange',
    })
    const { setUser } = useUserStore()

    const loginMutation = useApiMutation<
        { email: string; password: string },
        LoginResponse
    >({
        onSuccess: (res) => {
            Cookies.set("Token", res.token!)
            localStorage.setItem("userRole", res.data.role)
            setUser(res.data, res.token!);
            console.log(res.data)
            toast(res.msg)

            if (res.data.role === "admin") {
                navigate("/admin", { replace: true })
            } else {
                navigate("/user", { replace: true })
            }
        },
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.error || "Login failed"
            )
        }

    })



    const onSubmit = (data: LoginInfo) => {
        loginMutation.mutate({
            endpoint: `${import.meta.env.VITE_API_URL}/login`,
            method: "POST",
            body: data,
        });
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Login Form</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>

                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register('email')}
                            />
                            {errors.email && (
                                <FieldDescription className="text-red-500">
                                    {errors.email.message}
                                </FieldDescription>
                            )}

                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" type="password" {...register("password")} />
                            {errors.password && (
                                <FieldDescription className="text-red-500">
                                    {errors.password.message}
                                </FieldDescription>
                            )}
                        </Field>

                        <FieldGroup>
                            <Field>
                                <Button type="submit" className="bg-primary-dark text-white hover:bg-primary-hover" disabled={loginMutation.isPending}>
                                    {loginMutation.isPending ? "Login..." : "Login"}
                                </Button>

                                <FieldDescription className="px-6 text-center">
                                    If you don't have an account? <a href="/register">Register</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
