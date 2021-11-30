<script>
  //stores
  import { pageState, screenWidth, screenHeight, gazerReady, modalState } from './stores/pageState';
  import screenSize from './utils/screenSize';

  //svelte
  import { onMount } from 'svelte';
  import { crossfade , fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  //internal components
  import Gallery from './pages/Gallery.svelte';
  import Header from './components/Header.svelte';
  import Patterns from './pages/Patterns.svelte';
  import Record from './pages/Record.svelte';
  import ModalNav from './components/ModalNav.svelte'

  function updateScreenSize() {
    screenWidth.set(screenSize().windowW);
    screenHeight.set(screenSize().windowH);
  }

  const [send, receive] = crossfade({
		duration:1500,
		easing: quintOut
	});

  onMount(() => {
    updateScreenSize();
  });

  window.onresize = function () {
    updateScreenSize();
  };


</script>


<main>
  <Header />
  <div class="container">
    {#if $modalState == 'nav'}
      <ModalNav></ModalNav>
    {/if}
    {#if $pageState == 'gallery'}
    <div transition:fade style="height: auto; width: auto">
      <Gallery />
    </div>
    {:else if $pageState == 'record'}
    <div  transition:fade style="height: auto; width: auto">
      <Record />
    </div>
    {/if}
  </div>
</main>

<svelte:head>
  <title>How We Gaze</title>
	<html lang="en" />  
  <script on:load={() => {gazerReady.set(true)} }  src="./assets/webgazer.min.js" ></script>
</svelte:head>

<style>
  /* @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap'); */
  /* @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500&display=swap'); */
  /* @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap');
   */
  
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&display=swap');

  :global(*) {
    box-sizing: border-box;
    font-family: 'Lora';
  }
  :global(body) {
    /* background: #272729; */
    /* background: #e1e1e1; */
    margin: 0;
    padding: 0;
    /* color: #efefef; */
    color: black;
    font-weight: 400;
    height: auto;
    background:linear-gradient( 180deg, rgb(240, 240, 240) 0%, rgba(0,212,255,0.1) 100%);
    background-repeat: no-repeat;
    background-attachment: fixed;
    transition: background 1s ease-in-out;
  }
  :global(body.gaze){
    background: linear-gradient( 180deg, rgb(240, 240, 240) 0%, rgba(0, 212, 255, 0.03) 100%);
  }
  :global(:root) {
    /* --color-accent: #cfd494; */
    --color-accent: #2196f3;
    --color-accent-faded: #2196f385;
    --color-gray-faded: #a0a0a0;
    /* --bg-contrast: #585656; */
    --bg-contrast: #fbfbfb;
    /* --bg-contrast-darker: #4b4747; */
    --bg-contrast-darker: #f5f5f5;
    /* --bg-contrast-darkest: #232020; */
    --bg-contrast-darkest: #c3cbcc;
    --content-width-pct: 92%;
    --content-width-max: 1300px;
    --font-size-md: 22px;
    --font-size-lg: 26px;
    --header-ht: 50px;
    --color-pos: #02bf86;
    --color-neg: #e9412b;
    /* --color-accent-sec: lightgray; */
    --color-accent-sec: #7c7777;
    --box-shadow-med:  0 0 2px 2px rgba(0, 0, 0, 0.1);
    --box-shadow-light:  0 0 1px 1px rgba(0, 0, 0, 0.07); 
  
    --box-shadow-light-inverse:  0 -1px 3px 0px rgb(0 0 0 / 10%);        
  }
  :global(.clickable) {
    cursor: pointer;
    transition: opacity 0.15s ease-in-out;
  }
  :global(.clickable:hover) {
    opacity: 0.85;
  }
  :global(h1) {
    font-size: 44px;
    font-weight: 400;

  }
  :global(h2){
    font-weight: 500;
  }
  :global(h3) {
    font-weight: 600;
    text-decoration: underline;
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
    background: var(--color-accent);
    color: white;
    box-shadow: var(--box-shadow-light);
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

  :global(.container) {
    max-width: var(--content-width-max);
    width: var(--content-width-pct);
    margin: auto;
    position: relative;
  }
</style>
