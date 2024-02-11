'use server'

import { generatePasswordResetToken } from '@/lib/tokens'
import { ResetSchema, ResetSchemaType } from '@/schemas'
import { sendPasswordResetEmail } from '@/lib/mail'
import { getUserByEmail } from '@/data/user'
import { Response } from '@/actions/login'

export const reset = async (values: ResetSchemaType): Promise<Response> => {
	const validateFields = ResetSchema.safeParse(values)
	if (!validateFields.success) {
		return { statusCode: 400, type: 'error', message: 'E-mail inválido' }
	}

	const existingUser = await getUserByEmail(validateFields.data.email)
	if (!existingUser) {
		return { statusCode: 404, type: 'error', message: 'E-mail não encontrado' }
	}

	const passwordResetToken = await generatePasswordResetToken(validateFields.data.email)
	await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

	return {
		statusCode: 200,
		type: 'success',
		message: 'E-mail enviado',
	}
}
