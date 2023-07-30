<script>
    import { navigate } from "svelte-routing";

	export let showDeletePostModal; // boolean

	export let postId

	let dialog; // HTMLDialogElement

	$: if (dialog && showDeletePostModal) dialog.showModal();

	async function deletePostRequest(){

		try{
			const response = await fetch(`http://localhost:8080/api/posts/deletePost/${postId}`, 
			{
				method: "DELETE",
				mode: "cors",
                credentials:"include"
			})

			if (response.ok) {
       			window.location.href = '/';
			}

		}
		catch(error){
			console.log("deleteAccount error: ", error);
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showDeletePostModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<div id="deletePostModal">
			<div>
				<p>Are you sure you want to delete this post?<br>You are going to be logged out</p>
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
	/* button {
		display: block;
	} */
</style>
