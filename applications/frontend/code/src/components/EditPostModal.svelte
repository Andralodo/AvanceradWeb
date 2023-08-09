<script>
    import { getCsrfToken } from "../csrf";

	export let showEditPostModal; // boolean
	export let post
    export let userId

    let errors;

	let updatePost = {
        accountId: userId,
        title : post.title,
        content: post.content
    }

    async function updatePostRequest(){
        const csrfToken = await getCsrfToken()

        const response = await fetch(`http://localhost:8080/api/posts/updatePost/${post.postId}`, 
        {
            method: "PATCH",
            mode: "cors",
            credentials:"include",
            headers: {
                "Content-Type": "application/json",
                'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify(updatePost),
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
		showEditPostModal = false
        updatePost.title = post.title,
        updatePost.content = post.content
	}

	let dialog; // HTMLDialogElement

    $: if (dialog && showEditPostModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (onModalClose())}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<hr />
		<div id="addPostContainer">
            {#if errors}
                <ul class="error-message">
                    {#each errors as error}
                        <li>{error}</li>
                    {/each}
                </ul>
            {/if}
            <form on:submit|preventDefault={updatePostRequest}>
                <div id="postTitleInModalContainer">
                    <label for="titleInput">Title</label>
                    <input name="titleInput" bind:value={updatePost.title} type="text">
                </div>
            
                <div id="postContentInModalContainer">
                    <label for="contentInput">Content</label>
                    <textarea name="contentInput" bind:value={updatePost.content} cols="30" rows="10"></textarea>
                </div>
                <div id="sumbitPostContainer">
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

	#postTitleInModalContainer{
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    #postContentInModalContainer{
        margin-top: 0.5rem;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    #sumbitPostContainer{
        margin-top: 0.5rem;
        /* text-align: left; */
    }
    

    #addPostContainer{
        display: flex;
        flex-direction: column;
    }
</style>
