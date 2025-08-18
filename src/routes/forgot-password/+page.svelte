<script lang="ts">
	import { authClient } from '$lib/auth-client';

	let email = '';
	let error: string | null = null;
	let message: string | null = null;

	const handleResetPassword = (event: Event) => {
		event.preventDefault();

		if (email == '') {
			error = 'Email is required';
		} else {
			error = null;
			authClient.requestPasswordReset({
				email,
				redirectTo: 'http://localhost:5173/reset-password'
			});
			message = 'Password reset email sent successfully';
		}
	};
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<form class="w-full max-w-md rounded bg-white p-8 shadow-md" on:submit={handleResetPassword}>
		<h2 class="mb-6 text-center text-2xl font-bold">Reset Password</h2>
		{#if error}
			<div class="mb-4 text-sm text-red-500">{error}</div>
		{:else if message}
			<div class="mb-4 text-sm text-green-500">{message}</div>
		{/if}
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
		<button
			type="submit"
			class="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
		>
			Send Reset Link
		</button>
	</form>
</div>
