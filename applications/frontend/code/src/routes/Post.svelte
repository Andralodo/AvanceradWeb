<script>
    import CommentBlock from "../components/CommentBlock.svelte";
    // import { Router, Link, Route, navigate } from "svelte-routing";
    import { onMount } from "svelte";

    import AddCommentModal from '../components/AddCommentModal.svelte';
    import EditPostModal from '../components/EditPostModal.svelte';
    import DeletePostModal from '../components/DeletePostModal.svelte';
    let showAddCommentModal = false;
    let showEditPostModal = false;
    let showDeletePostModal = false;

    let userId;
    let username;
    let isLoggedIn = false;
    
    onMount(async () =>{
        await fetchCurrentUser();
        console.log(userId)
    })

    const fetchCurrentUser = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/accounts/fetchCurrentUser', {
                method: 'GET',
                mode: "cors",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                username = data.username
                userId = data.userId
                isLoggedIn = true;
            } else {
                // message = 'Logout failed';
            }
        } 
        catch (error) {
            console.error('Erro fetching user:', error);
        }
    };

    const postId = parseInt(new URL(document.location.href).pathname.split('/')[2]);

    const getPost = async () => {
        const response = await fetch(`http://localhost:8080/api/posts/${postId}`);
        const data = await response.json();
        return data
    };

    const getComments = async () => {
        const response = await fetch(`http://localhost:8080/api/comments/getAllPostComments/${postId}`);
        const data = await response.json();
        return data
    };
</script>

<div id="mainContainer">
    {#await getPost() then post}
        {#if isLoggedIn}
            {#if userId == post[0].accountId}
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

        <div id="commentHeadingContainer">
            <h2>Comments</h2>
            {#if isLoggedIn}
                <button on:click={() => (showAddCommentModal = true)}>
                    Add Comment
                </button>
            {/if}
        </div>
        <div id="commentContainer">
            {#await getComments() then comments}
                {#if comments.length > 0 }
                    {#each comments as comment}
                        <div id="comment">
                            <CommentBlock 
                                comment = {comment}
                            />
                        </div>
                    {/each}
                {:else}
                <p>No comments</p>
                {/if}
            {/await}
        </div>

        {#if userId != null}
            <AddCommentModal bind:showAddCommentModal postId={postId} userId={userId}/>

            <EditPostModal bind:showEditPostModal post={post[0]} userId={userId}/>

            <DeletePostModal bind:showDeletePostModal postId={postId}/>
        {/if}
    {/await}
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

    #buttonContainer{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: 1rem;
    }


</style>

