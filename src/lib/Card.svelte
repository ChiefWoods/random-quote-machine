<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Quote } from "../types/collection";
	import ControlBtn from "./ControlBtn.svelte";
	import LogoBtn from "./LogoBtn.svelte";
	import Twitter from "../assets/icons/x-twitter.svg";
	import Tumblr from "../assets/icons/tumblr.svg";
	import dice from "../assets/icons/dice-solid.svg";
	import chevronLeft from "../assets/icons/chevron-left.svg";
	import chevronRight from "../assets/icons/chevron-right.svg";

	export let quote: Promise<Quote>;
	export let randomOnly: Boolean = false;

	const dispatch = createEventDispatcher();

	function generateTwitterLink(text: string, title: string): string {
		return `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(
			`"${text}" - ${title}`
		)}`;
	}

	function generateTumblrLink(text: string, title: string): string {
		return `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(title)}
		&content=${encodeURIComponent(text)}
		&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
	}
</script>

<section id="quote-box">
	{#await quote}
		<blockquote>
			<p class="fetching">Fetching quote...</p>
			<svg
				class="loading-icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
			</svg>
		</blockquote>
	{:then data}
		<blockquote>
			{#if randomOnly}
				<p id="text">"{data.desc}"</p>
				<p id="author">- {data.title}</p>
			{:else}
				<p id="title">{data.title}</p>
				<p id="desc">{data.desc}</p>
			{/if}
		</blockquote>
		<div id="btn-container">
			<div>
				<LogoBtn
					id="tweet-quote"
					icon={Twitter}
					href={generateTwitterLink(data.desc, data.title)}
					alt="Twitter"
				/>
				<LogoBtn
					id="share-quote"
					icon={Tumblr}
					href={generateTumblrLink(data.desc, data.title)}
					alt="Tumblr"
				/>
			</div>
			<div>
				<ControlBtn id="randomize" on:click={() => dispatch("randomQuote")}>
					<img src={dice} alt="Random Quote" />
				</ControlBtn>
				{#if !randomOnly}
					<ControlBtn
						id="previous-quote"
						on:click={() => dispatch("previousQuote")}
					>
						<img src={chevronLeft} alt="Previous Quote" />
					</ControlBtn>
					<ControlBtn id="next-quote" on:click={() => dispatch("nextQuote")}>
						<img src={chevronRight} alt="Next Quote" />
					</ControlBtn>
				{/if}
			</div>
		</div>
	{:catch}
		<blockquote>
			<p class="error">Cannot fetch quotes. Try again later.</p>
		</blockquote>
	{/await}
</section>

<style>
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	#quote-box {
		width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 30px;
		padding: 30px;
		border-radius: 3px;
		background: white;
	}

	blockquote {
		display: flex;
		flex-direction: column;
		gap: 15px;

		& * {
			color: var(--current-color);
			transition: color var(--transition-duration);
		}

		&:has(.fetching) {
			flex-direction: row;
			justify-content: center;
		}
	}

	.fetching,
	#text,
	#title,
	.error {
		font-size: var(--font-size-l);
		text-align: center;
	}

	#author {
		font-size: var(--font-size-m);
		font-weight: 300;
		margin-left: auto;
	}

	#desc {
		font-size: var(--font-size-s);
		text-align: justify;
		max-height: 200px;
		overflow-y: auto;
	}

	#btn-container {
		display: flex;
		justify-content: space-between;
	}

	#btn-container > div {
		display: flex;
		gap: 10px;
	}

	.loading-icon {
		width: var(--font-size-m);
		aspect-ratio: 1/1;
		animation: spin 1s linear infinite;

		& > path {
			fill: var(--current-color);
		}
	}

	@media (max-width: 768px) {
		#quote-box {
			max-width: 500px;
			width: 100%;
		}
	}
</style>
