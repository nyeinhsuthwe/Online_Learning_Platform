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
import { userSchema, type UserInfo } from "@/schemas/userSchema"
import { useApiMutation } from '@/hooks/useMutation'
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useUserStore } from "@/store/user"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface AuthResponse {
    success: boolean;
    msg: string;
    _id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    role: "user" | "admin";
    bio?: string
    password: string
    token: string;

}

interface RegisterRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
    const [showPassword, setShowPassword] = useState(false)
    const [openPassword, setOpenPassword] = useState(false)
    const navigate = useNavigate();
    const { setUser } = useUserStore();
    const { register, handleSubmit, formState: { errors } } = useForm<UserInfo>({
        resolver: zodResolver(userSchema)
    });

    const registerMutation = useApiMutation<RegisterRequest, AuthResponse>({
        onSuccess: (res) => {
            setUser(res.data, res.token);
            toast(res.msg);
            navigate("/login");
        }
    });

    const onSubmit = (data: UserInfo) => {
        registerMutation.mutate({
            endpoint: `${import.meta.env.VITE_API_URL}/register`,
            method: "POST",
            body: data,
        });
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input id="name" type="text" placeholder="John Doe"
                                {...register("name")}
                            />
                            {errors.name && (
                                <FieldDescription className="text-red-500">
                                    {errors.name.message}
                                </FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" type="email" placeholder="m@example.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <FieldDescription className="text-red-500">
                                    {errors.email.message}
                                </FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="phone">Phone</FieldLabel>
                            <Input id="phone" type="phone" placeholder="Eg, 09xxxxxxxxx"
                                {...register("phone")}
                            />
                            {errors.phone && (
                                <FieldDescription className="text-red-500">
                                    {errors.phone.message}
                                </FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute  top-2.5 right-2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                             {errors.password && (
                                    <FieldDescription className="text-red-500">
                                        {errors.password.message}
                                    </FieldDescription>
                                )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={openPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("confirmPassword")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setOpenPassword(!openPassword)}
                                    className="absolute  top-2.5 right-2 text-gray-500"
                                >
                                    {openPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                             {errors.confirmPassword && (
                                    <FieldDescription className="text-red-500">
                                        {errors.confirmPassword.message}
                                    </FieldDescription>
                                )}
                        </Field>
                        <FieldGroup>
                            <Field>
                                <Button type="submit" className="bg-primary-dark text-white hover:bg-primary-hover" disabled={registerMutation.isPending}>
                                    {registerMutation.isPending ? "Creating..." : "Create Account"}
                                </Button>

                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <NavLink to="/login" className="text-blue-500 hover:text-blue-600">Sign in</NavLink>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}

