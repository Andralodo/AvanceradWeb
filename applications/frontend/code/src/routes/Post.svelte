<script>
    import CommentBlock from "../components/CommentBlock.svelte";
    import { Router, Link, Route } from "svelte-routing";
    import { onMount } from "svelte";

    import AddCommentModal from '../components/AddCommentModal.svelte';
    import EditPostModal from '../components/EditPostModal.svelte';
    import DeletePostModal from '../components/DeletePostModal.svelte';
    let showAddCommentModal = false;
    let showEditPostModal = false;
    let showDeletePostModal = false;

    const id = parseInt(new URL(document.location.href).pathname.split('/')[2]);

    let post = []
    let accounts = []
    let comments = []

    onMount(async () =>{
        post = await getPost();
        accounts = await getAccounts();
        comments = await getComments()
    })

    const getPost = async () => {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`);
        const data = await response.json();
        console.log(data)
        return data
    };

    const getAccounts = async () => {
        const response = await fetch("http://localhost:8080/api/accounts");
        const data = await response.json();
        // console.log(data)
        return data
    };

    const getComments = async () => {
        const response = await fetch(`http://localhost:8080/api/comments/getComment/${id}`);
        const data = await response.json();
        // console.log(data)
        return data
    };
</script>

<div id="mainContainer">
    <div id="buttonContainer">
        <button on:click={() => (showEditPostModal = true)}>
            Edit
        </button>
        <button on:click={() => (showDeletePostModal = true)}>
            Delete
        </button>
    </div>
    <div id="postContainer">
        {#await getPost()}
        {:then post}
            <h1>{post[0].title}</h1>
            {#await getAccounts()}
            {:then accounts}
                <p>Posted by: {accounts.find(account => post[0].accountId === account.accountId).username}</p>
            {/await}
            <p>{post[0].content}</p>
        {/await}
    </div>
    <div id="commentHeadingContainer">
        <h2>Comments</h2>
        <button on:click={() => (showAddCommentModal = true)}>
            Add Comment
        </button>
    </div>
    <div id="commentContainer">
        {#await getComments()}
        {:then comments}
            {#each comments as comment}
                {#await getAccounts()}
                {:then accounts}
                    <div id="comment">
                        <CommentBlock 
                            id={comment.id} 
                            author={accounts.find(account => comment.accountId === account.accountId).username}
                            comment={comment.comment}
                        />
                    </div>
                {/await}
            {/each}
        {/await}
    </div>

    {#await getPost()}
    {:then post}
        <AddCommentModal bind:showAddCommentModal>
            <div id="addCommentModal">
                <form action="localhost:8080/api/comments/createComment" method="POST">
                    <div id="commentModal">
                        <label for="contentInput">Comment</label>
                        <textarea name="comment" cols="30" rows="10"></textarea>
                        <input name="accountId" type="hidden" value="1">
                        <input name="postId" type="hidden" value={post.postId}>
                    </div>
                    <div id="submitCommentModal">
                        <button type="submit">Post</button>
                    </div>
                </form>
            </div>
        </AddCommentModal>

        <EditPostModal bind:showEditPostModal post={post[0]}>
            <div id="editPostModal">
                <form action="">
                    <div id="editPostTitleModal">
                        <label for="titleInput">Title</label>
                        <input name="titleInput" type="text">
                    </div>
                
                    <div id="editPostContentModal">
                        <label for="contentInput">Content</label>
                        <textarea name="contentInput" cols="30" rows="10"></textarea>
                    </div>
                    <div id="savePostButtonModal">
                        <button type="submit">Save</button>
                    </div>
                </form>
        </EditPostModal>

        <DeletePostModal bind:showDeletePostModal>
            <div id="deletePostModal">
                <form action="">
                    <div>
                        <p>Are you sure you want to delete this post?</p>
                    </div>
                    <div id="deletePostButtonModal">
                        <button type="submit">Delete</button>
                    </div>
                </form>
            </div>
        </DeletePostModal>
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

    #submitCommentModal{
        margin-top: 0.5rem;
    }

    #addCommentModal{
        display: flex;
        flex-direction: column;
    }

    #buttonContainer{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: 1rem;
    }


    #commentModal{
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    #editPostTitleModal{
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    #editPostContentModal{
        margin-top: 0.5rem;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    #savePostButtonModal{
        margin-top: 0.5rem;
        /* text-align: left; */
    }
    

    #editPostModal{
        display: flex;
        flex-direction: column;
    }

    #deletePostButtonModal{
        margin-top: 0.5rem;
        /* text-align: left; */
    }
    

    #deletePostModal{
        display: flex;
        flex-direction: column;
    }


</style>

