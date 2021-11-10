<script>
  import {
    gazerInitDone,
    gazerInitVideoDone,
    pageState,
  } from '../stores/pageState';
  import { hideGazerForLater } from '../utils/gazerUtils';
  import { slide, fade } from 'svelte/transition';
</script>

<header>
  <div class="header-content">
    <div class="header-left">
      <span>How We Gaze</span>
      <span class="divider">•</span>
      {#if $pageState == 'gallery'}
        <span class="header-sub accent" class:active={$pageState === 'gallery'}>
          Gallery</span
        >
      {:else}
        <span class="header-sub accent" class:active={$pageState === 'record'}>
          Gaze</span
        >
      {/if}
    </div>
    <div class="header-right">
      <div
        transition:fade
        class="btn clickable  btn-about"
        class:active={$pageState === 'gallery'}
      >
        About
      </div>
      <div
        transition:fade
        class="btn clickable"
        on:click={() => {
          if ($gazerInitDone && $gazerInitVideoDone) {
            hideGazerForLater();
          }
          pageState.set('gallery');
        }}
        class:active={$pageState === 'record'}
      >
        <span class="material-icons-round"> arrow_back </span>

        <span>Back to Gallery</span>
      </div>
    </div>
  </div>
</header>

<style>
  header {
    background: black;
    height: var(--header-ht);
    font-weight: 500;
  }
  .header-content {
    max-width: var(--content-width-max);
    width: var(--content-width-pct);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-right {
    display: flex;
  }
  .divider {
    color: var(--color-gray-faded);
  }
  .header-sub {
    color: var(--color-accent-sec);
  }
  .header-sub.active {
    opacity: 1;
  }
  .divider {
    margin: 0 10px;
  }
  .btn {
    margin-left: 25px;
    color: var(--color-gray-faded);
    transition: color 0.3s linear;
    display: none;
    justify-content: center;
    align-items: center;
  }

  .btn-about {
    border-radius: 0;
    padding: 5px 10px;
    background: #393737;
  }
  .btn.active {
    color: var(--color-accent);
    display: flex;
  }
  .material-icons-round {
    font-size: 16px;
    margin-right: 5px;
  }
</style>
