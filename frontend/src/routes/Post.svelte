<script>
    import CommentBlock from "../components/CommentBlock.svelte";
    import { posts, accounts, comments } from "../data.js" 

    const id = parseInt(new URL(document.location.href).pathname.split('/')[2]);
    let post = posts.find(post => id === post.id)

    let postComments = comments.filter(function (comment) { return comment.postId == id });
</script>

<div>
    <div>
        <p>{accounts.find(account => post.authorId === account.id).name}</p>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
    </div>
    <div>
        {#each postComments as comment}
            <CommentBlock 
                author={accounts.find(account => comment.commenterId === account.id).name}
                comment={comment.comment}
            />
        {/each}
    </div>
</div>

