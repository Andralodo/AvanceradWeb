<script>
    import { accounts } from "../data";
    let account = accounts.find(account => 1===account.id)
    import EditProfileModal from "../components/EditProfileModal.svelte";
    import DeleteProfileModal from "../components/DeleteProfileModal.svelte";
    let showEditProfileModal = false
    let showDeleteProfileModal = false
</script>


<div id="mainContainer">
    <div id="profileHeadingContainer">
        <h2>Profile</h2>
        <button on:click={() => (showEditProfileModal = true)}>Edit Profile</button>
        <button on:click={() => (showDeleteProfileModal = true)}>Delete Account</button>
    </div>
    <div>
        <h3>Username</h3>
        <p>{account.userName}</p>   
        <h3>First Name</h3>
        <p>{account.firstName}</p>
        <h3>Last Name</h3>
        <p>{account.lastName}</p>
    </div>

    <EditProfileModal bind:showEditProfileModal>
        <div id="addPostContainer">
            <form action="">
                <div id="postUsernameInModalContainer">
                    <label for="titleInput">Username</label>
                    <input name="titleInput" value="{account.userName}" type="text">
                </div>
                <div id="postUsernameInModalContainer">
                    <label for="titleInput">First Name</label>
                    <input name="titleInput" value="{account.firstName}" type="text">
                </div>
                <div id="postUsernameInModalContainer">
                    <label for="titleInput">Last Name</label>
                    <input name="titleInput" value="{account.lastName}" type="text">
                </div>
                <div id="postUsernameInModalContainer">
                    <label for="titleInput">Password</label>
                    <input name="titleInput" value="{account.password}" type="password">
                </div>
                <div id="sumbitPostContainer">
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    </EditProfileModal>

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