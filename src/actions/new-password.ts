'use server'

import bcrypt from 'bcryptjs'

import { getPasswordResetTokenByToken } from '@/data/passwordResetToken'
import { NewPasswordSchema, NewPasswordType } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'

export type Response = {
	statusCode: number
	type: 'error' | 'success' | 'warning' | 'error'
	message?: string
}

export const updatePassword = async (values: NewPasswordType, token: string): Promise<Response> => {
	if (!token) {
		return { statusCode: 400, type: 'error', message: 'Token obrigatório' }
	}

	const validatedFields = NewPasswordSchema.safeParse(values)
	if (!validatedFields.success) {
		return { statusCode: 400, type: 'error', message: 'Parâmetros inválidos' }
	}

	const { password } = validatedFields.data

	const newPasswordToken = await getPasswordResetTokenByToken(token)
	if (!newPasswordToken) {
		return { statusCode: 404, type: 'error', message: 'Token não encontrado' }
	}

	const existingUser = await getUserByEmail(newPasswordToken.email)
	if (!existingUser) {
		return { statusCode: 404, type: 'error', message: 'Usuário não existe na base de dados' }
	}

	const hashedPassword = await bcrypt.hash(password, 10)
	await db.user.update({
		where: { id: existingUser.id },
		data: {
			password: hashedPassword,
		},
	})

	return { statusCode: 200, type: 'success', message: 'Senha atualizada com sucesso' }
}
