<script lang="ts">
  import Card from "./lib/Card.svelte";
  import Footer from "./lib/Footer.svelte";
</script>

<main>
  <Card />
</main>
<Footer />

<style>
  main {
    background: var(--current-color);
    flex: 1;
    display: grid;
    place-items: center;
    transition: background var(--transition-duration);
  }
</style>
