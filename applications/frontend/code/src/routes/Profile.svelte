<script>
    import { accounts } from "../data";
    import EditProfileModal from "../components/EditProfileModal.svelte";
    import DeleteProfileModal from "../components/DeleteProfileModal.svelte";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    let showEditProfileModal = false
    let showDeleteProfileModal = false

    let userId;
    let username;
    let isLoggedIn = false;

    onMount(async () =>{
        await fetchCurrentUser();
    })

    const fetchCurrentUser = async () => {
        try {
        const response = await fetch('http://localhost:8080/api/accounts/fetchCurrentUser', {
            method: 'GET',
            mode: "cors",
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            username = data.username
            userId = data.userId
            isLoggedIn = true;
        } else {
            // message = 'Logout failed';
        }
        } catch (error) {
        console.error('Erro fetching user:', error);
        }
    };

    let account;
    const getAccount = async () => {
        const response = await fetch(`http://localhost:8080/api/accounts/${userId}`, {
            method: "GET",
            mode: "cors",
            credentials: "include"
        });
        const data = await response.json();
        return data
    };

</script>


<div id="mainContainer">
    {#if isLoggedIn}
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