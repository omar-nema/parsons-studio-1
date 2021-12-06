<script>
  import { gazerShowCalDot } from '../utils/gazerUtils';
  
  export let infoTipIndex;
  export let helperTextPositions;

  let hintTextArray = [
    "We’re currently visualizing a single gaze. Use the controls below to switch between different viewers' gazes.",
    'Filter between different views above. The ‘animate’ option allows you to play black a viewing session, while ‘aggregate’ shows a single static summary. And lastly, ‘original’ shows the original image, sans gaze.',
    'Are you curious to see what your own gaze would look like? Contribute to the gallery and add your own gaze!',
  ];
</script>

<div
  class="hint-holder"
  style="top: {helperTextPositions[
    infoTipIndex
  ][1]}px; left: {helperTextPositions[infoTipIndex][0]}px"
>
  <div class="text-upper">
    <p>{hintTextArray[infoTipIndex]}</p>
  </div>
  <nav>
    <div
      class="clickable"
      class:disabled={infoTipIndex == 0}
      on:click={() => {
        infoTipIndex--;
      }}
    >
      <span class="material-icons-round">navigate_before</span>
      <span>Prev</span>
    </div>
    <div>
      Tip {infoTipIndex + 1} of {hintTextArray.length}
    </div>

    {#if infoTipIndex < hintTextArray.length - 1}
      <div
        class="clickable"
        on:click={() => {
          infoTipIndex++;
        }}
      >
        <span>Next</span>
        <span class="material-icons-round">navigate_next</span>
      </div>
    {:else}
      <div
        class="clickable"
        on:click={() => {
          infoTipIndex = -1;
        }}
      >
        <span>Close</span>
      </div>
    {/if}
  </nav>
</div>

<style>
  .hint-holder {
    position: absolute;
    box-shadow: var(--box-shadow-light);
    background: #000000c4;
    backdrop-filter: blur(5px);
    color: white;
    border-radius: 5px;
    z-index: 100;
    transition: all 0.1s ease-in-out;
    max-width: 400px;
    font-size: 14px;
    overflow: hidden;
  }
  nav,
  .text-upper {
    padding: 10px 20px;
  }
  nav {
    display: flex;
    justify-content: space-between;
    background: #00000059;
  }
  nav .clickable {
    display: flex;
    align-items: center;
  }
  .material-icons-round {
    font-size: 12px;
  }
  .disabled {
    pointer-events: none;
    opacity: 0.3;
  }
</style>
