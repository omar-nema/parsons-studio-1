<script>
  import {
    gazerInitDone,
    gazerInitVideoDone,
    pageState,
    modalState,
    cardInView,
    screenWidth,
    scrollThresh,
  } from '../stores/pageState';
  import { loadedWorksKeys } from '../stores/artworkMetadata';
  import { hideGazerForLater } from '../utils/gazerUtils';
  import { slide, fade } from 'svelte/transition';
  import jump from '../utils/jumpSection';

  function jumpSection(diff) {
    let newSectionIndex = $loadedWorksKeys.indexOf($cardInView) + diff;
    jump(`${$loadedWorksKeys[newSectionIndex]}`);
  }

  let headerHover = false;
</script>

<header
  on:mouseover={() => {
    headerHover = true;
  }}
  on:mouseleave={() => {
    headerHover = false;
  }}
>
  <div class="header-wrapper" class:hide={$scrollThresh && !headerHover}>
    <div class="header-content">
      <div class="header-left">
        <span>How We Gaze</span>
        <span class="divider">-</span>
        {#if $pageState == 'gallery'}
          <span
            class="header-sub accent"
            class:active={$pageState === 'gallery'}
          >
            Gallery</span
          >
        {:else}
          <span
            class="header-sub accent"
            class:active={$pageState === 'record'}
          >
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
                keyboard_arrow_up
              </span>
            </div>
            <div>
              <span
                class="material-icons-round"
                on:click={() => {
                  jumpSection(1);
                }}
              >
                keyboard_arrow_down
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
          {#if $screenWidth > 950}
            <div
              transition:fade
              class="btn clickable active btn-about"
              on:click={() => {
                $modalState = 'intro';
              }}
            >
              About
            </div>
          {/if}
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
  </div>
</header>

<style>
  header {
    height: var(--header-ht);
    font-weight: 500;
    z-index: 1;
  }
  .header-wrapper {
    backdrop-filter: blur(5px);
    background-color: none;
    transition: all 0.15s linear;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 100%;
  }
  .header-wrapper.hide {
    transform: translateY(-60px);
  }
  header:hover {
    opacity: 1;
  }

  .header-content {
    max-width: var(--content-width-max);
    width: var(--content-width-pct);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.3s ease-in-out;
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
    font-size: 20px;
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
