'use server'

import { RegisterSchema, RegisterSchemaType } from '@/schemas'

export type Response = {
	statusCode: number
	type: 'error' | 'success' | 'warning' | 'error'
	message?: string
}

export const register = (values: RegisterSchemaType): Response => {
	const validatedFields = RegisterSchema.safeParse(values)
	if (!validatedFields.success) {
		return { statusCode: 400, type: 'error', message: 'Parâmetros inválidos' }
	}

	return { statusCode: 200, type: 'success', message: 'Login realizado com sucesso' }
}
