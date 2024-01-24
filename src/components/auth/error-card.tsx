import CardWrapper from './card-wrapper'

const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel="Aconteceu algum erro, por favor tente novamente"
			backButtonLabel="Voltar para o login"
			backButtonHref="/auth/login"
		/>
	)
}

export default ErrorCard
