'use client'

import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
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

import { RegisterSchema, RegisterSchemaType } from '@/schemas'
import { register, Response } from '@/actions/register'

const LoginForm = () => {
	const [isPending, startTransition] = useTransition()
	const [response, setResponse] = useState<Response>()

	const form = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) })

	const onSubmit = (data: RegisterSchemaType) => {
		startTransition(async () => {
			setResponse(await register(data))
		})
	}

	return (
		<CardWrapper
			headerLabel="Criar uma conta"
			backButtonHref="/auth/login"
			backButtonLabel="Já possuí uma conta? Clique aqui"
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="name">Nome de usuário</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="john123"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
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
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="email">Password</FormLabel>
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
						></FormField>
						<FormError message={response?.type === 'error' ? response.message : ''} />
						<FormSuccess
							message={response?.type === 'success' ? response.message : ''}
						/>
						<Button type="submit" className="w-full" disabled={isPending}>
							{isPending ? 'Enviando ...' : 'Registrar'}
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default LoginForm
