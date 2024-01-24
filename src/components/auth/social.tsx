'use client'

import { FaGoogle, FaGithub } from 'react-icons/fa6'

import Button from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

const Social = () => {
	const onClick = (provider: 'google' | 'github') => {
		signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT })
	}

	return (
		<div className="flex items-center w-full gap-x-2">
			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => onClick('google')}
			>
				<FaGoogle className="h-5 w-5" />
			</Button>
			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => onClick('github')}
			>
				<FaGithub className="h-5 w-5" />
			</Button>
		</div>
	)
}

export default Social
