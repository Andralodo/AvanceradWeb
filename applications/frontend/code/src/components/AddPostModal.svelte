<script>
	import { navigate } from "svelte-routing";
    import { getCsrfToken } from "../csrf";

	export let showAddPostModal; // boolean
    export let userId;

    let title;
    let content;

    let errors;

    async function addPostRequest(){
        const csrfToken = await getCsrfToken()
        const response = await fetch("http://localhost:8080/api/posts/createPost", 
        {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify({ title: title, content: content, accountId: userId }),
        })

        if (response.ok) {
            let createdPostId = await response.json()
            navigate(`/post/${createdPostId}`, {
                replace: false,
            });
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
		showAddPostModal = false
		title = null
        content = null
	}

	let dialog; // HTMLDialogElement
    $: if (dialog && showAddPostModal) dialog.showModal();
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
            <form on:submit|preventDefault={addPostRequest}>
                <div id="postTitleInModalContainer">
                    <label for="titleInput">Title</label>
                    <input name="titleInput" type="text" bind:value={title}>
                </div>
            
                <div id="postContentInModalContainer">
                    <label for="contentInput">Content</label>
                    <textarea name="contentInput" cols="30" rows="10" bind:value={content}></textarea>
                </div>
                <div id="sumbitPostContainer">
                    <button type="submit">Post</button>
                </div>
            </form>
        </div>
		<hr />
	</div>
</dialog>

<style>
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
