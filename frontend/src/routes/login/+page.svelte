<script lang="ts">
	import type { ActionData } from './$types';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	export let form: ActionData;
	let loading = false;
	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
				await applyAction(result);
			} else {
				await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>Viewa | Log In</title>
</svelte:head>

<section>
	<div>
		<h1>Log in</h1>
		{#if form?.error}
			<div>{form.error}</div>
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
					<button aria-busy={loading}>Log in</button>
				</p>
			</div>
		</form>

		<div>
			<p>
				Don't have an account? <a href="/signup">Sign up</a>
			</p>
		</div>
	</div>
</section>
