<script>
    import { onMount } from "svelte";
	export let showCommentModal; // boolean

	let dialog; // HTMLDialogElement

	export let comment

	let userId;
	let username;
	let isLoggedIn = false;

	let updateErrors;
	let deleteErrors;

	let commentData = {comment: comment.comment, accountId: comment.accountId}

	onMount(async () =>{
		await fetchCurrentUser();
	})

	const fetchCurrentUser = async () => {
		try {
			const response = await fetch('http://localhost:8080/api/accounts/fetchCurrentUser', {
				method: 'GET',
				mode: "cors",
				credentials: "include",
			});

			if (response.ok) {
				const data = await response.json();
				username = data.username
				userId = data.userId
				isLoggedIn = true;
			}
		} 
		catch (error) {
			console.error('Erro fetching user:', error);
		}
	};

	async function deleteCommentRequest(){
		try{
			const response = await fetch(`http://localhost:8080/api/comments/deleteComment/${comment.commentId}`, 
			{
				method: "DELETE",
				mode: "cors",
				credentials:"include"
			})
			if (response.ok) {
				showDelete = false
                window.location.reload()
            }
			else {
				const data = await response.json();
				if (data.errors) {
					deleteErrors = data.errors;
				} else {
					console.log("Unknown error:", data);
				}
			}
		}
		catch(error){
			console.log("deleteComment error: ", error);
		}
	}

	async function updateCommentRequest(){
		try{
			const response = await fetch(`http://localhost:8080/api/comments/updateComment/${comment.commentId}`, 
			{
				method: "PATCH",
				mode: "cors",
				credentials:"include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(commentData)
			})
			if(response.ok) {
				showEdit = false
				window.location.reload()
			}
			else {
				const data = await response.json();
				if (data.errors) {
					updateErrors = data.errors;
				} else {
					console.log("Unknown error:", data);
				}
			}
		}
		catch(error){
			console.log("updateComment error: ", error);
		}
	}

	$: if (dialog && showCommentModal) dialog.showModal();

	let showEdit = false
	let showDelete = false
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showCommentModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		{#if showEdit == true}
			{#if updateErrors}
				<ul class="error-message">
					{#each updateErrors as error}
						<li>{error}</li>
					{/each}
				</ul>
			{/if}
			<div id="editCommentContainer">
				<hr />
				<div id="EditComment">
					<form on:submit|preventDefault={updateCommentRequest}>    
						<div id="commentModal">
							<label for="contentInput">Comment</label>
							<textarea name="contentInput" bind:value="{commentData.comment}" cols="30" rows="10"></textarea>
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
			</div>
		{:else if showDelete == true}
		<hr />
			<div id="deleteCommentContainer">
				{#if deleteErrors}
					<ul class="error-message">
						{#each deleteErrors as error}
							<li>{error}</li>
						{/each}
					</ul>
				{/if}
				<p> Are you sure you want to delete this comment?</p>
				<form>
					<button type="button" on:click={deleteCommentRequest}>
						Yes
					</button>
					<button on:click={() => (showDelete = false)}>
						No
					</button>
				</form>
			</div>
			<hr />
		{:else}
			<div id="commentContainer">
				<hr />
				<p>Posted by: {comment.username}</p>
				<p>{comment.comment}</p>
				<hr />
				{#if isLoggedIn}
					{#if userId == comment.accountId}
					<div>
						<button on:click={() => (showEdit = true)}>
							Edit
						</button>
						<button on:click={() => (showDelete = true)}>
							Delete
						</button>
					</div>
					{/if}
				{/if}
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

	#deleteCommentContainer{
        display: flex;
        flex-direction: column;
    }

</style>
