<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import NavLink from "./components/NavLink.svelte";
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
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const logout = async () => {
    // Send logout request to backend
    try {
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
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

</script>

<main>
  <h1> Forum </h1>
  <Router {url}>
    <nav id="navbar">
        {#if isLoggedIn == true}
          <NavLink to="/">Home</NavLink>
          <NavLink to="profile">Profile</NavLink>
          <p>{username}</p>
          <button on:click={logout}>Logout</button>

        {:else}
          <NavLink to="/">Home</NavLink>
          <NavLink to="login">Login</NavLink>
        {/if}
    </nav>
    <div>
        <Route path="login" component={Login} />
        <Route path="/" component={Home} />
        <Route path="post/:id" component={Post} />
        <Route path="profile" component={Profile}/>
    </div>
  </Router>
</main>
