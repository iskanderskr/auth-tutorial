import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

import BackButton from '@/components/auth/back-button'
import Header from '@/components/auth/header'
import Social from '@/components/auth/social'

type CardWrapperProps = {
	children?: React.ReactNode
	headerLabel: string
	backButtonLabel: string
	backButtonHref: string
	showSocial?: boolean
}

const CardWrapper = ({
	children,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className="w-[400px] shadow-md">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton href={backButtonHref} label={backButtonLabel} />
			</CardFooter>
		</Card>
	)
}

export default CardWrapper
