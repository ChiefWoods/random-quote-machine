<script lang="ts">
	export let id: string;
	export let icon: string;
	export let href: string;
	export let alt: string;
</script>

<a {id} class="btn" {href} target="_blank">
	<img src={icon} {alt} />
</a>

<style>
	@import "../assets/styles/btn.css";
</style>
