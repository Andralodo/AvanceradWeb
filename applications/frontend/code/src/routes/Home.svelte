<script>
    import PostBlock from "../components/PostBlock.svelte";
    import {Link, } from "svelte-routing";
    import AddPostModal from "../components/AddPostModal.svelte";

    export let currentUser;

    let showAddPostModal = false;
    let postErrors;

    const getPosts = async () => {
        const response = await fetch("http://localhost:8080/api/posts");
        if (response.ok) {
            const data = await response.json();
            return data
        } 
        else{
            const data = await response.json();
			if (data.errors) {
				postErrors = data.errors;
			}
        }
    };
</script>

<div id="mainContainer">
    <div id="postHeadingContainer">
        <h2>Posts</h2>
        {#if currentUser.isLoggedIn}
            <button on:click={() => (showAddPostModal = true)}>
                Create Post
            </button>
        {/if}
    </div>
    
    <div id="postContainer">
            {#await getPosts()}
                <p>Loading...</p>
            {:then posts}
                {#if posts}
                    {#each posts as post}
                    <div id="post">
                        <Link to="post/{post.postId}">    
                            <PostBlock post = {post}/>
                        </Link>
                    </div>
                    {/each}
                {:else if postErrors}
                    <p>{postErrors[0]}<br>Error loading posts :(</p>
                {:else}
                    <p>No posts!</p>
                {/if}
            {/await}
    </div>
    <AddPostModal bind:showAddPostModal userId={currentUser.userId}/>
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







