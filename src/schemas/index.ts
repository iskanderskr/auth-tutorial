import * as z from 'zod'

export const LoginSchema = z.object({
	email: z.string().email({ message: 'E-mail obrigatório' }).default(''),
	password: z.string().min(6, { message: 'Precisa ter ao menos 6 caracteres' }).default(''),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
	email: z.string().email({ message: 'E-mail obrigatório' }).default(''),
	password: z.string().min(6, { message: 'Precisa ter ao menos 6 caracteres' }).default(''),
	name: z.string().min(6, { message: 'Precisa ter ao menos 6 caracteres' }).default(''),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const ResetSchema = z.object({
	email: z.string().email({ message: 'E-mail obrigatório' }).default(''),
})

export type ResetSchemaType = z.infer<typeof ResetSchema>

export const NewPasswordSchema = z
	.object({
		password: z.string().min(6, { message: 'Precisa ter ao menos 6 caracteres' }).default(''),
		confirmPassword: z
			.string()
			.min(6, { message: 'Precisa ter ao menos 6 caracteres' })
			.default(''),
	})
	.superRefine((values, ctx) => {
		if (values.password !== values.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'As senhas não conferem',
				path: ['confirmPassword'],
			})
		}
	})

export type NewPasswordType = z.infer<typeof NewPasswordSchema>
