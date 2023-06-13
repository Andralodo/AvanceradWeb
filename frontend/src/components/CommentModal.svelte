<script>
	export let showCommentModal; // boolean

	let dialog; // HTMLDialogElement

	let showEdit = false
	let showDelete = false

	$: if (dialog && showCommentModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showCommentModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		{#if [showEdit == true]}
			<div id="editCommentContainer">
				<slot name="header" />
				<hr />
				<button>
					Save
				</button>
				<button on:click={() => (showEdit = false)}>
					Back to comment
				</button>
				<hr />
				<!-- svelte-ignore a11y-autofocus -->
				<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->
			</div>
		{:else if [showDelete == true]}
			<div id="deleteCommentContainer">
				<slot name="header" />
				<hr />
				<p> Are you sure you want to delete this comment?</p>
				<button>
					Yes
				</button>
				<button on:click={() => (showDelete = false)}>
					No
				</button>
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
					<button on:click={() => (showEdit = true)}>
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
</style>
