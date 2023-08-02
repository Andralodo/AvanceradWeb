<script>

    let account = {
        username: "",
        password: ""
    }

    let registerErrors;
    let loginErrors;
    let successMessage;

    let showLoginForm = true

    async function registerRequest(){
        try{
            const response = await fetch("http://localhost:8080/api/accounts/register", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(account),
            })

            if (response.ok){
                const data = await response.json();
                successMessage = data.success;
                showLoginForm = true
            }
            else {
				const data = await response.json();
				if (data.errors) {
					registerErrors = data.errors;
				} else {
					console.log("Unknown error:", data);
				}
			}
        }
        catch(error){
            console.log("signUp error: ", error);
        }
    }

    async function loginRequest(){
        try{
            const response = await fetch("http://localhost:8080/api/accounts/login", 
            {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(account),
            })

            if (response.ok){
                window.location.href = '/';
            }
            else {
				const data = await response.json();
				if (data.errors) {
					loginErrors = data.errors;
				} else {
					console.log("Unknown error:", data);
				}
			}
        }
        catch(error){
            console.log("signUp error: ", error);
        }
    }
</script>

<div id="mainContainer">
    {#if successMessage}
        <ul class="success-message">
            <li>{successMessage}</li>
        </ul>
    {/if}
    {#if showLoginForm == true}
        <h2>Login</h2>
        {#if loginErrors}
            <ul class="error-message">
                {#each loginErrors as error}
                    <li>{error}</li>
                {/each}
            </ul>
        {/if}
        <form on:submit|preventDefault={loginRequest}>
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
            </div>
            <button class="btn info" on:click={()=>(showLoginForm = false)}>Dont have an account register here</button>
        </form>
        <!-- <button on:click={handleGoogleLogin}>Login with Google</button> -->

    {:else}
        <h2>Register</h2>
        {#if registerErrors}
            <ul class="error-message">
                {#each registerErrors as error}
                    <li>{error}</li>
                {/each}
            </ul>
        {/if}
        <form on:submit|preventDefault={registerRequest}>
            <div id="usernameContainer">
                <label for="usernameInput">Username</label>
                <input name="usernameInput" type="text" bind:value={account.username}>
            </div>
        
            <div id="passwordContainer">
                <label for="passwordInput">Password</label>
                <input name="passwordInput" type="password" bind:value={account.password}>
            </div>
            <div id="buttonContainer">
                <button type="submit">Register</button>
            </div>
            <button class="btn info" on:click={()=>(showLoginForm = true)}>Already have an account login here</button>
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

    .btn {
    border: none;
    background-color: inherit;
    padding: 14px 28px;
    font-size: 16px;
    cursor: pointer;
    display: inline-block;
    }

    .info {color: dodgerblue;}
</style>