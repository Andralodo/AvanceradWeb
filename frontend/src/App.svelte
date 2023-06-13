<script>
  import { Router, Link, Route } from "svelte-routing";
  import NavLink from "./components/NavLink.svelte";
  import Login from "./routes/Login.svelte";
  import Home from "./routes/Home.svelte";
  import Post from "./routes/Post.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";
</script>

<main>
  <h1> Forum </h1>
  <Router {url}>
    <nav id="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="login">Login</NavLink>
    </nav>
    <div>
        <Route path="login" component={Login} />
        <Route path="/" component={Home} />
        <Route path="post/:id" component={Post} />
    </div>
  </Router>
</main>
