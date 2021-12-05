<script>
  import { modalState } from '../stores/pageState';
  import { slide } from 'svelte/transition';
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
</script>

<main transition:fadeSlide={{ duration: 300 }}>
  <div
    class="btn-close clickable"
    on:click={() => {
      $modalState = null;
    }}
  >
    Skip Intro
  </div>
  <section class="introbg">
    <h1>How We Gaze</h1>
  </section>
  <section>
    <p>Imagine a piece of art that you love. How do you look at it?</p>
  </section>
  <section>
    <p>
      Do you study the work bit-by-bit? Or do admire it from a distance, and
      take in as a whole?
    </p>
  </section>
  <section>
    <p>How would someone else look at the same work?</p>
  </section>
  <section>
    <p>What might we learn about someone by seeing how they see?</p>
  </section>
  <section>
    <div
      class="btn"
      on:click={() => {
        $modalState = null;
      }}
    >
      <span> Enter Gallery</span>

      <span
        class="material-icons-round"
        style="font-size: 40px;margin-left: 10px"
      >
        auto_awesome
      </span>
    </div>
  </section>
</main>

<style>
  /* @keyframes bg-change {
    0% {
      background: lightblue;
    }

    50% {
      background: white;
    }
    0% {
      background: lightblue;
    }
  }
  .introbg {
    animation: bg-change 10s ease-in-out infinite;
  } */

  h1 {
    font-size: 100px;
    font-weight: 500;
    -webkit-text-fill-color: transparent;
    background: linear-gradient(
      180deg,
      rgb(255 255 255) 0%,
      rgb(172 240 255) 20%,
      rgb(146 231 249) 60%,
      rgb(255 255 255) 100%
    );
    -webkit-background-clip: text;
    filter: hue-rotate(41deg);
  }
  main {
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: linear-gradient(
        160deg,
        rgb(250 253 255) 0%,
        rgb(203 241 250) 50%,
        rgb(240, 240, 240) 100%
      )
      fixed;
    background-repeat: no-repeat;
    background-attachment: local;
  }
  section {
    width: 80%;
    max-width: 1000px;
    margin: auto;
    height: 90vh;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  p {
    font-size: 38px;
    font-weight: 400;
  }
  .btn {
    font-size: 48px;
    margin: auto;
    border-radius: 5px;
    box-shadow: 0 1px 15px 2px rgb(0 0 0 / 5%);
    background: rgba(255, 255, 255, 0.5);
    padding: 50px 0;
    width: 80%;
    border-radius: 20px;
    background: linear-gradient(
        172deg,
        rgb(194 244 255) 0%,
        rgb(194 244 255) 20%,
        rgb(255 255 255) 50%,
        rgb(194 244 255) 80%,
        rgb(194 244 255) 100%
      )
      fixed;
    color: var(--color-accent);
    transition: all 0.15s ease-in-out;
  }
  .btn:hover {
    filter: brightness(0.99);
    transform: scale(1.03);
  }
  .btn-close {
    position: fixed;
    top: 5%;
    right: 5%;
    color: var(--color-accent);
  }
</style>
