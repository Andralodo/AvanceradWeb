<script>
    import CommentBlock from "../components/CommentBlock.svelte";
    import AddCommentModal from '../components/AddCommentModal.svelte';
    import EditPostModal from '../components/EditPostModal.svelte';
    import DeletePostModal from '../components/DeletePostModal.svelte';
    import { onMount } from "svelte";

    export let currentUser;
    export let postId

    let showAddCommentModal = false;
    let showEditPostModal = false;
    let showDeletePostModal = false;

    let postErrors;
    let commentErrors;

    let comments;
    let post;
    
    onMount(async () =>{
        post = await getPost()
        comments = await getComments()
    })

    const getPost = async () => {
        const response = await fetch(`http://localhost:8080/api/posts/${postId}`);
        if (response.ok) {
            const data = await response.json();
            if(data.length > 0)
                return data
            else return
        } 
        else{
            const data = await response.json();
			if (data.errors) {
				postErrors = data.errors;
			}
        }
    };

    const getComments = async () => {
        const response = await fetch(`http://localhost:8080/api/comments/getAllPostComments/${postId}`);
        if (response.ok) {
            const data = await response.json();
            if(data.length > 0)
                return data
            else return
        } 
        else{
            const data = await response.json();
			if (data.errors) {
				commentErrors = data.errors
			}
        }
    };
</script>

<div id="mainContainer">
    {#if postErrors}
        <p>{postErrors[0]}<br>Error loading post :(</p>
    {:else if post}
        {#if currentUser.isLoggedIn}
            {#if currentUser.userId == post[0].accountId}
                <div id="buttonContainer">
                    <button on:click={() => (showEditPostModal = true)}>
                        Edit
                    </button>
                    <button on:click={() => (showDeletePostModal = true)}>
                        Delete
                    </button>
                </div>
            {/if}
        {/if}
        <div id="postContainer">
            <h1>{post[0].title}</h1>
            <p>Posted by: {post[0].username}</p>
            <p>{post[0].content}</p>
        </div>
        {#if commentErrors}
            <p>{commentErrors[0]}<br>Error loading comments :(</p>
        {:else}
            <div id="commentHeadingContainer">
                <h2>Comments</h2>
                {#if currentUser.isLoggedIn}
                    <button on:click={() => (showAddCommentModal = true)}>
                        Add Comment
                    </button>
                {/if}
            </div>
            {#if comments}
                <div id="commentContainer">
                    {#each comments as comment}
                        <div id="comment">
                            <CommentBlock 
                                comment = {comment}
                                currentUser = {currentUser}
                            />
                        </div>
                    {/each}
                </div>
            {:else}
                <p>No comments</p>
            {/if}
        {/if}
        {#if currentUser.userId != null}
            <AddCommentModal bind:showAddCommentModal postId={postId} userId={currentUser.userId}/>
    
            <EditPostModal bind:showEditPostModal post={post[0]} userId={currentUser.userId}/>
    
            <DeletePostModal bind:showDeletePostModal postId={postId}/>
        {/if}
    {:else}
        <p>No such post exists</p>
    {/if}
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
        flex-wrap: wrap;
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

    #buttonContainer{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: 1rem;
    }


</style>

