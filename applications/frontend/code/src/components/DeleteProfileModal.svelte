<script>
    import { navigate } from "svelte-routing";

	export let showDeleteProfileModal; // boolean
	export let accountId

	let errors;

	async function deleteAccountRequest(){
		const response = await fetch(`http://localhost:8080/api/accounts/deleteAccount/${accountId}`, 
		{
			method: "DELETE",
			mode: "cors",
			credentials:"include"
		})

		if (response.ok) {
			window.location.href = '/login'; // Redirect to the login page after logout
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
		showDeleteProfileModal = false
	}

	let dialog; // HTMLDialogElement

	$: if (dialog && showDeleteProfileModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (onModalClose())}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<hr />
		<div id="container">
			{#if errors}
				<ul class="error-message">
					{#each errors as error}
						<li>{error}</li>
					{/each}
				</ul>
			{/if}
			<div id="deletePostModal">
				<div>
					<p>Are you sure you want to delete your account? <br> You are going to be logged out.</p>
				</div>
				<div id="deletePostButtonModal">
					<button type="submit" on:click={deleteAccountRequest}>
						Delete
					</button>
				</div>
			</div>
		</div>
		<!-- svelte-ignore a11y-autofocus -->
		<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->
		<hr />
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

	#container{
		display: flex;
        flex-direction: column;
	}
	/* button {
		display: block;
	} */
</style>
