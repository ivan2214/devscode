import {Status} from "@prisma/client"
import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({message: "Email is required"}),
  password: z.string().min(1, {message: "Password is required"}),
})

export const RegisterSchema = z
  .object({
    email: z.string().email({message: "Email is required"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"}),
    name: z.string().min(1, {message: "Name is required"}),
    confirmPassword: z.string().min(1, {message: "Confirm password is required"}),
    username: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const CreateProblemSchema = z.object({
  title: z.string(),
  description: z.string(),
  tagNames: z
    .array(
      z.object({
        name: z.string(),
      }),
    )
    .optional(),
  code: z.string().max(10000).optional(),
})

export const UpdateProblemSchema = CreateProblemSchema.partial()

export const CreateCommentSchema = z.object({
  content: z.string().min(1).max(500, {
    message: "El texto del comentario no puede superar los 500 caracteres",
  }),
  problemId: z.coerce.string().min(1),
})

export const CommentActionSchema = z.object({
  commentId: z.coerce.string().optional(),
  replyId: z.coerce.string().optional(),
  isReply: z.boolean().optional(),
  action: z.enum(["like", "unlike"]),
  problemId: z.coerce.string(),
})

export const ChangeStatusSchema = z.object({
  status: z.enum([Status.closed, Status.open, Status.solved, Status.unsolved]),
  problemId: z.coerce.string().min(1),
})

export const ManageAccountUserSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}).optional().nullable(),
  email: z.string().email({message: "Email is required"}).email(),
  username: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  accountIds: z.array(z.coerce.string()).optional().nullable(),
})
