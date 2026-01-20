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
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useUserStore } from "@/store/user"

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
}

interface AuthResponse {
  success: boolean;
  msg: string;
  data: User;
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
                            <Input id="password" type="password" {...register("password")} />
                            {errors.password && (
                                <FieldDescription className="text-red-500">
                                    {errors.password.message}
                                </FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                            <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                            {errors.confirmPassword && (
                                <FieldDescription className="text-red-500">
                                    {errors.confirmPassword.message}
                                </FieldDescription>
                            )}
                        </Field>

                        <FieldGroup>
                            <Field>
                                <Button type="submit" disabled={registerMutation.isPending}>
                                    {registerMutation.isPending ? "Creating..." : "Create Account"}
                                </Button>

                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <a href="/login">Sign in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}

