<script>
  import {
    gazerInitDone,
    gazerInitVideoDone,
    pageState,
    modalState,
    cardInView,
  } from '../stores/pageState';
  import { loadedWorksKeys } from '../stores/artworkMetadata';
  import { hideGazerForLater } from '../utils/gazerUtils';
  import { slide, fade } from 'svelte/transition';
  import jump from '../utils/jumpSection';

  function jumpSection(diff) {
    let newSectionIndex = $loadedWorksKeys.indexOf($cardInView) + diff;
    jump(`${$loadedWorksKeys[newSectionIndex]}`);
  }
</script>

<header>
  <div class="header-content">
    <div class="header-left">
      <span>How We Gaze</span>
      <span class="divider">-</span>
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
      {#if $pageState == 'gallery'}
        <nav>
          <div>
            <span
              class="material-icons-round"
              on:click={() => {
                jumpSection(-1);
              }}
            >
              navigate_before
            </span>
          </div>
          <div>
            <span
              class="material-icons-round"
              on:click={() => {
                jumpSection(1);
              }}
            >
              navigate_next
            </span>
          </div>
          <div
            on:click={() => {
              modalState.set('nav');
            }}
          >
            <span class="material-icons-round"> view_module </span>
          </div>
        </nav>
        <div transition:fade class="btn clickable active btn-about">About</div>
      {/if}
      <div
        transition:slide={{ duration: 500 }}
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
    height: var(--header-ht);
    font-weight: 500;
    backdrop-filter: blur(5px);
    z-index: 1;
    background-color: none;
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
  }
  .btn.active {
    color: var(--color-accent);
    display: flex;
  }
  .material-icons-round {
    font-size: 16px;
    margin-right: 5px;
  }

  nav {
    display: flex;
    align-items: center;
  }
  nav .material-icons-round {
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3px;
    color: var(--color-accent);
    font-weight: 400;
  }
  nav div {
    cursor: pointer;

    display: flex;
    align-items: center;

    margin: 0 5px;
    justify-content: center;
  }

  nav div,
  .btn-about {
    background: #ffffff8f;
    border-radius: 5px;
    transition: background 0.15s ease-in-out;
  }

  nav div:hover,
  .btn-about:hover {
    background: white;
  }
</style>
