import { auth } from '$lib/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return { error: 'Email and password are required' };
		}

		const user = await auth.api.signInEmail({
			body: {
				email,
				password,
				rememberMe: true,
				callbackURL: '/'
			}
		});
		if (!user) {
			return { error: 'Invalid email or password' };
		}

		return { success: true };
	}
};
