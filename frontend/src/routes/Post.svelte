<script>
    import CommentBlock from "../components/CommentBlock.svelte";
    import { Router, Link, Route } from "svelte-routing";
    import { posts, accounts, comments } from "../data.js" 

    import AddCommentModal from '../components/AddCommentModal.svelte';
    import EditPostModal from '../components/EditPostModal.svelte';
    import DeletePostModal from '../components/DeletePostModal.svelte';
    let showAddCommentModal = false;
    let showEditPostModal = false;
    let showDeletePostModal = false;

    const id = parseInt(new URL(document.location.href).pathname.split('/')[2]);
    let post = posts.find(post => id === post.id)

    let postComments = comments.filter(function (comment) { return comment. postId == id });
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
        <h1>{post.title}</h1>
        <p>Posted by: {accounts.find(account => post.authorId === account.id).name}</p>
        <p>{post.content}</p>
    </div>
    <div id="commentHeadingContainer">
        <h2>Comments</h2>
        <button on:click={() => (showAddCommentModal = true)}>
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

    <AddCommentModal bind:showAddCommentModal>
        <div id="addCommentModal">
            <form action="">    
                <div id="commentModal">
                    <label for="contentInput">Comment</label>
                    <textarea name="contentInput" cols="30" rows="10"></textarea>
                </div>
                <div id="submitCommentModal">
                    <button type="submit">Post</button>
                </div>
            </form>
        </div>
    </AddCommentModal>

    <EditPostModal bind:showEditPostModal post={post}>
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
    </DeletePostModal>
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

