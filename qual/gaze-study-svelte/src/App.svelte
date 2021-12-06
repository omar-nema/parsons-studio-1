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
  import Intro from './components/Intro.svelte';

  //to check if page visited and remove intro modal
  import * as localforage from 'localforage';

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

  let visited = false;
  async function checkIfVisited(){
    visited = await localforage.getItem('visited');
  }
  checkIfVisited();
  $: {
    if (visited){
      $modalState = null;
    }
  }



  $: {
    if ($modalState){
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';     
    }
  }


</script>

{#if $modalState == 'intro'}
<Intro></Intro>
{/if}

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
 
  :global(body.gaze){
    background: linear-gradient( 180deg, rgb(240, 240, 240) 0%, rgba(0, 212, 255, 0.03) 100%);
  }
  :global(*){
    box-sizing: border-box;
  }

  :global(:root) {
    --bg-gradient: linear-gradient( 180deg, rgb(240, 240, 240) 0%, rgba(0,212,255,0.1) 100%);
    /* --bg-gradient-dark: linear-gradient( 180deg, rgba(63,223,255,0.3) 0%, rgba(63,223,255,0.2) 80%, rgba(240,240,240,1)  100%); */
    --bg-gradient-dark: linear-gradient( 180deg,rgb(0 212 255 / 15%) 0%, rgb(0 212 255 / 10%) 90%, rgb(240, 240, 240) 100%);
    --color-accent: #2196f3;
    --color-accent-faded: #2196f385;
    --color-gray-faded: #a0a0a0;
    --bg-contrast: #fbfbfb;
    --bg-contrast-darker: #f5f5f5;
    --bg-contrast-darkest: #c3cbcc;
    --content-width-pct: 90%;
    --content-width-max: 1300px;
    --font-size-md: 22px;
    --font-size-lg: 26px;
    --header-ht: 50px;
    --color-pos: #02bf86;
    --color-neg: #e9412b;
    --color-accent-sec: #7c7777;
    --box-shadow-med:  0 0 2px 2px rgba(0, 0, 0, 0.1);
    --box-shadow-light:  0 0 1px 1px rgba(0, 0, 0, 0.07); 
    --box-shadow-light-inverse:  0 -1px 3px 0px rgb(0 0 0 / 10%);    
    --font-size-filter: 14px;    
  }
  :global(body) {
    margin: 0;
    padding: 0;
    color: black;
    font-weight: 400;
    height: auto;
    background: var(--bg-gradient);
    background-repeat: no-repeat;
    background-attachment: fixed;
    transition: background 1s ease-in-out;
  }
  :global(.clickable) {
    cursor: pointer;
    transition: opacity 0.15s ease-in-out;
  }
  :global(.clickable:hover) {
    opacity: 0.85;
  }
  :global(h1) {
    font-size: 40px;
    font-weight: 400;
  }
  :global(html){
    height: 100%;
  }
  :global(h2){
    font-weight: 500;
    /* font-size: 20px; */
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
  :global(.card-outer){
  
    max-width: 1100px;
    width: 100%;
    background: var(--bg-contrast);
    padding: 30px 40px;
    margin: auto;
    margin-top: 70px;
    margin-bottom: 70px;
    border-radius: 10px;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);
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

  :global(::-webkit-scrollbar) {
  background: var(--bg-gradient);
 
}

:global(::-webkit-scrollbar-thumb) 
  {
  background: #88888826;
}



  :global(.container) {
    max-width: var(--content-width-max);
    width: var(--content-width-pct);
    margin: auto;
    position: relative;
  }
</style>
