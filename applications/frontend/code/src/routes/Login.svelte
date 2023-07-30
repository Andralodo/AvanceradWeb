<script>
    import { navigate } from "svelte-routing";

    let account = {
        username: "",
        password: ""
    }

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
                navigate("/", {
					replace: false
				});
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
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify(account),
            })

            if (response.ok){
                const data = await response.json();
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("username", data.username);

                window.location.href = '/';

            }
        }
        catch(error){
            console.log("signUp error: ", error);
        }
    }
// -----------------------------------------------------------------------------------------------------------------------
//                   GOOGLE AUTHENTICATION (SCRAPPED IN FAVOR OF PASSWORD GRANT CREDENTIAL IMPLEMENTATION)
// -----------------------------------------------------------------------------------------------------------------------
    // async function handleGoogleLogin() {
    //     const authUrl = await initiateGoogleOAuth();
    //     if (authUrl) {
    //         console.log(authUrl)
    //         window.location.href = authUrl;
    //     } 
    //     else {
    //         // Handle error
    //     }
    // }
// -----------------------------------------------------------------------------------------------------------------------
//                   GOOGLE AUTHENTICATION (SCRAPPED IN FAVOR OF PASSWORD GRANT CREDENTIAL IMPLEMENTATION)
// -----------------------------------------------------------------------------------------------------------------------
</script>

<div id="mainContainer">
    {#if showLoginForm == true}
        <h2>Login</h2>
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