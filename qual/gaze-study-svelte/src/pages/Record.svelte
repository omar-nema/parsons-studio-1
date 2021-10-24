<script>
  import { pageState, selectedImage, calibrationState, gazerInit} from '../stores/pageState';
  import { slide, fade } from 'svelte/transition';
  import Overview from '../components/RecordOverview.svelte';
  import CalibrateVid from '../components/RecordCalibrateVid.svelte';
  import CalibrateExercise from '../components/RecordCalibrateExercise.svelte';
  import CalibrateInstructions from '../components/RecordCalibrateInstructions.svelte';
  import CalibrateResults from '../components/RecordCalibrateResults.svelte';
  import CalibrateView from '../components/RecordView.svelte';
  import { afterUpdate } from 'svelte';
  import {checkGazerLoad, moveGazerVideo} from '../utils/gazerUtils.js';

  let stateIndex = 0;
  let gazerReady, mount; //webgazer library loaded
  
  let videoInit = false; //webgazer video component fully loaded
  

  let sections = [
    {
      sectionName: 'overview',
      videoShown: false,
      btnLabel: 'Start!',
      gazerActive: false,
    },
    {
      sectionName: 'calibrate-vid',
      videoShown: true,
      videoPos: 'middle',
      btnLabel: 'Got It - Face is Aligned',
      gazerActive: true,
      gazerRecording: false,
    },
    {
      sectionName: 'calibrate-instructions',
      videoShown: true,
      videoPos: 'top',
      btnLabel: 'Got It - Proceed',
      gazerActive: true,
      gazerRecording: false,
    },
    {
      sectionName: 'calibrate-exercise',
      videoShown: true,
      videoPos: 'top',
      btnLabel: 'Proceed to View Art',
      gazerActive: true,
      gazerRecording: true,
    },
    { sectionName: 'view', videoShown: false, btnLabel: '' },
    { sectionName: 'results', videoShown: false, btnLabel: '' },
  ];


  afterUpdate(() => {
    mount = true;
  });



  $: {
    if (mount && gazerReady) {
      webgazer.showVideo(false);
      webgazer.begin();
      checkGazerLoad();
    }
  }

  //anytime page substate changes 
  $: {
    let currSection = sections[stateIndex];
    gazeActive = currSection.gazerActive;
    gazeRecording = currSection.gazerRecording;
    if (mount) {
      let btnNext = document.querySelector('.btn-next'),
        btnPrev = document.querySelector('.btn-prev');
      if (stateIndex == 0) {
        btnPrev.classList.add('disabled');
      } else {
        btnPrev.classList.remove('disabled');
      }
      if (gazerReady) {
        if (currSection.videoShown == true) {
          webgazer.showVideo(true);
          moveGazerVideo(currSection.videoPos);
        } else {
          webgazer.showVideo(false);
        }
      }
      if ($gazerInit) {
        btnNext.innerText = currSection.btnLabel;
      }
    }
  }


  //abstraction layer of reactivity here
  //affects whether video is shown/removed
  let gazeActive, gazeRecording;
  $: {
    if (gazeActive) {
      async function initGaze() {
        let test = await webgazer.resume();
        webgazer.removeMouseEventListeners();
        videoInit = true;
      }
      setTimeout(() => {
        initGaze();
      }, 100);

      document.querySelector('#webgazerGazeDot').style.opacity = 0;
    }
    if (gazeRecording) {
      webgazer.addMouseEventListeners();
      document.querySelector('#webgazerGazeDot').style.opacity = 1;
    }
  }


  let disableNext = true;
</script>

<svelte:head>
  <script src="/assets/webgazer.min.js" on:load={()=> {gazerReady = true}}></script>
</svelte:head>

<h1>Share Your Gaze</h1>

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
      <CalibrateVid {videoInit} />
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
    <div class="btn-prev disabled clickable" on:click={() => stateIndex--}>
      Back
    </div>
    <div
      on:click={() => stateIndex++}
      class="btn-next clickable"
      class:disabled={disableNext == true}
      class:glow={$gazerInit == false}
    >
      Loading...
    </div>
  </div>
</section>

<style>
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
  .btn-next,
  .btn-prev {
    padding: 7px 12px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
  }
  .btn-next {
    background: var(--color-accent);
    color: black;
    font-weight: 500;
    width: auto;
    text-align: center;
  }
  .btn-next.glow {
    animation: glowing 5000ms infinite;
    pointer-events: none;
  }
  .btn-prev.disabled {
    opacity: 0;
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
