'use server'

import { getVerificationTokenByToken } from '@/data/verificationToken'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'

import { Response } from '@/actions/login'

export const newVerification = async (token: string): Promise<Response> => {
	const existingToken = await getVerificationTokenByToken(token)
	if (!existingToken) {
		return { statusCode: 404, type: 'error', message: 'O token não existe' }
	}

	const hasExpired = new Date(existingToken.expires) < new Date()
	if (hasExpired) {
		return { statusCode: 410, type: 'error', message: 'O token está expirado' }
	}

	const existingUser = await getUserByEmail(existingToken.email)
	if (!existingUser) {
		return { statusCode: 404, type: 'error', message: 'O usuário não existe' }
	}

	await db.user.update({
		where: { id: existingUser.id },
		data: {
			emailVerified: new Date(),
			email: existingToken.email,
		},
	})

	await db.verificationToken.delete({
		where: {
			id: existingToken.id,
		},
	})

	return {
		statusCode: 200,
		type: 'success',
		message: 'E-mail verificado com sucesso',
	}
}
