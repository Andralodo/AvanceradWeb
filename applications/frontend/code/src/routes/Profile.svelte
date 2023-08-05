<script>
    import EditProfileModal from "../components/EditProfileModal.svelte";
    import DeleteProfileModal from "../components/DeleteProfileModal.svelte";
    
    export let currentUser;

    let showEditProfileModal = false
    let showDeleteProfileModal = false

    let errors;

    const getAccount = async () => {
        const response = await fetch(`http://localhost:8080/api/accounts/${currentUser.userId}`, {
            method: "GET",
            mode: "cors",
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            return data
        } 
        else {
            const data = await response.json();
            if(data.errors){
                errors = data.errors
            }
        }
    };

</script>


<div id="mainContainer">
    {#if errors}
        <p>{errors[0]}<br>Error loading profile</p>
    {:else}
        {#if currentUser.isLoggedIn}
            <div id="profileHeadingContainer">
                <h2>Profile</h2>
                <button on:click={() => (showEditProfileModal = true)}>Edit Profile</button>
                <button on:click={() => (showDeleteProfileModal = true)}>Delete Account</button>
            </div>
            {#await getAccount() then account}
                <div>
                    <h3>Username</h3>
                    <p>{account.username}</p>   
                </div>
            {/await}

            {#await getAccount() then account}
                <EditProfileModal bind:showEditProfileModal account={account}/>
                <DeleteProfileModal bind:showDeleteProfileModal accountId={account.accountId}/>
            {/await}
        {:else}
            <p>Not Logged In</p>
        {/if}
    {/if}
</div>


<style>
    #mainContainer{
        display: flex;
        flex-direction: column;
    }

    #profileHeadingContainer{
        margin-top:2rem;
        display: flex;
        justify-content:space-between;
    }
</style>