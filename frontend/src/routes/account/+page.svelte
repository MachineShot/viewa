<script lang="ts">
	import { enhance } from '$app/forms';
	import AccountAvatar from '$lib/components/AccountAvatar.svelte';

	export let data;
	export let form;

	let { session, profile } = data;

	let profileForm: any;
	let loading = false;
	let fullName: string | null = profile?.full_name;
	let username: string | null = profile?.username;
	let avatarUrl: string | null = profile?.avatar_url;
	function handleSubmit() {
		loading = true;
		return async () => {
			loading = false;
		};
	}
</script>

<svelte:head>
	<title>Viewa | Account</title>
</svelte:head>

<main>
	<div>
		<form method="post" action="?/update" use:enhance={handleSubmit} bind:this={profileForm}>
			<AccountAvatar
				bind:url={avatarUrl}
				size={10}
				on:upload={() => {
					profileForm.requestSubmit();
				}}
			/>
			<div>
				<label for="email">Email</label>
				<input id="email" type="text" value={session.user.email} disabled />
			</div>

			<div>
				<label for="fullName">Full Name</label>
				<input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
			</div>

			<div>
				<label for="username">Username</label>
				<input id="username" name="username" type="text" value={form?.username ?? username} />
			</div>

			<div>
				<input type="submit" value={loading ? 'Loading...' : 'Update'} aria-busy={loading} />
			</div>
		</form>

		<form method="post" action="?/signout">
			<div>
				<button aria-busy={loading}>Sign Out</button>
			</div>
		</form>
	</div>
</main>
