<script lang="ts">
	import LogoBtn from "./LogoBtn.svelte";
	import ControlBtn from "./ControlBtn.svelte";
	import Twitter from "../assets/icons/x-twitter.svg";
	import Tumblr from "../assets/icons/tumblr.svg";
	import dice from "../assets/icons/dice-solid.svg";
	import chevronLeft from "../assets/icons/chevron-left.svg";
	import chevronRight from "../assets/icons/chevron-right.svg";
	import { createEventDispatcher } from "svelte";

	export let collectionType: string;
	export let collectionName: string;
	export let quote: Promise<any>;
	export let fullQuotes: any[];
	export let index: number;

	const dispatch = createEventDispatcher();

	function generateTwitterLink(text: string, author: string): string {
		return `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(
			`"${text}" - ${author}`
		)}`;
	}

	function generateTumblrLink(text: string, author: string): string {
		return `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(
			author.slice(0)
		)}&content=${encodeURIComponent(
			text.slice(0)
		)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
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
			{#if collectionType === "single"}
				<p id="text">"{data.quote}"</p>
				<p id="author">- {data.name}</p>
			{:else if collectionType === "full"}
				<p id="title">
					{collectionName === "48laws" ? `Law ${fullQuotes[index].id}: ` : ""}
					{fullQuotes[index].title}
				</p>
				<p id="content">{fullQuotes[index].desc}</p>
			{/if}
		</blockquote>
		<div id="btn-container">
			{#if collectionType === "single"}
				<div>
					<LogoBtn
						id="tweet-quote"
						icon={Twitter}
						href={generateTwitterLink(data.quote, data.name)}
						alt="Twitter"
					/>
					<LogoBtn
						id="share-quote"
						icon={Tumblr}
						href={generateTumblrLink(data.quote, data.name)}
						alt="Tumblr"
					/>
				</div>
				<ControlBtn
					id="new-quote"
					content={"New Quote"}
					on:click={() => dispatch("newQuote")}
				/>
			{:else if collectionType === "full"}
				<ControlBtn id="randomize" on:click={() => dispatch("randomize")}>
					<img src={dice} alt="" />
				</ControlBtn>
				<div>
					<ControlBtn id="previous-quote" on:click={() => dispatch("previous")}>
						<img src={chevronLeft} alt="" />
					</ControlBtn>
					<ControlBtn id="next-quote" on:click={() => dispatch("next")}>
						<img src={chevronRight} alt="" />
					</ControlBtn>
				</div>
			{/if}
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

	#content {
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
