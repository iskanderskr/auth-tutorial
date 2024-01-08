import CardWrapper from '@/components/auth/card-wrapper'

const LoginForm = () => {
	return (
		<CardWrapper
			headerLabel="Bem vindo de volta"
			backButtonHref="/auth/register"
			backButtonLabel="Não tem uma conta?"
			showSocial
		>
			LoginForm
		</CardWrapper>
	)
}

export default LoginForm
