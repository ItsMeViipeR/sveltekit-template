<script lang="ts">
	import { onMount } from 'svelte';
	import { authClient } from '$lib/auth-client';
	import type { Session, User } from 'better-auth';
	import { m } from '$lib/paraglide/messages';
	let session: Session | null = null;
	let user: User | null = null;
	let providers: string[] | null = null;

	async function refreshSession() {
		const { data } = await authClient.getSession();

		session = data?.session ?? null;
		user = data?.user ?? null;
		let userAccounts = await authClient.listAccounts();
		let accounts = userAccounts.data;

		if (accounts) {
			providers = accounts.map((account) => account.provider);
		}
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
	<div class="mx-auto mt-10 max-w-3xl rounded-xl bg-white p-8 shadow-lg">
		{#if !user?.emailVerified}
			<div class="mb-6 flex items-center rounded border-l-4 border-yellow-500 bg-yellow-100 p-4">
				<svg
					class="mr-2 h-6 w-6 text-yellow-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M12 20h.01"
					></path>
				</svg>
				<span>
					{m.verify_email()}
					<button on:click={resendEmail} class="ml-2 font-semibold text-blue-600 hover:underline">
						{m.resend_email()}
					</button>
				</span>
			</div>
		{/if}
		<div class="mb-8 flex items-center space-x-4">
			<img
				src={user?.image ?? '/default-avatar.png'}
				alt="Avatar"
				class="h-16 w-16 rounded-full border-2 border-blue-500"
			/>
			<div>
				<h1 class="text-2xl font-bold text-gray-800">{m.hello_world({ name: user?.name! })}</h1>
				<p class="text-gray-500">{user?.email}</p>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="flex flex-col items-center rounded-lg bg-blue-50 p-6 shadow">
				<svg
					class="mb-2 h-10 w-10 text-blue-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2z"
					></path>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19v-7"
					></path>
				</svg>
				<span class="font-semibold text-blue-700">{m.your_stats()}</span>
				<p class="mt-2 text-gray-600">{m.coming_soon()}</p>
			</div>
			<div class="flex flex-col items-center rounded-lg bg-purple-50 p-6 shadow">
				<svg
					class="mb-2 h-10 w-10 text-purple-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 20h5v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2h5"
					></path>
					<circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" fill="none"></circle>
				</svg>
				<span class="font-semibold text-purple-700">{m.profile_settings()}</span>
				<p class="mt-2 text-gray-600">{m.manage_account_preferences()}</p>
			</div>
		</div>
		<div class="mt-10 flex justify-end">
			{#if providers && !providers.includes('discord')}
				<button
					on:click={handleDiscordLogin}
					class="rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-900"
				>
					Link Discord Account
				</button>
			{/if}
		</div>
	</div>
{:else}
	<div class="flex min-h-[60vh] flex-col items-center justify-center">
		<h1 class="mb-4 text-3xl font-bold text-gray-800">{m.sign_in()}</h1>
		<p class="text-gray-500">{m.access_features()}</p>
	</div>
{/if}
