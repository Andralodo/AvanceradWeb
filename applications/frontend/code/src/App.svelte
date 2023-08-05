<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import Login from "./routes/Login.svelte";
  import Home from "./routes/Home.svelte";
  import Post from "./routes/Post.svelte";
  import Profile from "./routes/Profile.svelte";
  import { onMount } from "svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";

  let userId;
  let username;
  let isLoggedIn = false;

  onMount(async () =>{
    await fetchCurrentUser();
  })

  const fetchCurrentUser = async () => {
    const response = await fetch('http://localhost:8080/api/accounts/fetchCurrentUser', {
      method: 'GET',
      mode: "cors",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      username = data.username,
      userId = data.userId,
      isLoggedIn = true
    }
  };

  const logout = async () => {
    // Send logout request to backend
    const response = await fetch('http://localhost:8080/api/accounts/logout', {
      method: 'POST',
      mode: "cors",
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = '/login'; // Redirect to the login page after logout
    } else {
      // message = 'Logout failed';
    }
  };

</script>

<main>
  <h1> Forum </h1>
  <Router {url}>
    <nav id="navbar">
      {#if isLoggedIn}
        <Link to="/">Home</Link>
        <Link to="profile/{userId}">Profile</Link>
        <p>{username}</p>
        <button on:click={logout}>Logout</button>
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
</main>
