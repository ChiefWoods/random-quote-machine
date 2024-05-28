<script lang="ts">
	import Card from "./lib/Card.svelte";
	import Footer from "./lib/Footer.svelte";
	import { getRandomQuote, getAllQuotes } from "./lib/util.ts";
	import { writable, type Writable } from "svelte/store";

	interface Collection {
		type: "single" | "full";
		name: string;
		option: string;
	}

	const collections: Record<string, Collection[]> = {
		single: [
			{
				type: "single",
				name: "villains",
				option: "Villains",
			},
		],
		full: [
			{
				type: "full",
				name: "48laws",
				option: "48 Laws of Power",
			},
			{
				type: "full",
				name: "33strategies",
				option: "33 Strategies of War",
			},
		],
	};

	const colors: Record<string, string[]> = {
		villains: [
			"#0d0e14",
			"#252933",
			"#404556",
			"#60515c",
			"#777076",
			"#597d7c",
			"#386775",
			"#20504e",
			"#193d31",
			"#17292b",
		],
		"48laws": ["#c64911", "#180145", "#acb117"],
		"33strategies": ["#3c4d47", "#c31a1f"],
	};

	let currentColor: string = "#000";
	let currentCollection: Collection = collections["single"][0];
	let quote: Promise<any>;
	let fullQuotes: any[];
	let index: Writable<number> = writable(0);

	$: if (quote !== undefined) {
		pickRandomColor();
	}

	$: if (fullQuotes) {
		quote = fullQuotes[$index];
	}

	async function updateQuote() {
		if (currentCollection.type === "single") {
			quote = getRandomQuote(currentCollection.name);
		} else {
			quote = getAllQuotes(currentCollection.name).then((quotes) => {
				fullQuotes = quotes;
				return quotes[$index];
			});
		}
	}

	async function updateCollection(event: Event) {
		const target = event.target as HTMLSelectElement;

		for (const [key, value] of Object.entries(collections)) {
			const collection = value.find(
				(collection) => collection.name === target.value
			);

			if (collection) {
				currentCollection = collection;
				break;
			}
		}

		updateQuote();
	}

	function pickRandomColor() {
		const colorGroup: string[] = colors[currentCollection.name];
		let temp: string;

		do {
			temp = colorGroup[Math.floor(Math.random() * colorGroup.length)];
		} while (temp === currentColor);

		currentColor = temp;
		document.documentElement.style.setProperty("--current-color", currentColor);
	}

	async function showNewQuote() {
		let temp: Promise<any>;

		do {
			temp = await getRandomQuote(currentCollection.name);
		} while (temp === quote);

		quote = temp;
	}

	async function showRandomQuote() {
		index.update((i) => {
			let j: number;

			do {
				j = Math.floor(Math.random() * fullQuotes.length);
			} while (j === i);

			return j;
		});
	}

	async function showPreviousQuote() {
		index.update((i) => {
			if (i === 0) {
				return fullQuotes.length - 1;
			} else {
				return i - 1;
			}
		});
	}

	async function showNextQuote() {
		index.update((i) => (i + 1) % fullQuotes.length);
	}

	updateQuote();
</script>

<main>
	<select name="collection" id="" on:change={(e) => updateCollection(e)}>
		{#each Object.entries(collections) as [_, collection]}
			{#each collection as { option, name }}
				<option value={name} selected={currentCollection.name === name}
					>{option}</option
				>
			{/each}
		{/each}
	</select>
	<Card
		collectionType={currentCollection.type}
		collectionName={currentCollection.name}
		{quote}
		{fullQuotes}
		index={$index}
		on:newQuote={showNewQuote}
		on:randomize={showRandomQuote}
		on:previous={showPreviousQuote}
		on:next={showNextQuote}
	/>
</main>
<Footer />

<style>
	@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap");

	:root {
		--current-color: black;
		--transition-duration: 1s;
		--font-size-l: 2.5rem;
		--font-size-m: 2rem;
		--font-size-s: 1.5rem;
	}

	main {
		background: var(--current-color);
		flex: 1;
		display: grid;
		place-items: center;
		transition: background var(--transition-duration);

		& * {
			font-family: "Rubik", sans-serif;
		}
	}

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
	}
</style>
