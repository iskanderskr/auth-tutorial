'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import FormSuccess from '@/components/shared/form-success'
import FormError from '@/components/shared/form-error'

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

import { LoginSchema, LoginSchemaType } from '@/schemas'
import { nextAuthErrorFormatter } from '@/lib/utils'
import { login, Response } from '@/actions/login'

const LoginForm = () => {
	const searchParams = useSearchParams()
	const urlError = nextAuthErrorFormatter(searchParams.get('error'))
	searchParams.get('error') === 'OAuthAccountNotLinked' ? 'E-mail já está em uso' : ''

	const [isPending, startTransition] = useTransition()
	const [response, setResponse] = useState<Response>()

	const form = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) })

	const onSubmit = (data: LoginSchemaType) => {
		startTransition(async () => {
			setResponse(await login(data))
		})
	}

	return (
		<CardWrapper
			headerLabel="Bem vindo de volta"
			backButtonHref="/auth/register"
			backButtonLabel="Não tem uma conta?"
			showSocial
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
									<Button
										size="sm"
										variant="link"
										className="px-0 font-normal"
										asChild
									>
										<Link href="/auth/reset">Esqueci minha senha</Link>
									</Button>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
						<FormError
							message={response?.type === 'error' ? response.message : urlError ?? ''}
						/>
						<FormSuccess
							message={response?.type === 'success' ? response.message : ''}
						/>
						<Button type="submit" className="w-full" disabled={isPending}>
							{isPending ? 'Enviando ...' : 'Entrar'}
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default LoginForm
