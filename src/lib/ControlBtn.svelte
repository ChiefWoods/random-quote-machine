<script lang="ts">
	export let id: string | null = null;
	export let content: string = "";
</script>

<button {id} class="btn" on:click>
	{content}
	<slot />
</button>

<style>
	@import "../assets/styles/btn.css";

	button {
		padding-inline: 12px;
	}
</style>
