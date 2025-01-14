<script lang="ts">
  let { src, alt }: { src: string; alt: string } = $props();
</script>

<img {src} {alt} />

<style>
  img {
    width: 20px;
    aspect-ratio: 1/1;
  }
</style>
