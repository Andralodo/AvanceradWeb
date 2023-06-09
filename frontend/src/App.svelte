<script>
  import { Router, Link, Route } from "svelte-routing";
  import NavLink from "./components/NavLink.svelte";
  import Login from "./routes/Login.svelte";
  import Home from "./routes/Home.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";
</script>

<Router {url}>
  <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="login">Login</NavLink>
  </nav>
  <div>
      <Route path="login" component={Login} />
      <Route path="/" component={Home} />
  </div>
</Router>



<main>


</main>

<style>
 
</style>
