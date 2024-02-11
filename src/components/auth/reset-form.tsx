'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import FormSuccess from '@/components/shared/form-success'
import FormError from '@/components/shared/form-error'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import CardWrapper from '@/components/auth/card-wrapper'

import { ResetSchema, ResetSchemaType } from '@/schemas'
import { Response } from '@/actions/login'
import { reset } from '@/actions/reset'

const ResetForm = () => {
	const [isPending, startTransition] = useTransition()
	const [response, setResponse] = useState<Response>()

	const form = useForm<ResetSchemaType>({ resolver: zodResolver(ResetSchema) })

	const onSubmit = (data: ResetSchemaType) => {
		startTransition(async () => {
			setResponse(await reset(data))
		})
	}

	return (
		<CardWrapper
			headerLabel="Esqueci minha senha"
			backButtonHref="/auth/login"
			backButtonLabel="Voltar ao login"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="email">Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="john.doe@example.com"
											type="email"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
						<FormError message={response?.type === 'error' ? response.message : ''} />
						<FormSuccess
							message={response?.type === 'success' ? response.message : ''}
						/>
						<Button type="submit" className="w-full" disabled={isPending}>
							{isPending ? 'Enviando ...' : 'Enviar e-mail para nova senha'}
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default ResetForm
