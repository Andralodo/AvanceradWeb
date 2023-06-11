<script>
    import CommentBlock from "../components/CommentBlock.svelte";
    import { Router, Link, Route } from "svelte-routing";
    import { posts, accounts, comments } from "../data.js" 

    import Modal from '../components/Modal.svelte';
    let showModal = false;

    const id = parseInt(new URL(document.location.href).pathname.split('/')[2]);
    let post = posts.find(post => id === post.id)

    let postComments = comments.filter(function (comment) { return comment.postId == id });
</script>

<div id="mainContainer">
    <div id="postContainer">
        <h1>{post.title}</h1>
        <p>Posted by: {accounts.find(account => post.authorId === account.id).name}</p>
        <p>{post.content}</p>
    </div>
    <div id="commentHeadingContainer">
        <h2>Comments</h2>
        <button on:click={() => (showModal = true)}>
            Add Comment
        </button>
    </div>
    <div id="commentContainer">
        {#each postComments as comment}
        <div id="comment">
            <CommentBlock 
                id={comment.id} author={accounts.find(account => comment.commenterId === account.id).name}
                comment={comment.comment}
            />
        </div>
        {/each}
    </div>

    <Modal bind:showModal>
        <div id="addCommentContainer">
            <form action="">    
                <div id="commentInModalContainer">
                    <label for="contentInput">Comment</label>
                    <textarea name="contentInput" cols="30" rows="10"></textarea>
                </div>
                <div id="submitCommentContainer">
                    <button type="submit">Post</button>
                </div>
            </form>
        </div>
    </Modal>
</div>

<style>
    #postContainer {
        position: relative;
        width: 1280px;
        height: 250px;
        background:#312f2f;
        border-radius: 0% 0% 0% 0% / 0% 0% 0% 0% ;
        color: white;
        /* box-shadow: 10px 10px rgba(82, 74, 74, 0.15); */
        transition: all .4s ease;
        text-align: left;
        text-indent: 2rem;
    }

    #commentContainer{
        margin-top:2rem;
        display: flex;
        justify-content:center;
    }

    #commentHeadingContainer{
        margin-top:2rem;
        display: flex;
        justify-content:space-between;
    }

    #comment{
        margin: 1rem;
    }

    #mainContainer{
        display: flex;
        flex-direction: column;
    }

    #submitCommentContainer{
        margin-top: 0.5rem;
    }

    #addCommentContainer{
        display: flex;
        flex-direction: column;
    }

    #commentInModalContainer{
        display: flex;
        flex-direction: column;
        text-align: left;
    }

</style>

