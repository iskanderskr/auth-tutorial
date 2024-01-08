'use client'

import { useRouter } from 'next/navigation'

type LoginButtonProps = {
	children: React.ReactNode
	mode?: 'modal' | 'redirect'
	asChild?: boolean
}

const LoginButton = ({ children, mode = 'redirect' }: LoginButtonProps) => {
	const router = useRouter()

	const onClick = () => {
		router.push('/auth/login')
	}

	if (mode === 'modal') {
		return <span>TODO: Implement modal</span>
	}

	return (
		<span className="cursor-pointer" onClick={() => onClick()}>
			{children}
		</span>
	)
}

export default LoginButton
