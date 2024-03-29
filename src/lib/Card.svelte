<script lang="ts">
  import LogoBtn from "./LogoBtn.svelte";
  import Twitter from "../assets/icons/x-twitter.svg";
  import Tumblr from "../assets/icons/tumblr.svg";
  import { onMount } from "svelte";

  const colors = [
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
  ];

  let text: string = "Fetching quote...";
  let author: string = "";

  function getNewQuote() {
    fetch("https://quote-api-u0ka.onrender.com/api/quote/villain")
      .then((res) => res.json())
      .then((data) => {
        text = `"${data.quote}"`;
        author = `- ${data.name}`;

        changeColor();
      })
      .catch((err) => {
        console.error(err);
        text = "404: Cannot fetch quote :(";
        author = "";
      });
  }

  function changeColor() {
    document.documentElement.style.setProperty(
      "--current-color",
      colors[Math.floor(Math.random() * colors.length)]
    );
  }

  function generateTwitterLink(text: string, author: string): string {
    return `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(
      `${text} ${author}`
    )}`;
  }

  function generateTumblrLink(text: string, author: string): string {
    return `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(
      author.slice(2)
    )}&content=${encodeURIComponent(
      text.slice(1, -1) 
    )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
  }

  onMount(() => {
    getNewQuote();
  });
</script>

<div id="quote-box">
  <blockquote>
    <p id="text">{text}</p>
    <span id="author">{author}</span>
  </blockquote>
  <div id="btn-container">
    <div>
      <LogoBtn
        id="tweet-quote"
        icon={Twitter}
        href={generateTwitterLink(text, author)}
        alt="Twitter"
      />
      <LogoBtn
        id="share-quote"
        icon={Tumblr}
        href={generateTumblrLink(text, author)}
        alt="Tumblr"
      />
    </div>
    <button id="new-quote" on:click={getNewQuote}>New Quote</button>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap");

  :global(:root) {
    --current-color: black;
    --transition-prop: all 1s;
    --transition-duration: 1s;
  }

  #quote-box {
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    border-radius: 3px;
    background: white;
  }

  blockquote {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  p {
    font-family: "Rubik", sans-serif;
    font-size: 2.5rem;
    color: var(--current-color);
    text-align: center;
    transition: color var(--transition-duration);
  }

  span {
    font-family: "Rubik", sans-serif;
    font-size: 2rem;
    font-weight: 300;
    color: var(--current-color);
    margin-left: auto;
    transition: color var(--transition-duration);
  }

  #btn-container {
    display: flex;
    justify-content: space-between;
  }

  #btn-container > div {
    display: flex;
    gap: 10px;
  }

  #new-quote {
    color: white;
    border: none;
    cursor: pointer;
    padding-inline: 12px;
    font-size: 1.5rem;
    white-space: nowrap;
    margin-left: 10px;
  }

  @media (max-width: 500px) {
    #quote-box {
      width: 100%;
      padding: 20px;
    }
  }
</style>
