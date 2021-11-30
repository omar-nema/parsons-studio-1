<script>
  import { slide } from 'svelte/transition';
  import { modalState } from '../stores/pageState';
  import { loadedWorksKeys, loadedWorksArray } from '../stores/artworkMetadata';
  import jump from '../utils/jumpSection';

  function fadeSlide(node, options) {
    const slideTrans = slide(node, options);
    return {
      duration: options.duration,
      css: (t) => `
				${slideTrans.css(t)}
				opacity: ${t};
			`,
    };
  }

  function jumpSection(artwork) {
    jump(`${artwork.key}`);
    modalState.set(null);
  }
</script>

<div class="modal" transition:fadeSlide={{ duration: 150 }}>
  <div class="container">
    <div class="cont-header">
      <h1>Navigate Artworks</h1>
      <div
        class="btn clickable"
        on:click={() => {
          modalState.set(null);
        }}
      >
        <span class="material-icons-round"> close </span>
      </div>
    </div>

    <div class="artwork-container">
      {#each $loadedWorksArray as artwork}
        <div
          class="artwork-holder clickable"
          on:click={() => {
            jumpSection(artwork);
          }}
        >
          <div class="img-holder">
            <img src={artwork.url} />
          </div>
          <div class="txt-holder">
            <p><strong>{artwork.title}</strong></p>
            <p>{artwork.artist}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .container {
    padding-top: 2%;
    width: 80%;
  }
  .modal {
    width: 100%;
    height: 100%;
    position: fixed;
    /* top: var(--header-ht); */
    top: 0;
    left: 0;
    background: var(--bg-gradient);
    z-index: 100;
    backdrop-filter: blur(15px);
    overflow: auto;
  }

  .cont-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
  }
  .btn {
    /* background: #ffffff75; */
    border-radius: 5px;
    transition: background 0.15s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
  }
  .material-icons-round {
    font-size: 40px;
    color: black;
  }

  .artwork-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 150px;
  }
  .artwork-holder {
    display: flex;
    flex-direction: column;
  }
  .img-holder {
    width: 315px;
    height: 315px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: var(--box-shadow-light);
  }
  .txt-holder {
    margin-top: 15px;
  }
  p {
    text-align: center;
    margin: 3px 0;
  }
</style>
