<script>
    let showLogin = true
</script>



<div id="mainContainer">
    {#if showLogin == true}
    <h2>Login</h2>
    <form action="">
        <div id="usernameContainer">
            <label for="usernameInput">Username</label>
            <input name="usernameInput" type="text">
        </div>
    
        <div id="passwordContainer">
            <label for="passwordInput">Password</label>
            <input name="passwordInput" type="text">
        </div>
        <div id="buttonContainer">
            <button type="submit">Login</button>
            <button on:click={()=>(showLogin = false)}>Switch To Sign Up</button>
        </div>
    </form>

    {:else}
    <h2>Sign Up</h2>
    <form action="">
        <div id="usernameContainer">
            <label for="usernameInput">Username</label>
            <input name="usernameInput" type="text">
        </div>
    
        <div id="passwordContainer">
            <label for="passwordInput">Password</label>
            <input name="passwordInput" type="text">
        </div>
        <div id="buttonContainer">
            <button type="submit">Sign Up</button>
            <button on:click={()=>(showLogin = true)}>Switch To Login</button>
        </div>
    </form>
    {/if}
</div>



<style>
    #usernameContainer{
        margin-top:2rem;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    #passwordContainer{
        margin-top:2rem;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    #buttonContainer{
        margin-top:2rem;
        text-align: left;
    }
    
    #mainContainer{
        display: flex;
        flex-direction: column;
    }
</style>