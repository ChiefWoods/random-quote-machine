<script lang="ts">
  import type { Quote } from "../types/collection";
  import ControlBtn from "./ControlBtn.svelte";
  import LogoBtn from "./LogoBtn.svelte";
  import twitter from "../assets/icons/x-twitter.svg";
  import tumblr from "../assets/icons/tumblr.svg";
  import dice from "../assets/icons/dice-solid.svg";
  import chevronLeft from "../assets/icons/chevron-left.svg";
  import chevronRight from "../assets/icons/chevron-right.svg";

  let {
    quote,
    isVillains,
    onRandomQuote,
    onPreviousQuote,
    onNextQuote,
  }: {
    quote: Quote;
    isVillains: boolean;
    onRandomQuote: () => void;
    onPreviousQuote: () => void;
    onNextQuote: () => void;
  } = $props();

  function generateTwitterLink(text: string, title: string): string {
    return `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(
      `"${title}" - ${text}`,
    )}`;
  }

  function generateTumblrLink(text: string, title: string): string {
    return `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(text)}
		&content=${encodeURIComponent(title)}
		&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
  }
</script>

<section id="quote-box">
  <blockquote>
    {#if isVillains}
      <p id="text">"{quote.main}"</p>
      <p id="author">- {quote.sub}</p>
    {:else}
      <p id="main">{quote.main}</p>
      {#if quote.sub}
        <p id="sub">{quote.sub}</p>
      {/if}
    {/if}
  </blockquote>
  <div id="btn-container">
    <div>
      {#if isVillains && quote.sub}
        <LogoBtn
          id="tweet-quote"
          href={generateTwitterLink(quote.sub, quote.main)}
          src={twitter}
          alt="Twitter"
        />
        <LogoBtn
          id="share-quote"
          href={generateTumblrLink(quote.sub, quote.main)}
          src={tumblr}
          alt="Tumblr"
        />
      {:else}
        <ControlBtn
          id="previous-quote"
          onclick={onPreviousQuote}
          src={chevronLeft}
          alt="Previous Quote"
        />
        <ControlBtn
          id="next-quote"
          onclick={onNextQuote}
          src={chevronRight}
          alt="Next Quote"
        />
      {/if}
    </div>
    <ControlBtn
      id="randomize"
      onclick={onRandomQuote}
      src={dice}
      alt="Random"
    />
  </div>
</section>

<style>
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
  }

  #text,
  #main {
    font-size: var(--font-size-l);
    text-align: center;
  }

  #author {
    font-size: var(--font-size-m);
    font-weight: 300;
    margin-left: auto;
  }

  #sub {
    font-size: var(--font-size-s);
    text-align: justify;
    max-height: 200px;
    overflow-y: auto;
  }

  #btn-container {
    display: flex;
    justify-content: space-between;

    & > div {
      display: flex;
      gap: 10px;
    }
  }

  @media (max-width: 768px) {
    #quote-box {
      max-width: 500px;
      width: 100%;
    }
  }
</style>
