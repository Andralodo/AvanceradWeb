<script>
    import { accounts } from "../data";
    // let account = accounts.find(account => 1===account.id)
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
        console.log(data)
        return data
    };
</script>


<div id="mainContainer">
    <div id="profileHeadingContainer">
        <h2>Profile</h2>
        <button on:click={() => (showEditProfileModal = true)}>Edit Profile</button>
        <button on:click={() => (showDeleteProfileModal = true)}>Delete Account</button>
    </div>
    {#await getAccount()}
    {:then account}
        <div>
            <h3>Username</h3>
            <p>{account[0].username}</p>   
        </div>
    {/await}

    {#await getAccount()}
    {:then account}
        <EditProfileModal bind:showEditProfileModal>
            <div id="addPostContainer">
                <form action="">
                    <div id="postUsernameInModalContainer">
                        <label for="titleInput">Username</label>
                        <input name="titleInput" value="{account[0].username}" type="text">
                    </div>
                    <div id="postUsernameInModalContainer">
                        <label for="titleInput">Password</label>
                        <input name="titleInput" value="{account[0].password}" type="password">
                    </div>
                    <div id="sumbitPostContainer">
                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
        </EditProfileModal>
    {/await}

    <DeleteProfileModal bind:showDeleteProfileModal>
        <div id="deletePostModal">
            <form action="">
                <div>
                    <p>Are you sure you want to delete your account?</p>
                </div>
                <div id="deletePostButtonModal">
                    <button type="submit">Delete</button>
                </div>
            </form>
        </div>
    </DeleteProfileModal>
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