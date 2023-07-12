<script>
	import { navigate } from "svelte-routing";

	export let showAddPostModal; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && showAddPostModal) dialog.showModal();

	let addPost = {
        title: "",
        content: "",
        accountId: 1
    }

    async function addPostRequest(){

        try{
            const response = await fetch("http://localhost:8080/api/posts/createPost", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(addPost),
            })

            let createdPostId = await response.json()
            switch (response.status) {
                case 200:
                navigate(`/post/${createdPostId}`, {
                    replace: false,
                });
                break;
            }
        }
        catch(error){
            console.log("addPost error: ", error);
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showAddPostModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<div id="addPostContainer">
            <form on:submit|preventDefault={addPostRequest}>
                <div id="postTitleInModalContainer">
                    <label for="titleInput">Title</label>
                    <input name="titleInput" type="text" bind:value={addPost.title}>
                </div>
            
                <div id="postContentInModalContainer">
                    <label for="contentInput">Content</label>
                    <textarea name="contentInput" cols="30" rows="10" bind:value={addPost.content}></textarea>
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
</style>
