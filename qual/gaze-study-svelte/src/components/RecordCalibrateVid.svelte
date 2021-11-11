<script>
  import { gazerInitVideo, gazerResume } from '../utils/gazerUtils';
  import { onMount } from 'svelte';
  import {
    gazerInitDone,
    calibrationPct,
    gazerInitVideoDone,
  } from '../stores/pageState';

  export let calibrated;

  $: {
    if ($gazerInitDone) {
      if (!$gazerInitVideoDone) {
        setTimeout(() => {
          gazerInitVideo();
        }, 200);
      } else {
        gazerResume();
      }
    }
  }
</script>

{#if calibrated == true}
  <h3>Existing Calibration Loaded</h3>
  <p class="inst">
    Your webcam was already calibrated with an accuracy rate of <strong
      >{$calibrationPct}%</strong
    >. Please ensure your face is centered below, then click to proceed and view
    art!
  </p>
{:else if calibrated == false}
  <h3>Calibrate: Video</h3>
  <p class="inst">
    We’ll need to first calibrate your webcam in order to proceed. Ensure that
    your are in a well-lit environment, and that your face is in the green
    section of the screen below.
  </p>
{/if}

{#if !$gazerInitVideoDone}
  <div class="video-wrapper glow">
    <p>Initializing Video Stream...</p>
  </div>
{/if}

<style>
  @keyframes glowing {
    0% {
      background-color: var(--bg-contrast-dark);
      opacity: 0.5;
    }
    50% {
      background-color: var(--bg-contrast-dark);
      opacity: 0;
    }
    100% {
      background-color: var(--bg-contrast-dark);
      opacity: 0.5;
    }
  }
  .glow {
    animation: glowing 5000ms infinite;
    pointer-events: none;
  }
  .video-wrapper {
    position: absolute;
    width: 500px;
    height: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #585656ad;
    pointer-events: none;
    z-index: 1;
  }
</style>
