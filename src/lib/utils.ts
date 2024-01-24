import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const nextAuthErrorFormatter = (error: string | null) => {
	const errors: Record<string, string> = {
		AuthError: '',
		AuthorizedCallbackError: '',
		CallbackRouteError: '',
		CredentialsSignin: '',
		EmailSignInError: '',
		ErrorPageLoop: '',
		EventError: '',
		InvalidCallbackUrl: '',
		InvalidCheck: '',
		InvalidEndpoints: '',
		InvalidProvider: '',
		JWTSessionError: '',
		MissingAdapter: '',
		MissingAdapterMethods: '',
		MissingAuthorize: '',
		MissingCSRF: '',
		MissingSecret: '',
		OAuthAccountNotLinked: 'E-mail já está em uso',
		OAuthCallbackError: '',
		OAuthProfileParseError: '',
		OAuthSignInError: '',
		SessionTokenError: '',
		SignOutError: '',
		UnknownAction: '',
		UnsupportedStrategy: '',
		UntrustedHost: '',
		Verification: '',
	}

	if (errors[error ?? '']) {
		return errors[error ?? '']
	}

	return ''
}
