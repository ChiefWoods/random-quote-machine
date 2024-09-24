<script lang="ts">
	import type {
		Collection,
		Quote,
		CollectionName,
	} from "./types/collection";
	import {
		getCollectionNames,
		getCollection,
		isVillains,
	} from "./lib/collection";
	import { writable, type Writable } from "svelte/store";
	import Card from "./lib/Card.svelte";
	import Footer from "./lib/Footer.svelte";
	import Select from "./lib/Select.svelte";

	let allCollections: Promise<CollectionName[]> = getCollectionNames();
	let currentCollection: Collection;
	let index: Writable<number> = writable(0);
	let quote: Promise<Quote>;
	let currentColor: string = "#fff";

	$: if (currentCollection) {
		quote = Promise.resolve(currentCollection.quotes[$index]);
		changeColor();
	}

	function randomizer(arr: any[]): number {
		return Math.floor(Math.random() * arr.length);
	}

	function changeColor() {
		const colorGroup: string[] = currentCollection.colors;
		let temp: string;

		do {
			temp = colorGroup[randomizer(colorGroup)];
		} while (temp === currentColor);

		currentColor = temp;

		document.documentElement.style.setProperty("--current-color", currentColor);
	}

	async function changeCollection(event: Event) {
		const target = event.target as HTMLSelectElement;

		const names = (await allCollections).map(({ name }) => name);

		const selectedName = names.find((name) => name === target.value);

		if (selectedName) {
			await setQuote(selectedName);
		}
	}

	async function setQuote(name: string) {
		quote = getCollection(name).then((col) => {
			currentCollection = col;
			index.set(randomizer(col.quotes));
			return col.quotes[$index];
		});
	}

	function setRandomQuote() {
		index.update((i) => {
			let j: number;

			do {
				j = Math.floor(Math.random() * currentCollection.quotes.length);
			} while (j === i);

			return j;
		});
	}

	function setPreviousQuote() {
		index.update((i) => {
			if (i === 0) {
				return currentCollection.quotes.length - 1;
			} else {
				return i - 1;
			}
		});
	}

	function setNextQuote() {
		index.update((i) => (i + 1) % currentCollection.quotes.length);
	}

	setQuote("villains");
</script>

<main>
	{#await allCollections then collections}
		<Select {collections} on:change={changeCollection} />
	{/await}
	<Card
		{quote}
		randomOnly={isVillains(currentCollection?.fullName)}
		on:randomQuote={setRandomQuote}
		on:previousQuote={setPreviousQuote}
		on:nextQuote={setNextQuote}
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
</style>
