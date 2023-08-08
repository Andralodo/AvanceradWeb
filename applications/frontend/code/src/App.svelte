<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import Login from "./routes/Login.svelte";
  import Home from "./routes/Home.svelte";
  import Post from "./routes/Post.svelte";
  import Profile from "./routes/Profile.svelte";
  import LogoutModal from "./components/LogoutModal.svelte";
  import { onMount } from "svelte";
  import { getCsrfToken } from "./csrf";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";

  let showLogoutModal = false

  let userId;
  let username;
  let isLoggedIn = false;

  onMount(async () =>{
    await fetchCurrentUser();
  })

  const fetchCurrentUser = async () => {
    const csrfToken = await getCsrfToken()
    const response = await fetch('http://localhost:8080/api/accounts/fetchCurrentUser', {
      method: 'GET',
      mode: "cors",
      credentials: "include",
      headers: {
                "Content-Type": "application/json",
                'X-CSRF-Token': csrfToken
      }
    });

    if (response.ok) {
      const data = await response.json();
      username = data.username,
      userId = data.userId,
      isLoggedIn = true
    }
  };

</script>

<main>
  <h1> Forum </h1>
  <Router {url}>
    <nav id="navbar">
      {#if isLoggedIn}
        <div>
          <Link to="/">Home</Link>
          <Link to="profile/{userId}">Profile</Link>
        </div>
        <div class="navUser">
          <p class="navUsername">Logged in as: <b>{username}</b></p>
          <button on:click={() => (showLogoutModal = true)}>Logout</button>
        </div>
      {:else}
        <Link to="/">Home</Link>
        <Link to="login">Login</Link>
      {/if}
    </nav>
    <div>
        <Route path="login" component={Login} />
        <Route path="/">
          <Home currentUser = {{userId, username, isLoggedIn}}/>
        </Route>
        <Route path="post/:id" let:params>
          <Post postId={params.id} currentUser = {{userId, username, isLoggedIn}}/>
        </Route>
        <Route path="profile/:id">
          <Profile currentUser = {{userId, username, isLoggedIn}}/>
        </Route>
    </div>
  </Router>
  <LogoutModal bind:showLogoutModal/>
</main>
