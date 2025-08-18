<script lang="ts">
	import { onMount } from 'svelte';
	import { authClient } from '$lib/auth-client';
	import type { Session, User } from 'better-auth';
	let menuOpen = false;
	let session: Session | null = null;
	let user: User | null = null;

	async function refreshSession() {
		const { data } = await authClient.getSession();
		session = data?.session ?? null;
		user = data?.user ?? null;
	}

	onMount(refreshSession);
</script>

<header class="bg-white shadow-md">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Logo -->
		<a href="/" class="text-xl font-bold text-gray-800">MyApp</a>

		<!-- Desktop Nav -->
		<!-- Desktop Nav -->
		<nav class="hidden items-center space-x-6 md:flex">
			<a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
			{#if session}
				<button
					class="cursor-pointer rounded-sm bg-red-600 px-3 py-1 text-white"
					on:click={async () => {
						await authClient.signOut();
						session = null;
						user = null;

						// redirect user to login page
						window.location.href = '/login';
					}}
				>
					Sign Out
				</button>
			{:else}
				<a class="cursor-pointer rounded-sm bg-blue-600 px-3 py-1 text-white" href="/login">
					Sign In
				</a>
			{/if}
		</nav>

		<!-- Mobile Menu Button -->
		<button
			class="text-gray-700 focus:outline-none md:hidden"
			on:click={() => (menuOpen = !menuOpen)}
			aria-label="Toggle menu"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				{#if !menuOpen}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				{/if}
			</svg>
		</button>
	</div>

	<!-- Mobile Nav -->
	{#if menuOpen}
		<nav class="px-4 pb-4 md:hidden">
			<a href="/" class="block py-2 text-gray-700 hover:text-blue-600">Home</a>
		</nav>
	{/if}
</header>
