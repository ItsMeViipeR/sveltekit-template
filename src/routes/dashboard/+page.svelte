<script lang="ts">
	import { onMount } from 'svelte';
	import { authClient } from '$lib/auth-client';
	import type { Session, User } from 'better-auth';
	import { m } from '$lib/paraglide/messages';
	import { setLocale } from '$lib/paraglide/runtime';
	let session: Session | null = null;
	let user: User | null = null;

	async function refreshSession() {
		const { data } = await authClient.getSession();
		session = data?.session ?? null;
		user = data?.user ?? null;
	}

	async function resendEmail() {
		if (!user) return;

		await authClient.sendVerificationEmail({ email: user.email, callbackURL: '/dashboard' });
	}

	async function handleDiscordLogin() {
		await authClient.linkSocial({
			provider: 'discord',
			callbackURL: '/dashboard'
		});
	}

	onMount(refreshSession);
</script>

{#if session}
	{#if !user?.emailVerified}
		<h1>
			Please verify your email to see your dashboard <button
				on:click={resendEmail}
				class="text-blue-500 hover:cursor-pointer hover:underline">Resend Verification Email</button
			>
		</h1>
	{/if}
	<h1>{m.hello_world({ name: user?.name! })}</h1>
	<button
		on:click={handleDiscordLogin}
		class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
		>Link Discord</button
	>
{:else}
	<h1>Please sign in to see your dashboard</h1>
{/if}
