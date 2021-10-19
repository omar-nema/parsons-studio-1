<script>
  import { getItem } from './stores/firebasedb';

  import Gallery from './pages/Gallery.svelte';
  import Header from './components/Header.svelte';

  import { pageState } from './stores/pageState';

  //   async function t() {
  //     let t = await getItem('trackingRuns/anonymous-user-1');
  //     console.log(t);
  //   }
  //   t();
</script>

<main>
  <Header />
  <div class="container">
    {#if $pageState == 'gallery'}
      <Gallery />
    {/if}
  </div>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');

  :global(*) {
    box-sizing: border-box;
    font-family: 'Lora';
  }
  :global(body) {
    background: #423f3f;
    margin: 0;
    padding: 0;
    color: #efefef;
  }
  :global(:root) {
    --color-accent: #cfd494;
    --color-gray-faded: #a0a0a0;
    --bg-contrast: #585656;
    --content-width-pct: 88%;
    --content-width-max: 1200px;
    --font-size-md: 22px;
    --font-size-lg: 26px;
    --header-ht: 50px;
  }
  :global(h1) {
    font-size: 32px;
    font-weight: 400;
    color: var(--color-accent);
  }
  :global(.font-lg) {
    font-size: 22px;
  }

  .accent {
    color: var(--color-accent);
  }
  .container {
    max-width: var(--content-width-max);
    width: var(--content-width-pct);
    margin: auto;
  }
</style>
