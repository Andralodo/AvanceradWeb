<script>
	export let showEditProfileModal; // boolean
	export let account

	let errors;

	let dialog; // HTMLDialogElement

	$: if (dialog && showEditProfileModal) dialog.showModal();

	let accountBody = {
			username: account.username,
			password: account.password
		}

	async function updateAccountRequest(){
		try{
			const response = await fetch(`http://localhost:8080/api/accounts/updateAccount/${account.accountId}`, 
			{
				method: "PATCH",
				mode: "cors",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
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
					console.log(errors);
				} else {
					console.log("Unknown error:", data);
				}
			}
		}
		catch(error){
			console.log("updateAccount error: ", error);
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showEditProfileModal = false)}
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
