'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import FormError from '@/components/shared/form-error'
import FormSuccess from '@/components/shared/form-success'

import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import CardWrapper from '@/components/auth/card-wrapper'

import { NewPasswordSchema, NewPasswordType } from '@/schemas'
import { updatePassword, Response } from '@/actions/new-password'

const NewPasswordForm = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token') ?? ''
	const [isPending, startTransition] = useTransition()
	const [response, setResponse] = useState<Response>()

	const form = useForm<NewPasswordType>({ resolver: zodResolver(NewPasswordSchema) })

	const onSubmit = (data: NewPasswordType) => {
		startTransition(async () => {
			setResponse(await updatePassword(data, token))
		})
	}

	return (
		<CardWrapper
			headerLabel="Criar nova senha"
			backButtonHref="/auth/login"
			backButtonLabel="Voltar ao login"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="email">Nova senha</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="******"
											type="password"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="email">Confirmar senha</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="******"
											type="password"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormError message={response?.type === 'error' ? response.message : ''} />
						<FormSuccess
							message={response?.type === 'success' ? response.message : ''}
						/>
						<Button type="submit" className="w-full" disabled={isPending}>
							{isPending ? 'Alterando ...' : 'Alterar senha'}
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default NewPasswordForm
