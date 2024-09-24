<script lang="ts">
	import type { CollectionName } from "./collection";

	export let collections: CollectionName[];
</script>

<select name="collection" on:change>
	{#each collections as { name, fullName }}
		<option value={name}>{fullName}</option>
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
		padding-left: 0.5rem;
	}
</style>
