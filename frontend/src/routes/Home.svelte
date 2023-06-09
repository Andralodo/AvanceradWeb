<script>
    import PostBlock from "../components/PostBlock.svelte";

    let posts = [
        { id: 1, author: "Andrey", title: "Fried Rice recipe", description: "My lovely fried rice recipe" },
        { id: 2, author: "KetaKarreth", title: "Dog ate it", description: "My dog ate all of my keta >:(" }
    ]
</script>
<h1> Home </h1>

{#each posts as post}
    <PostBlock 
        id={post.id} 
        author={post.author}
        title={post.title} 
        description={post.description} 
    />
{/each}





