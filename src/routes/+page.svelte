<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { onMount } from 'svelte';

	let session: any = null;

	async function refreshSession() {
		const { data } = await authClient.getSession();
		session = data;
	}

	onMount(refreshSession);

	async function handleSignOut() {
		await authClient.signOut();
		session = null; // ← on met directement la session à null
	}
</script>

<h1>Welcome to SvelteKit</h1>

{#if session}
	<h1>Hello {session.user.name}!</h1>
	<h2>Your email is {session.user.email}</h2>
	<button class="cursor-pointer rounded-sm bg-red-600 p-2 text-white" on:click={handleSignOut}
		>Sign Out</button
	>
{:else}
	<p>You are not logged in.</p>
	<a class="cursor-pointer rounded-sm bg-blue-600 p-2 text-white" href="/login">Sign In</a>
{/if}
