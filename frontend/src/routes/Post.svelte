<script>
    import { posts, accounts } from "../data.js" 
    const id = parseInt(new URL(document.location.href).pathname.split('/')[2]);

    let post = posts.find(post => id === post.id)
</script>

<div>
    <p>{accounts.find(account => post.authorId === account.id).name}</p>
    <h1>{post.title}</h1>
    <p>{post.content}</p>
</div>

