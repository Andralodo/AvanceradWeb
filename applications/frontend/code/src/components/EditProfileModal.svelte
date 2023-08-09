<script>
	import { getCsrfToken } from "../csrf";
	export let showEditProfileModal; // boolean
	export let account

	let errors;

	let accountBody = {
			username: account.username,
			password: account.password
		}

	async function updateAccountRequest(){
		const csrfToken = await getCsrfToken()
		const response = await fetch(`http://localhost:8080/api/accounts/updateAccount/${account.accountId}`, 
		{
			method: "PATCH",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				'X-CSRF-Token': csrfToken
			},
			body: JSON.stringify(accountBody)
		})
		if (response.ok){
			window.location.reload()
		}
		else {
			const data = await response.json();
			if (data.errors) {
				errors = data.errors;
			}
		}
	}

	//Change to base values when closing modal
	async function onModalClose(){
		errors = null
		showEditProfileModal = false
        accountBody.username = account.username
		accountBody.password = account.password
	}

	let dialog; // HTMLDialogElement

	$: if (dialog && showEditProfileModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (onModalClose())}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<hr />
		<div id="UpdateAccountContainer">
			{#if errors}
				<ul class="error-message">
					{#each errors as error}
						<li>{error}</li>
					{/each}
				</ul>
			{/if}
			<form on:submit|preventDefault={updateAccountRequest}>
				<div id="postUsernameInModalContainer">
					<label for="titleInput">Username</label>
					<input name="titleInput" bind:value="{accountBody.username}" type="text">
				</div>
				<div id="postUsernameInModalContainer">
					<label for="titleInput">Password</label>
					<input name="titleInput" bind:value="{accountBody.password}" type="password">
				</div>
				<div id="sumbitPostContainer">
					<button type="submit">Update</button>
				</div>
			</form>
		</div>
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	/* button {
		display: block;
	} */
</style>
