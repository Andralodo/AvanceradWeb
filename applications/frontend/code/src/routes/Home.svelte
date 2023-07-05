<script>
    import PostBlock from "../components/PostBlock.svelte";
    import { Router, Link, Route } from "svelte-routing";
    // import { posts, accounts } from "../data.js";
    import { onMount } from "svelte";
    import Modal from '../components/Modal.svelte';
    let showModal = false;

    let posts = []
    let accounts = []
    onMount(async () =>{
        posts = await getPosts();
        accounts = await getAccounts();
    })

    const getPosts = async () => {
        const response = await fetch("http://localhost:8080/api/posts");
        const data = await response.json();
        console.log(data)
        return data
    };

    const getAccounts = async () => {
        const response = await fetch("http://localhost:8080/api/accounts");
        const data = await response.json();
        console.log(data)
        return data
    };


</script>

<div id="mainContainer">
    <div id="postHeadingContainer">
        <h2>Posts</h2>
        <button on:click={() => (showModal = true)}>
            Create Post
        </button>
    </div>
    
    <div id="postContainer">
        {#await getPosts()}
            <p>Loading...</p>
        {:then posts}
            {#each posts as post}
            <div id="post">
                {#await getAccounts()}
                {:then accounts}
                <Link to="post/{post.postId}">    
                    <PostBlock 
                        author={accounts.find(account => post.accountId === account.accountId).username}
                        title={post.title} 
                        content={post.content}
                    />
                </Link>
                {/await}
            </div>
            {/each}
        {/await}
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







