'use server'

import { AuthError } from 'next-auth'

import { LoginSchema, LoginSchemaType } from '@/schemas'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { getUserByEmail } from '@/data/user'
import { signIn } from '@/auth'

export type Response = {
	statusCode: number
	type: 'error' | 'success' | 'warning' | 'error'
	message?: string
}

export const login = async (values: LoginSchemaType): Promise<Response> => {
	const validatedFields = LoginSchema.safeParse(values)
	if (!validatedFields.success) {
		return { statusCode: 400, type: 'error', message: 'Parâmetros inválidos' }
	}

	const { email, password } = validatedFields.data

	const existingUser = await getUserByEmail(email)

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { statusCode: 404, type: 'error', message: 'Credenciais inválidas' }
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(existingUser.email)
		await sendVerificationEmail(verificationToken.email, verificationToken.token)

		return { statusCode: 200, type: 'success', message: 'E-mail de confirmação enviado' }
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		})
		return { statusCode: 200, type: 'success', message: 'Login realizado com sucesso' }
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { statusCode: 400, type: 'error', message: 'Parâmetros inválidos' }
				default:
					return { statusCode: 500, type: 'error', message: 'Erro no serviço de login' }
			}
		}

		throw error
	}
}
