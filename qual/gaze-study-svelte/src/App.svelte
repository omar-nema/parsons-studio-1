<script>
  //stores
  import { pageState, screenWidth, screenHeight } from './stores/pageState';
  import screenSize from './utils/screenSize';

  //svelte
  import { onMount } from 'svelte';

  //internal components
  import Gallery from './pages/Gallery.svelte';
  import Header from './components/Header.svelte';
  import Patterns from './pages/Patterns.svelte';
  import Record from './pages/Record.svelte';

  function updateScreenSize() {
    screenWidth.set(screenSize().windowW);
    screenHeight.set(screenSize().windowH);
  }

  onMount(() => {
    updateScreenSize;
  });

  window.onresize = function () {
    updateScreenSize();
  };
</script>

<main>
  <Header />
  <div class="container">
    {#if $pageState == 'gallery'}
      <Gallery />
    {:else if $pageState == 'patterns'}
      <Patterns />
    {:else if $pageState == 'record'}
      <Record />
    {/if}
  </div>
</main>

<style>
  /* @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap'); */

  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');

  :global(*) {
    box-sizing: border-box;
    font-family: 'DM Sans';
  }
  :global(body) {
    background: #423f3f;
    margin: 0;
    padding: 0;
    color: #efefef;
    font-weight: 400;
  }
  :global(:root) {
    --color-accent: #cfd494;
    --color-gray-faded: #a0a0a0;
    --bg-contrast: #585656;
    --bg-contrast-darker: #4b4747;
    --bg-contrast-darkest: #232020;
    --content-width-pct: 92%;
    --content-width-max: 1300px;
    --font-size-md: 22px;
    --font-size-lg: 26px;
    --header-ht: 50px;
    --color-pos: #5df4c7;
    --color-neg: #ff8f80;
  }
  :global(.clickable) {
    cursor: pointer;
    transition: opacity 0.15s ease-in-out;
  }
  :global(.clickable:hover) {
    opacity: 0.85;
  }
  :global(h1) {
    font-size: 32px;
    font-weight: 400;
    color: var(--color-accent);
  }
  :global(h3) {
    font-weight: 400;
    text-decoration: underline;
    color: white;
    text-decoration-color: var(--color-accent);
  }
  :global(.font-lg) {
    font-size: 18px;
  }
  :global(.btn) {
    cursor: pointer;
    font-weight: 500;
    text-align: center;
    padding: 7px 12px;
    border-radius: 5px;
    transition: opacity 0.2s ease-in-out;
  }

  :global(.disabled-part) {
    opacity: 0.2;
  }

  :global(.btn.accent) {
    background: #eef2b4;
    color: black;
  }
  :global(header) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
  }

  :global(.btn:hover) {
    transition: opacity 0.3s ease-in-out;
  }

  :global(img) {
    max-width: 100%;
  }

  .container {
    max-width: var(--content-width-max);
    width: var(--content-width-pct);
    margin: auto;
  }
</style>
