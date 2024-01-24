import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'

import { getUserById } from '@/data/user'
import authConfig from '@/auth.config'
import { db } from '@/lib/db'

export const { handlers, auth, signIn, signOut } = NextAuth({
	callbacks: {
		async signIn({ user }) {
			const existingUser = await getUserById(user?.id)

			if (!existingUser || !existingUser.emailVerified) {
				return false
			}

			return true
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role as UserRole
			}

			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const user = await getUserById(token.sub)
			token.role = user?.role

			return token
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
})
