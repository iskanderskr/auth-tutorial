'use server'

import bcrypt from 'bcryptjs'

import { RegisterSchema, RegisterSchemaType } from '@/schemas'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'

export type Response = {
	statusCode: number
	type: 'error' | 'success' | 'warning' | 'error'
	message?: string
}

export const register = async (values: RegisterSchemaType): Promise<Response> => {
	const validatedFields = RegisterSchema.safeParse(values)
	if (!validatedFields.success) {
		return { statusCode: 400, type: 'error', message: 'Parâmetros inválidos' }
	}

	const { email, password, name } = validatedFields.data
	const hashedPassword = await bcrypt.hash(password, 10)
	const existingUser = await getUserByEmail(email)

	if (existingUser) {
		return { statusCode: 409, type: 'error', message: 'Usuário já existe na base de dados' }
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	const verificationToken = await generateVerificationToken(email)
	await sendVerificationEmail(verificationToken.email, verificationToken.token)

	return { statusCode: 200, type: 'success', message: 'E-mail de confirmação enviado' }
}
