<script>
	import { getCsrfToken } from "../csrf";

	export let showAddCommentModal; // boolean
	export let postId;
	export let userId;

	let errors;	

	let addComment = {
        accountId: userId,
        postId : postId,
        comment: null
    }

    async function addCommentRequest(){
		const csrfToken = await getCsrfToken()
		const response = await fetch("http://localhost:8080/api/comments/createComment", 
		{
			method: "POST",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				'X-CSRF-Token': csrfToken
			},
			body: JSON.stringify(addComment),
		})
		if (response.ok) {
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
		showAddCommentModal = false
		addComment.comment = null
	}

	let dialog; // HTMLDialogElement

	$: if (dialog && showAddCommentModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (onModalClose())}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<hr />
		<div id="addCommentModal">
			{#if errors}
				<ul class="error-message">
					{#each errors as error}
						<li>{error}</li>
					{/each}
				</ul>
			{/if}
			<div id="commentModal">
				<label for="contentInput">Comment</label>
				<textarea name="comment" cols="30" rows="10" bind:value={addComment.comment}></textarea>
			</div>
			<div id="submitCommentModal">
				<button on:click={addCommentRequest} type="submit">Post</button>
			</div>
		</div>
		<hr />
	</div>
</dialog>

<style>
	#commentModal{
        display: flex;
        flex-direction: column;
        text-align: left;
    }

	#submitCommentModal{
        margin-top: 0.5rem;
    }

    #addCommentModal{
        display: flex;
        flex-direction: column;
    }
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
