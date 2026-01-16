import {z} from 'zod';

export const loginSchema = z.object({
  email: z.email({message: "Invalid email address"}),
  password: z.string().min(6, {message: "Password must be at least 6 characters long"}),
})

export const signupSchema = z.object({
  email: z.email({message: "Invalid email address"}),
  fullName: z.string().min(2, {message: "Full name must be at least 2 characters long"}),
  password: z.string().min(6, {message: "Password must be at least 6 characters long"}),
  role: z.enum(["CHILD", "PARENT", "TEACHER"]),
})

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;