<div id="mainContainer">
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
        </div>
    </form>
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