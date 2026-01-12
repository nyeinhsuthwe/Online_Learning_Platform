import { z } from "zod";

export const userSchema = z
    .object({
        name: z.string().min(1, "Name is required.").min(2, "Name must be at least 2 characters."),
        email: z.string().min(1, "Email is required.").email("Invalid email format"),
        password: z.string().min(1, "Password is required.").min(8, "Password must be at least 8 characters."),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match!",
        path: ["confirmPassword"]
    })

export type UserInfo = z.infer<typeof userSchema>