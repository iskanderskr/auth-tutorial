import * as z from 'zod'

export const LoginSchema = z.object({
	email: z.string().email({ message: 'E-mail obrigatório' }).default(''),
	password: z.string().min(6, { message: 'Precisa ter ao menos 6 caracteres' }).default(''),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
