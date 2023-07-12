<script>
    export let id
    export let author
    export let comment

    import CommentModal from './CommentModal.svelte';
    let showCommentModal = false;
    
</script>

<button id="commentBlock" on:click={() => (showCommentModal = true)}>
    <p>Posted by: {author}</p>
    <p>{comment}</p>
</button>

<CommentModal 
    bind:showCommentModal 
    id={id}
    comment={comment}>
	<p>Posted by: {author}</p>
    <p>{comment}</p>
</CommentModal>

<style>

</style>