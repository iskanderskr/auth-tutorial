import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Confirme seu e-mail',
		html: `<p>Clique <a href="${confirmLink}">aqui</a> para confirmar seu e-mail</p>`,
	})
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Resetar sua senha',
		html: `<p>Clique <a href="${confirmLink}">aqui</a> para atualizar sua senha</p>`,
	})
}
