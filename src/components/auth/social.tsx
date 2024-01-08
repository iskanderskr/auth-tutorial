'use client'

import { FaGoogle, FaGithub } from 'react-icons/fa6'

import Button from '@/components/ui/button'

const Social = () => {
	return (
		<div className="flex items-center w-full gap-x-2">
			<Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
				<FaGoogle className="h-5 w-5" />
			</Button>
			<Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
				<FaGithub className="h-5 w-5" />
			</Button>
		</div>
	)
}

export default Social
