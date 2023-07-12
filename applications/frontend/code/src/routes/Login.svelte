<script>
    import { navigate } from "svelte-routing";


    let account = {
        username: "",
        password: ""
    }

    let showLoginForm = true

    async function signUpRequest(){
        try{
            const response = await fetch("http://localhost:8080/api/accounts/signUp", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(account),
            })

            if (response.ok){
                navigate("/", {
					replace: false
				});
            }
        }
        catch(error){
            console.log("signUp error: ", error);
        }
    }
</script>

<div id="mainContainer">
    {#if showLoginForm == true}
        <h2>Login</h2>
        <form action="">
            <div id="usernameContainer">
                <label for="usernameInput">Username</label>
                <input name="usernameInput" type="text" bind:value={account.username}>
            </div>
        
            <div id="passwordContainer">
                <label for="passwordInput">Password</label>
                <input name="passwordInput" type="password" bind:value={account.password}>
            </div>
            <div id="buttonContainer">
                <button type="submit">Login</button>
                <button on:click={()=>(showLoginForm = false)}>Switch To Sign Up</button>
            </div>
        </form>

    {:else}
        <h2>Sign Up</h2>
        <form on:submit|preventDefault={signUpRequest}>
            <div id="usernameContainer">
                <label for="usernameInput">Username</label>
                <input name="usernameInput" type="text" bind:value={account.username}>
            </div>
        
            <div id="passwordContainer">
                <label for="passwordInput">Password</label>
                <input name="passwordInput" type="password" bind:value={account.password}>
            </div>
            <div id="buttonContainer">
                <button type="submit">Sign Up</button>
                <button on:click={()=>(showLoginForm = true)}>Switch To Login</button>
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