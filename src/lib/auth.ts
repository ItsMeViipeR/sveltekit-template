import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './server/db';
import { sendEmail } from './sendEmail';

export const auth = betterAuth({
	baseURL: 'http://localhost:5173',
	database: drizzleAdapter(db, {
		provider: 'sqlite'
	}),
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ['discord'],
			allowDifferentEmails: true,
			updateUserInfoOnLink: true
		}
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		sendResetPassword: async ({ user, url }, request) => {
			await sendEmail({
				to: user.email,
				subject: 'Reset your password',
				text: `Click the link to reset your password: ${url}. If you did not request a password reset, please ignore this email.`
			});
		},
		onPasswordReset: async ({ user }, request) => {
			await sendEmail({
				to: user.email,
				subject: 'Your password has been reset',
				text: `Hello ${user.name}, your password has been reset successfully at ${new Date().toLocaleString()}. If you did not request this change, please change your password or contact support.`
			});
		}
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }, request) => {
			await sendEmail({
				to: user.email,
				subject: 'Please verify your email',
				text: `Click the link to verify your email: ${url}`
			});
		},
		sendOnSignUp: true
	},
	socialProviders: {
		discord: {
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string
		}
	}
});
