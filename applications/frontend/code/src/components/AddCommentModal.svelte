<script>
	export let showAddCommentModal; // boolean
	export let postId;

	let dialog; // HTMLDialogElement

	$: if (dialog && showAddCommentModal) dialog.showModal();

	let addComment = {
        accountId: localStorage.getItem("userId"),
        postId : postId,
        comment: ""
    }

    async function addCommentRequest(){
        try{
            const response = await fetch("http://localhost:8080/api/comments/createComment", 
            {
                method: "POST",
				mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(addComment),
            })
            switch (response.status) {
                case 200:
                window.location.reload()
            }
        }
        catch(error){
            console.log("addComment error: ", error);
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showAddCommentModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<div id="addCommentModal">
			<form on:submit|preventDefault={addCommentRequest}>
				<div id="commentModal">
					<label for="contentInput">Comment</label>
					<textarea name="comment" cols="30" rows="10" bind:value={addComment.comment}></textarea>
					<input name="accountId" type="hidden" value="1">
					<input name="postId" type="hidden" value={addComment.postId}>
				</div>
				<div id="submitCommentModal">
					<button type="submit">Post</button>
				</div>
			</form>
		</div>
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->
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
