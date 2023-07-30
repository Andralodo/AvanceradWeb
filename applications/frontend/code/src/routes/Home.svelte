<script>
    import PostBlock from "../components/PostBlock.svelte";
    import {Link, } from "svelte-routing";
    import { onMount } from "svelte";
    import AddPostModal from "../components/AddPostModal.svelte";
    let showAddPostModal = false;

    let userId = localStorage.getItem("userId");
	let username = localStorage.getItem("username");
	let isLoggedIn = false;

	if(userId != null && username != null){
		isLoggedIn = true;
	}

    let posts;
    onMount(async () =>{
        posts = await getPosts();
        // accounts = await getAccounts();
    })

    const getPosts = async () => {
        const response = await fetch("http://localhost:8080/api/posts");
        const data = await response.json();
        return data
    };
</script>

<div id="mainContainer">
    <div id="postHeadingContainer">
        <h2>Posts</h2>
        {#if isLoggedIn}
            <button on:click={() => (showAddPostModal = true)}>
                Create Post
            </button>
        {/if}
    </div>
    
    <div id="postContainer">
        {#await getPosts()}
            <p>Loading...</p>
        {:then posts}
            {#each posts as post}
            <div id="post">
                <Link to="post/{post.postId}">    
                    <PostBlock post = {post}/>
                </Link>
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







