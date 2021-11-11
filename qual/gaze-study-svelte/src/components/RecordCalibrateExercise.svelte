<script>
  import {
    gazerRecordingTraining,
    calibrationPct,
    calibrationCutoff,
  } from '../stores/pageState';
  import {
    gazerPauseTraining,
    gazerCalibrationRecording,
    gazerTrain,
  } from '../utils/gazerUtils';

  let calibrationMode = 'dots';
  gazerTrain();

  let calibrationPoints = [
    { top: '10%', right: '4%', numClicks: 0 },
    { top: '50%', right: '4%', numClicks: 0 },
    { top: '90%', right: '4%', numClicks: 0 },
    { top: '10%', right: '96%', numClicks: 0 },
    { top: '50%', right: '96%', numClicks: 0 },
    { top: '90%', right: '96%', numClicks: 0 },
    { top: '10%', right: '50%', numClicks: 0 },
    { top: '50%', right: '50%', numClicks: 0 },
    { top: '90%', right: '50%', numClicks: 0 },
  ];

  let maxClicks = 4;
  function calibrateClick(e) {
    let numClicks = parseInt(this.getAttribute('numclicks')) + 1;
    this.setAttribute('numclicks', numClicks);
    this.style.opacity = 1 - numClicks * (1 / maxClicks);
    if (numClicks == maxClicks) {
      if (checkDotsClicked()) {
        calibrationMode = 'stare';
      }
    }
  }
  function checkDotsClicked() {
    let pts = document.querySelectorAll('.calibration-pt');
    let fullyClicked = true;
    pts.forEach((d) => {
      if (parseInt(d.getAttribute('numclicks')) < maxClicks) {
        fullyClicked = false;
      }
    });
    return fullyClicked;
  }
  let initStare;
  $: {
    if (calibrationMode == 'stare') {
      gazerPauseTraining();
    }
    if ($calibrationPct) {
      calibrationMode = 'done';
    }
  }

  $: {
    $calibrationPct;
  }
</script>

<h3>Calibrate: Exercise</h3>

{#if calibrationMode == 'dots'}
  {#each calibrationPoints as pt}
    <div
      class="calibration-pt"
      style="top:{pt.top}; right:{pt.right}"
      numclicks="0"
      on:click={calibrateClick}
    />
  {/each}
{:else if calibrationMode == 'stare'}
  <p>
    Great work! Now stare at the dot at the center of the screen for 5 seconds
    so we can calculate your accuracy rate!
  </p>
  <div
    class="clickable btn btn-stare accent"
    class:disabled={initStare}
    on:click={() => {
      initStare = true;
      gazerCalibrationRecording();
    }}
  >
    Start staring!
  </div>
  <div class="center-dot" />
{:else if calibrationMode == 'done'}
  {#if $calibrationPct > $calibrationCutoff}
    <p style="color: var(--color-pos)">
      Your calculated accuracy is <strong>{$calibrationPct}%</strong>!
    </p>
    <p>
      This means that the eye tracker can detect your eye movements with a
      margin of error of {100 - $calibrationPct}% of the size of the container
      that holds this text.
    </p>
    <p>
      Not perfect, but good enough to deduce patterns in how you look at art!
      Lastly, please look at the selected piece of artwork (full-screen) for 20
      seconds, and we’ll generate a custom visual summarizing how you viewed the
      painting.
    </p>
  {:else}
    <p style="color: var(--color-neg)">
      Your calculated accuracy is <strong>{$calibrationPct}%</strong>.
    </p>
    <p>
      Unfortunately we require an accuracy rate of {$calibrationCutoff}% or
      higher to proceed! Please re-do your calibration, or exit to gallery.
    </p>
  {/if}
{/if}

<style>
  .center-dot {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    background: var(--color-accent);
    transform: translate(-50%, -50%);
    width: 25px;
    height: 25px;
    border: 0.5px solid black;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  }

  .btn-stare {
    width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    position: absolute;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
    opacity: 0.8;
  }
  .btn-stare:hover {
    opacity: 0.5;
  }
  .disabled,
  .btn-stare.disabled {
    opacity: 0;
    pointer-events: none;
  }
  .calibration-pt {
    background: #ea515a;
    border-radius: 100%;
    border: 1px solid #4c4c4c;
    height: 20px;
    width: 20px;
    position: absolute;
    cursor: pointer;
    box-shadow: 0 0px 1px 2px rgba(0, 0, 0, 0.1);
    transition: opacity 0.1s linear;
    z-index: 1000;
  }
  p {
    width: 80%;
  }
</style>
