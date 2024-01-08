'use client'

type GlobalErrorPageProps = {
	error: Error & { digest?: string }
	reset: () => void
}

const GlobalErrorPage = ({ error, reset }: GlobalErrorPageProps) => {
	return (
		<html>
			<body>
				<h2>Ocorreu um erro</h2>
				<div>{error.message}</div>
				<button onClick={() => reset()}>Tente novamente</button>
			</body>
		</html>
	)
}

export default GlobalErrorPage
