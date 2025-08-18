<script lang="ts">
	import { authClient } from '$lib/auth-client.js';

	let email = '';
	let password = '';

	async function handleLogin(event: Event) {
		event.preventDefault();

		try {
			const { data: session, error } = await authClient.signIn.email({
				email,
				password,
				rememberMe: true
			});

			if (error) {
				console.error('Login error:', error.message);
				return;
			}

			if (session) {
				// Rediriger vers la page d'accueil ou une autre page après la connexion réussie
				window.location.href = '/dashboard';
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function handleDiscordLogin() {
		await authClient.signIn.social({
			provider: 'discord',
			callbackURL: '/dashboard'
		});
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<form class="w-full max-w-md rounded bg-white p-8 shadow-md" on:submit={handleLogin}>
		<h2 class="mb-6 text-center text-2xl font-bold">Sign In</h2>
		<div class="mb-4">
			<label class="mb-1 block font-medium" for="email">Email</label>
			<input
				id="email"
				type="email"
				name="email"
				class="w-full rounded border px-3 py-2 focus:border-blue-300 focus:ring focus:outline-none"
				bind:value={email}
				required
			/>
		</div>
		<div class="mb-4">
			<label class="mb-1 block font-medium" for="password">Password</label>
			<input
				id="password"
				type="password"
				name="password"
				class="w-full rounded border px-3 py-2 focus:border-blue-300 focus:ring focus:outline-none"
				bind:value={password}
				required
			/>
		</div>
		<button
			type="submit"
			class="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
		>
			Sign In
		</button>
		<button
			type="button"
			on:click={handleDiscordLogin}
			class="mt-4 w-full rounded bg-gray-800 py-2 text-white transition hover:bg-gray-900"
		>
			Login with Discord
		</button>

		<p class="mt-4 text-center text-sm text-gray-600">
			Don't have an account? <a href="/signup" class="text-blue-600 hover:underline">Sign up</a>
		</p>

		<!-- Add forgot password link -->
		<p class="mt-4 text-center text-sm text-gray-600">
			Forgot your password? <a href="/forgot-password" class="text-blue-600 hover:underline"
				>Reset it</a
			>
		</p>
	</form>
</div>
