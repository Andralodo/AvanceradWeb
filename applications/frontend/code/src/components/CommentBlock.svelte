<script>
    export let comment

    import CommentModal from './CommentModal.svelte';
    let showCommentModal = false;
    
</script>

<button id="commentBlock" on:click={() => (showCommentModal = true)}>
    <p>Posted by: {comment.username}</p>
    <p>{comment.comment}</p>
</button>

<CommentModal 
    bind:showCommentModal 
    comment={comment}>
</CommentModal>

<style>

</style>