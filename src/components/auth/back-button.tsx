'use client'

import Link from 'next/link'

import Button from '@/components/ui/button'

type BackButtonProps = {
	href: string
	label: string
}

const BackButton = ({ href, label }: BackButtonProps) => {
	return (
		<Button variant="link" className="font-normal w-full" size="sm" asChild>
			<Link href={href}>{label} </Link>
		</Button>
	)
}

export default BackButton