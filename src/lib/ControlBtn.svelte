<script lang="ts">
  import BtnIcon from "./BtnIcon.svelte";

  let {
    id,
    src,
    alt,
    onclick,
  }: {
    id: string;
    src: string;
    alt: string;
    onclick: () => void;
  } = $props();
</script>

<button {id} class="btn" {onclick}>
  <BtnIcon {src} {alt} />
</button>

<style>
  @import "../styles/btn.css";
</style>
