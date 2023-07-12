<script>
    import { accounts } from "../data";
    import EditProfileModal from "../components/EditProfileModal.svelte";
    import DeleteProfileModal from "../components/DeleteProfileModal.svelte";
    import { onMount } from "svelte";
    let showEditProfileModal = false
    let showDeleteProfileModal = false

    const accountId = 1
    let account = []
 
    onMount(async () =>{
        account = await getAccount();
    })

    const getAccount = async () => {
        const response = await fetch(`http://localhost:8080/api/accounts/${accountId}`);
        const data = await response.json();
        return data
    };

</script>


<div id="mainContainer">
    <div id="profileHeadingContainer">
        <h2>Profile</h2>
        <button on:click={() => (showEditProfileModal = true)}>Edit Profile</button>
        <button on:click={() => (showDeleteProfileModal = true)}>Delete Account</button>
    </div>
    {#await getAccount() then account}
        <div>
            <h3>Username</h3>
            <p>{account[0].username}</p>   
        </div>
    {/await}

    {#await getAccount() then account}
        <EditProfileModal bind:showEditProfileModal account={account[0]}/>
        <DeleteProfileModal bind:showDeleteProfileModal accountId={account[0].accountId}/>
    {/await}
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