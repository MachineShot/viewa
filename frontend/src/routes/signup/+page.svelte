<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;
	let loading = false;
	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>Viewa | Sign Up</title>
</svelte:head>

<h1>Sign up</h1>
{#if form?.error}
	<div>{form.error}</div>
{/if}
{#if form?.message}
	<div>{form.message}</div>
{/if}
<form method="post" use:enhance={handleSubmit}>
	<div>
		<label for="email">Email</label>
		<p>
			<input
				id="email"
				name="email"
				value={form?.values?.email ?? ''}
				type="email"
				placeholder="Email"
				required
			/>
		</p>
	</div>
	<div>
		<label for="password">Password</label>
		<p>
			<input id="password" name="password" type="password" placeholder="Password" required />
		</p>
	</div>
	<div>
		<p>
			<button aria-busy={loading}>Sign up</button>
		</p>
	</div>
</form>
<p>
	Already have an account? <a href="/login">Sign in</a>
</p>
