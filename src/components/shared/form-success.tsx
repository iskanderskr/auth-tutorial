import { FaCircleCheck } from 'react-icons/fa6'

type FormSuccessProps = {
	message?: string
}

const FormSuccess = ({ message }: FormSuccessProps) => {
	if (!message) {
		return null
	}

	return (
		<div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
			<FaCircleCheck className="w-4 h-5" />
			<p>{message}</p>
		</div>
	)
}

export default FormSuccess
