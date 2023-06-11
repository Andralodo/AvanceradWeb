<script>
    export let id
    export let author
    export let comment

    import Modal from './Modal.svelte';
    let showModal = false;
    
</script>

<button id="commentBlock" on:click={() => (showModal = true)}>
    <p>Posted by: {author}</p>
    <p>{comment}</p>
</button>

<Modal bind:showModal>
	<p>Posted by: {author}</p>
    <p>{comment}</p>
</Modal>

<style>

</style>