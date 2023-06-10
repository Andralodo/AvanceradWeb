<script>
    export let author
    export let title
    export let content
</script>

<button id="postBlock" on:click>
    <p>Posted by: {author}</p>
    <h3>{title}</h3>
    <p>{content}</p>
</button>

<style>
    #postBlock {
        position: relative;
        width: 1280px;
        height: 250px;
        background:#312f2f;
        border-radius: 0% 0% 0% 0% / 0% 0% 0% 0% ;
        color: white;
        box-shadow: 10px 10px rgba(82, 74, 74, 0.15);
        transition: all .4s ease;
    }

    #postBlock:hover {
    border-radius: 0% 0% 50% 50% / 0% 0% 5% 5% ;
    box-shadow: 10px 10px rgba(0,0,0,.25);
    }
</style>