<script>
	import { authClient } from '$lib/auth-client.js';

	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';

	export let form;

	if (form?.success) {
	}

	async function handleDiscordLogin() {
		await authClient.signIn.social({
			provider: 'discord',
			callbackURL: '/dashboard'
		});
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<form class="w-full max-w-md rounded bg-white p-8 shadow-md" method="post">
		<h2 class="mb-6 text-center text-2xl font-bold">Sign Up</h2>
		{#if form?.error}
			<div class="mb-4 text-sm text-red-500">{form.error}</div>
		{:else if form?.success}
			<div class="mb-4 text-sm text-green-500">Account created successfully!</div>
			<p class="mt-4 text-center text-sm text-gray-600">
				An email has been sent to {email} for verification.
			</p>
		{/if}
		<div class="mb-4">
			<label class="mb-1 block font-medium" for="name">Name</label>
			<input
				id="name"
				type="text"
				name="name"
				class="w-full rounded border px-3 py-2 focus:border-blue-300 focus:ring focus:outline-none"
				bind:value={name}
				required
			/>
		</div>
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
		<div class="mb-6">
			<label class="mb-1 block font-medium" for="confirmPassword">Confirm Password</label>
			<input
				id="confirmPassword"
				type="password"
				name="confirmPassword"
				class="w-full rounded border px-3 py-2 focus:border-blue-300 focus:ring focus:outline-none"
				bind:value={confirmPassword}
				required
			/>
		</div>
		<button
			type="submit"
			class="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
		>
			Sign Up
		</button>
		<button
			type="button"
			on:click={handleDiscordLogin}
			class="mt-4 w-full rounded bg-gray-800 py-2 text-white transition hover:bg-gray-900"
		>
			Continue with Discord
		</button>
		<p class="mt-4 text-center text-sm text-gray-600">
			Already have an account? <a href="/login" class="text-blue-600 hover:underline">Sign In</a>
		</p>
	</form>
</div>
