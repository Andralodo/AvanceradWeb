<script>
	import { getCsrfToken } from "../csrf";

	export let showDeletePostModal; // boolean
	export let postId

	let errors;

	async function deletePostRequest(){
		const csrfToken = await getCsrfToken()
		const response = await fetch(`http://localhost:8080/api/posts/deletePost/${postId}`, 
		{
			method: "DELETE",
			mode: "cors",
			credentials:"include",
			headers: {
                "Content-Type": "application/json",
                'X-CSRF-Token': csrfToken
            },
		})

		if (response.ok) {
			window.location.href = '/';
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
		showDeletePostModal = false
	}

	
	let dialog; // HTMLDialogElement

	$: if (dialog && showDeletePostModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (onModalClose())}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<hr />
		<div id="deletePostModal">
			{#if errors}
				<ul class="error-message">
					{#each errors as error}
						<li>{error}</li>
					{/each}
				</ul>
			{/if}
			<div>
				<p>Are you sure you want to delete this post?</p>
			</div>
			<div id="deletePostButtonModal">
				<button type="submit" on:click={deletePostRequest}>
					Delete
				</button>
			</div>
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

	#deletePostModal{
        display: flex;
        flex-direction: column;
	}
	/* button {
		display: block;
	} */
</style>
