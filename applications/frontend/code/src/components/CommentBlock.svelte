<script>
    import CommentModal from './CommentModal.svelte';

    export let comment
    export let currentUser

    let showCommentModal = false;
    
</script>

<button id="commentBlock" on:click={() => (showCommentModal = true)}>
    <p>Posted by: {comment.username}</p>
    <p>{comment.comment}</p>
</button>

<CommentModal 
    bind:showCommentModal 
    comment={comment}
    currentUser={currentUser}>
</CommentModal>

<style>

</style>