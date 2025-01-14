<script lang="ts">
  import type { Collection, Quote } from "./types/collection";
  import { getCollectionNames, getCollection } from "./lib/collection";
  import Card from "./lib/Card.svelte";
  import Footer from "./lib/Footer.svelte";
  import Select from "./lib/Select.svelte";
  import { getRandomIndex } from "./lib/utils";

  let index: number = $state(0);
  let availableCollections: Promise<Pick<Collection, "id" | "name">[]> =
    $state(getCollectionNames());
  let currentCollection: Collection = $state() as Collection;
  let quote: Quote = $state() as Quote;
  let currentColor: string = "#fff";

  function changeColor() {
    const colorGroup: string[] = currentCollection.colors;
    let temp: string;

    do {
      temp = colorGroup[getRandomIndex(colorGroup)];
    } while (temp === currentColor);

    currentColor = temp;

    document.documentElement.style.setProperty("--current-color", currentColor);
  }

  async function changeCollection(event: Event) {
    const target = event.target as HTMLSelectElement;

    const ids = (await availableCollections).map(({ id }) => id);

    const selectedCollectionId = ids.find((id) => id === Number(target.value));

    if (selectedCollectionId) {
      await setQuote(selectedCollectionId);
    }
  }

  async function setQuote(id: number) {
    const col = await getCollection(id);
    currentCollection = col;
    index = getRandomIndex(col.quotes);
    quote = col.quotes[index];
  }

  function setRandomQuote() {
    let temp: number;

    do {
      temp = getRandomIndex(currentCollection.quotes);
    } while (temp === index);

    index = temp;
  }

  function setPreviousQuote() {
    index = index === 0 ? currentCollection.quotes.length - 1 : index - 1;
  }

  function setNextQuote() {
    index = (index + 1) % currentCollection.quotes.length;
  }

  $effect(() => {
    if (currentCollection) {
      quote = currentCollection.quotes[index];
      changeColor();
    }
  });

  availableCollections.then((col) => {
    setQuote(col[0].id);
  });
</script>

<main>
  {#snippet loading()}
    <div>
      <p class="fetching">Fetching quote...</p>
      <svg
        class="loading-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
      </svg>
    </div>
  {/snippet}

  {#await availableCollections}
    {@render loading()}
  {:then collections}
    {#if currentCollection}
      <Select {collections} onchange={changeCollection} />
      <Card
        {quote}
        isVillains={currentCollection.name === "Villains"}
        onRandomQuote={setRandomQuote}
        onPreviousQuote={setPreviousQuote}
        onNextQuote={setNextQuote}
      />
    {:else}
      {@render loading()}
    {/if}
  {:catch err}
    <div>
      <p class="error">Unable to fetch quotes. Try again later.</p>
    </div>
  {/await}
</main>
<Footer />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

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
    font-family: "Rubik", sans-serif;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
    background: white;
    padding: 30px;
    border-radius: 3px;
  }

  .loading-icon {
    width: var(--font-size-m);
    aspect-ratio: 1/1;
    animation: spin 1s linear infinite;

    & > path {
      fill: var(--current-color);
    }
  }

  .fetching,
  .error {
    font-size: var(--font-size-l);
    text-align: center;
  }
</style>
