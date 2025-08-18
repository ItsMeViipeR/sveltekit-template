// src/routes/signup/+page.server.ts
import { auth } from '$lib/auth';
import type { Actions } from './$types';
import { hashSync } from 'bcrypt';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const name = formData.get('name') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		console.log('Form Data#:', { email, password, name, confirmPassword });

		if (!name || !email || !password || !confirmPassword) {
			return { error: 'Please fill in all fields.' };
		}
		if (password !== confirmPassword) {
			return { error: 'Passwords do not match.' };
		}
		if (password.length < 8) {
			return { error: 'Password must be at least 8 characters long.' };
		}

		auth.api.signUpEmail({
			body: {
				name,
				email,
				password
			}
		});

		return { success: true };
	}
};
