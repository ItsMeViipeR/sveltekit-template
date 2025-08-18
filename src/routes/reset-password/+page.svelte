<script lang="ts">
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';

	let newPassword = '';
	let error: string | null = null;
	let message: string | null = null;

	const token = new URL(page.url).searchParams.get('token');

	async function handleResetPassword() {
		if (token) {
			const { data, error: resetError } = await authClient.resetPassword({ newPassword, token });
			if (resetError) {
				error = resetError.message || 'Failed to reset password';
			} else if (!data.status) {
				error = 'Failed to reset password';
			} else {
				error = null;
				message = 'Password reset successfully';
			}
		} else {
			error = 'Invalid or expired token';
		}
	}
</script>

<form on:submit|preventDefault={handleResetPassword}>
	<input type="password" bind:value={newPassword} placeholder="New password" required />
	<button type="submit">Reset Password</button>
	{#if error}
		<p class="text-red-500">{error}</p>
	{/if}
	{#if message}
		<p class="text-green-500">{message}</p>
	{/if}
</form>
