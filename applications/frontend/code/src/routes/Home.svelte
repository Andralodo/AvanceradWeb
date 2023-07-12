<script>
    import PostBlock from "../components/PostBlock.svelte";
    import { Router, Link, Route, navigate } from "svelte-routing";
    // import { posts, accounts } from "../data.js";
    import { onMount } from "svelte";
    import AddPostModal from "../components/AddPostModal.svelte";
    let showAddPostModal = false;

    let posts = []
    let accounts = []
    onMount(async () =>{
        posts = await getPosts();
        accounts = await getAccounts();
    })

    const getPosts = async () => {
        const response = await fetch("http://localhost:8080/api/posts");
        const data = await response.json();
        return data
    };

    const getAccounts = async () => {
        const response = await fetch("http://localhost:8080/api/accounts");
        const data = await response.json();
        return data
    };
</script>

<div id="mainContainer">
    <div id="postHeadingContainer">
        <h2>Posts</h2>
        <button on:click={() => (showAddPostModal = true)}>
            Create Post
        </button>
    </div>
    
    <div id="postContainer">
        {#await getPosts()}
            <p>Loading...</p>
        {:then posts}
            {#each posts as post}
            <div id="post">
                {#await getAccounts() then accounts}
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
    <AddPostModal bind:showAddPostModal/>
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

    #postHeadingContainer{
        margin-top:2rem;
        display: flex;
        justify-content:space-between;
    }
</style>







