<script>
    import PostBlock from "../components/PostBlock.svelte";
    import { Router, Link, Route } from "svelte-routing";
    import { posts, accounts } from "../data.js" 

    import Modal from '../components/Modal.svelte';
    let showModal = false;

</script>

<div id="mainContainer">
    <div id="postHeadingContainer">
        <h2>Posts</h2>
        <button on:click={() => (showModal = true)}>
            Create Post
        </button>
    </div>
    
    <div id="postContainer">
        {#each posts as post}
        <div id="post">
            <Link to="post/{post.id}">    
                <PostBlock 
                    author={accounts.find(account => post.authorId === account.id).userName}
                    title={post.title} 
                    content={post.content}
                />
            </Link>
        </div>
        {/each}
    </div>

    <Modal bind:showModal>
        <div id="addPostContainer">
            <form action="">
                <div id="postTitleInModalContainer">
                    <label for="titleInput">Title</label>
                    <input name="titleInput" type="text">
                </div>
            
                <div id="postContentInModalContainer">
                    <label for="contentInput">Content</label>
                    <textarea name="contentInput" cols="30" rows="10"></textarea>
                </div>
                <div id="sumbitPostContainer">
                    <button type="submit">Post</button>
                </div>
            </form>
        </div>
    </Modal>
</div>



<style>
    #postContainer{
        margin-top:1rem;
    }

    #post{
        margin-bottom: 1rem;
    }

    #mainContainer{
        display: flex;
        flex-direction: column;
    }


    #postTitleInModalContainer{
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    #postContentInModalContainer{
        margin-top: 0.5rem;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    #sumbitPostContainer{
        margin-top: 0.5rem;
        /* text-align: left; */
    }
    

    #addPostContainer{
        display: flex;
        flex-direction: column;
    }

    #postHeadingContainer{
        margin-top:2rem;
        display: flex;
        justify-content:space-between;
    }
</style>







