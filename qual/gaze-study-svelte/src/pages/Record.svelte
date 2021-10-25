<script>
  import { pageState, selectedImage,  gazerInit, gazerInitVideoDone, calibrationPct, calibrationCutoff} from '../stores/pageState';
  import { slide, fade } from 'svelte/transition';
  import Overview from '../components/RecordOverview.svelte';
  import CalibrateVid from '../components/RecordCalibrateVid.svelte';
  import CalibrateExercise from '../components/RecordCalibrateExercise.svelte';
  import CalibrateInstructions from '../components/RecordCalibrateInstructions.svelte';
  import CalibrateResults from '../components/RecordCalibrateResults.svelte';
  import CalibrateView from '../components/RecordView.svelte';
  import { afterUpdate } from 'svelte';
  import {gazerInitialize, gazerMoveVideo, gazerInitVideo, gazerRestartCalibration} from '../utils/gazerUtils.js';
  let stateIndex = 0;
  let gazerReady, mount; //webgazer library loaded
  let disableBack = false, disableNext = false;
  
  let sections = [
    {
      sectionName: 'overview',
      videoShown: false,
      btnLabel: 'Start!',
      disableBack: true,
    },
    {
      sectionName: 'calibrate-vid',
      videoShown: true,
      videoPos: 'middle',
        disableBack: false,
        disableNext: true,
      btnBackLabel: 'Back to Overview',
      btnLabel: 'Got It - Face is Aligned',
    },
    {
      sectionName: 'calibrate-instructions',
      videoShown: true,
      videoPos: 'top',
      btnBackLabel: 'Back to Video Alignment',      
      btnLabel: 'Got It - Proceed',
    },
    {
      sectionName: 'calibrate-exercise',
      videoShown: true,
      videoPos: 'top',
      disableNext: true,
      btnBackLabel: 'Restart Eye Calibration',            
      btnLabel: 'Proceed to View Art',
      gazerRecording: true,
    },
    { sectionName: 'view', videoShown: false, btnLabel: 'Proceed', disableNext: true, btnBackLabel: 'Back to Calibration' },
    { sectionName: 'results', videoShown: false, btnLabel: 'View Pattern', disableNext: true, btnBackLabel: 'Back to Calibration'  },
  ];

  afterUpdate(() => {mount = true;});

  function backClick(){
      if (sections[stateIndex] == 'calibrate-exercise'){
        gazerRestartCalibration();
      }
      stateIndex--;
  }

  $: {
    if (mount && gazerReady) {
        gazerInitialize();
    }
  }

  //anytime page substate changes 
  let gazeActive, gazeRecording;
  $: {
    let currSection = sections[stateIndex];
    if (mount && gazerReady) {
        if (currSection.videoShown == true) {
          webgazer.showVideo(true);
          gazerMoveVideo(currSection.videoPos);
        } else {
          webgazer.showVideo(false);
        }
        if (currSection.disableBack){
            disableBack = true;
        } else {
            disableBack = false;
        }

        if (currSection.disableNext){
            disableNext = true;
        } else {
            disableNext = false;
        }        
    }
  }

  //detect if going back

  $: {
      if ($gazerInitVideoDone ){
          disableNext = false;
      }
  }
  $: {
    if ($calibrationPct > $calibrationCutoff ){
          disableNext = false;
      }  
  }

 


</script>

<svelte:head>
  <script on:load={() => {gazerReady = true} }  src="/public/assets/webgazer.min.js" ></script>
</svelte:head>

<header>
    <h1>Share Your Gaze</h1>
    <h3 class="clickable">Back to Gallery</h3>
</header>


<section class="experiment-container">
  <div class="container-header">
    <div class="current-selection">
      <!-- Selected Work:<span class="selection-holder">{$selectedImage.label}</span> -->
    </div>
    <div class="nav-ind">
      {#each sections as section}
        <div class="nav-dot" class:active={sections[stateIndex] === section} />
      {/each}
    </div>
  </div>
  <div class="container-body">
    {#if sections[stateIndex].sectionName == 'overview'}
      <Overview />
    {:else if sections[stateIndex].sectionName == 'calibrate-vid'}
      <CalibrateVid  />
    {:else if sections[stateIndex].sectionName == 'calibrate-instructions'}
      <CalibrateInstructions />
    {:else if sections[stateIndex].sectionName == 'calibrate-exercise'}
      <CalibrateExercise />
    {:else if sections[stateIndex].sectionName == 'view'}
      <CalibrateView />
    {:else if sections[stateIndex].sectionName == 'results'}
      <CalibrateResults />
    {/if}
  </div>
  <div class="container-footer">
    <div class="btn-prev btn disabled" 
    class:accent={$calibrationPct && $calibrationPct < 70}
    class:disabled={disableBack == true} on:click={backClick}>
        {sections[stateIndex].btnBackLabel}
    </div>
    <div
      on:click={() => stateIndex++}
      class="btn-next btn accent clickable"
      class:disabled={disableNext == true}
      class:glow={$gazerInit == false}
    >
        {#if !$gazerInit}
        Loading...
        {:else}
        {sections[stateIndex].btnLabel}
        {/if}
 
    </div>
  </div>
</section>

<style>
    header {
        justify-content: space-between;
    }
    h3 {
        text-decoration: none;

    }
  .experiment-container {
    background: var(--bg-contrast);
    width: 100%;
  }
  .container-header,
  .container-footer,
  .container-body {
    padding: 0 30px;
  }
  .container-body {
    height: calc(100vh - 3 * var(--header-ht) - 150px);
    padding: 0 30px;
    font-size: 18px;
    position: relative;
  }
  .container-header,
  .container-footer {
    width: 100%;
    height: var(--header-ht);
    background: var(--bg-contrast-darker);
  }
  .nav-ind {
    display: flex;
  }
  .container-header,
  .container-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .selection-holder {
    background: var(--bg-contrast);
    padding: 5px 10px;
    margin-left: 10px;
    width: 150px;
    display: inline-flex;
  }
  #vid-holder {
    position: relative;
  }
  .nav-dot {
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background: var(--bg-contrast);
    margin-right: 8px;
    transition: all 0.3s ease-in-out;
  }
  .nav-dot.active {
    background: var(--color-accent);
  }
 
  .btn-next.glow {
    animation: glowing 5000ms infinite;
    pointer-events: none;
  }
  .btn-prev.disabled {
    opacity: 0;
    pointer-events: none;
  }
  .btn-next.disabled {
      opacity: 0.2;
      pointer-events: none;      
  }

  @keyframes glowing {
    0% {
      background-color: var(--color-accent);
      opacity: 0.5;
    }
    50% {
      background-color: var(--bg-contrast-dark);
      opacity: 0.5;
    }
    100% {
      background-color: var(--color-accent);
      opacity: 0.5;
    }
  }
</style>
