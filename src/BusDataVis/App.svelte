<script>
  import { Router, Route } from 'svelte-routing';
  import Login from './Login.svelte';
  // import Home from './Home.svelte';
  import Index from './Index.svelte';
</script>

<Router>
  <Route path="/" component={Login} />
  <Route path="/Home" component={Index} />
</Router>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    /* height: 100vh; */
    /* overflow: hidden */
  }
</style>
