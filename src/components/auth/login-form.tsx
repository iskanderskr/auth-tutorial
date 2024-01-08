'use client'

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

import { LoginSchema, LoginSchemaType } from '@/schemas'

const LoginForm = () => {
	const form = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) })

	const onSubmit = (data: LoginSchemaType) => {
		console.log(data)
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
										<Input {...field} placeholder="******" type="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
						<FormError message="{form.formState.errors}" />
						<FormSuccess message="{form.formState.errors}" />
						<Button type="submit" className="w-full">
							Entrar
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default LoginForm
