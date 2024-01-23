'use server'

import { AuthError } from 'next-auth'

import { LoginSchema, LoginSchemaType } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
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
