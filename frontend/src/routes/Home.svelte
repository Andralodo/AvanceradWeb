<script>
    import PostBlock from "../components/PostBlock.svelte";
    import { Router, Link, Route } from "svelte-routing";
    import { posts, accounts } from "../data.js" 
</script>


<h1> Home </h1>

{#each posts as post}
    <Link to="post/{post.id}">    
        <PostBlock 
            id={post.id} 
            author={accounts.find(account => post.authorId === account.id).name}
            title={post.title} 
            content={post.content}
        />
    </Link>
{/each}







