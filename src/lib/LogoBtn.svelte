<script lang="ts">
  export let id: string;
  export let icon: string;
  export let href: string;
  export let alt: string;
</script>

<a {id} {href} target="_blank">
  <img src={icon} {alt} />
</a>

<style>
  a,
  :global(#new-quote) {
    background: var(--current-color);
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transition: background var(--transition-duration);
  }

  a:hover,
  :global(#new-quote):hover {
    opacity: 0.8;
  }

  img {
    width: 20px;
    aspect-ratio: 1/1;
  }
</style>
