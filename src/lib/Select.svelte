<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";
  import type { Collection } from "../types/collection";

  let {
    collections,
    currentCollectionId,
    onchange,
  }: {
    collections: Pick<Collection, "id" | "name">[];
    currentCollectionId: number;
    onchange: ChangeEventHandler<HTMLSelectElement>;
  } = $props();
</script>

<select name="collection" {onchange}>
  {#each collections as { id, name }}
    <option value={id} selected={currentCollectionId === id}>{name}</option>
  {/each}
</select>

<style>
  select {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    min-width: 175px;
    border-radius: 3px;
    border: none;
    font-size: var(--font-size-s);
    color: var(--current-color);
    transition: color var(--transition-duration);
    padding-inline: 0.5rem;
  }
</style>
