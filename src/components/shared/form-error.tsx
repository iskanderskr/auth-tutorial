import { FaTriangleExclamation } from 'react-icons/fa6'

type FormErrorProps = {
	message?: string
}

const FormError = ({ message }: FormErrorProps) => {
	if (!message) {
		return null
	}

	return (
		<div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
			<FaTriangleExclamation className="w-4 h-5" />
			<p>{message}</p>
		</div>
	)
}

export default FormError
