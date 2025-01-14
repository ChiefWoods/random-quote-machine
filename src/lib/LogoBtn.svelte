<script lang="ts">
  import BtnIcon from "./BtnIcon.svelte";

  let {
    id,
    href,
    src,
    alt,
  }: {
    id: string;
    href: string;
    src: string;
    alt: string;
  } = $props();
</script>

<a {id} class="btn" {href} target="_blank">
  <BtnIcon {src} {alt} />
</a>

<style>
  @import "../styles/btn.css";
</style>
