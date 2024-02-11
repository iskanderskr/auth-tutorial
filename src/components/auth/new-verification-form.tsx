'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BeatLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'

import { newVerification } from '@/actions/new-verification'
import FormSuccess from '@/components/shared/form-success'
import CardWrapper from '@/components/auth/card-wrapper'
import FormError from '@/components/shared/form-error'
import { Response } from '@/actions/login'

const NewVerificationForm = () => {
	const [response, setResponse] = useState<Response>()
	const searchParams = useSearchParams()
	const router = useRouter()

	const token = searchParams.get('token')

	const onSubmit = useCallback(async () => {
		if (!token || response) return

		const responseRequest = await newVerification(token)
		setResponse(responseRequest)

		const timer = setTimeout(() => {
			if (responseRequest?.type === 'success') {
				router.push('/auth/login')
			}
		}, 1000)

		return () => {
			clearTimeout(timer)
		}
	}, [token, response, router])

	useEffect(() => {
		onSubmit()
	}, [onSubmit])

	return (
		<CardWrapper
			headerLabel="Confirmando sua verficação"
			backButtonHref="/auth/login"
			backButtonLabel="Voltar para o login"
		>
			<div className="flex items-center w-full justify-center">
				{!response && <BeatLoader />}
				<FormError message={response?.type === 'error' ? response.message : ''} />
				<FormSuccess message={response?.type === 'success' ? response.message : ''} />
			</div>
		</CardWrapper>
	)
}

export default NewVerificationForm
