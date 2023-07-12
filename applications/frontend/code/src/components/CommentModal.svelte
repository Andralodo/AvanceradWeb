<script>
	import { Router, Link, Route, navigate } from "svelte-routing";
	export let showCommentModal; // boolean

	let dialog; // HTMLDialogElement

	export let id
	export let comment

	let showEdit = false
	let showDelete = false

	$: if (dialog && showCommentModal) dialog.showModal();

	async function deleteCommentRequest(){
		try{
			const response = await fetch(`http://localhost:8080/api/comments/deleteComment/${id}`, 
			{
				method: "DELETE"
			})
			if (response.ok) {
				showDelete = false
				dialog.close()
				window.location.reload()
			}
		}
		catch(error){
			console.log("deleteComment error: ", error);
		}
	}

	async function updateCommentRequest(){
		let commentBody = {
			commentId: id,
			comment: comment
		}
		try{
			const response = await fetch(`http://localhost:8080/api/comments/updateComment/${id}`, 
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(commentBody)
			})
			switch (response.status) {
				case 200:
				showEdit = false
				dialog.close()
				window.location.reload()
			}
		}
		catch(error){
			console.log("updateComment error: ", error);
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showCommentModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		{#if showEdit == true}
			<div id="editCommentContainer">
				<slot name="header" />
				<hr />
				<div id="EditComment">
					<form on:submit|preventDefault={updateCommentRequest}>    
						<div id="commentModal">
							<label for="contentInput">Comment</label>
							<textarea name="contentInput" bind:value="{comment}" cols="30" rows="10"></textarea>
						</div>
						<div id="EdditCommentButton">
							<button type="submit">Save</button>
							<button on:click={() => (showEdit = false)}>
								Back to comment
							</button>
						</div>
					</form>
				</div>
				<hr />
				<!-- svelte-ignore a11y-autofocus -->
				<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->
			</div>
		{:else if showDelete == true}
			<div id="deleteCommentContainer">
				<slot name="header" />
				<hr />
				<p> Are you sure you want to delete this comment?</p>
				<form>
					<button type="button" on:click={deleteCommentRequest}>
						Yes
					</button>
					<button on:click={() => (showDelete = false)}>
						No
					</button>
				</form>
				<hr />
				<!-- svelte-ignore a11y-autofocus -->
				<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->
			</div>
		{:else}
			<div id="commentContainer">
				<slot name="header" />
				<hr />
				<slot />
				<hr />
				<div>
					<button on:click={() => (showEdit = true)}>
						Edit
					</button>
					<button on:click={() => (showDelete = true)}>
						Delete
					</button>
				</div>
				<!-- svelte-ignore a11y-autofocus -->
				<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->
			</div>
		{/if}
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

	#EdditCommentButton{
        margin-top: 0.5rem;
    }

    #EditComment{
        display: flex;
        flex-direction: column;
    }

	#commentModal{
        display: flex;
        flex-direction: column;
        text-align: left;
    }

</style>
