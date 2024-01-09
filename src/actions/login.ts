'use server'

import { LoginSchema, LoginSchemaType } from '@/schemas'

export type Response = {
	statusCode: number
	type: 'error' | 'success' | 'warning' | 'error'
	message?: string
}

export const login = (values: LoginSchemaType): Response => {
	const validatedFields = LoginSchema.safeParse(values)
	if (!validatedFields.success) {
		return { statusCode: 400, type: 'error', message: 'Parâmetros inválidos' }
	}

	return { statusCode: 200, type: 'success', message: 'Login realizado com sucesso' }
}
