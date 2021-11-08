<script>
  import {
    pageState,
    selectedImage,
    gazerInitVideoDone,
    calibrationPct,
    calibrationCutoff,
    stateIndex,
    loadingInd,
    sessionID,
gazerInitDone
  } from '../stores/pageState';
  import { slide, fade } from 'svelte/transition';
  import Overview from '../components/RecordOverview.svelte';
  import CalibrateVid from '../components/RecordCalibrateVid.svelte';
  import CalibrateExercise from '../components/RecordCalibrateExercise.svelte';
  import CalibrateInstructions from '../components/RecordCalibrateInstructions.svelte';
  import CalibrateResults from '../components/RecordCalibrateResults.svelte';
  import CalibrateView from '../components/RecordView.svelte';
  import { afterUpdate } from 'svelte';
  import {
    gazerInitialize,
    gazerMoveVideo,
    gazerInitVideo,
    gazerRestartCalibration,
  } from '../utils/gazerUtils.js';
  import { time_ranges_to_array } from 'svelte/internal';
  import * as localforage from 'localforage';
  ////


  //reactively update loading indicator for sections
  //NOT reactively updating
  $: {
    console.log('updating loaders')
    $gazerInitVideoDone, $gazerInitDone;
    sectionsNotCalibrated[0].loadingVar = $gazerInitDone;
    sectionsNotCalibrated[1].loadingVar = $gazerInitVideoDone;    
    sectionsCalibrated[0].loadingVar = $gazerInitVideoDone;
  }

  let sectionsNotCalibrated = [
    {
      sectionName: 'overview',
      videoShown: false,
      btnLabel: 'Start!',
      disableBack: true,
      showLoader: true,
    },
    {
      sectionName: 'calibrate-vid',
      videoShown: true,
      videoPos: 'middle',
      disableBack: false,
      disableNext: false,
      btnBackLabel: 'Back to Overview',
      btnLabel: 'Got It - Face is Aligned',
      showLoader: true
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
    {
      sectionName: 'view',
      videoShown: false,
      btnLabel: 'Proceed',
      disableNext: true,
      btnBackLabel: 'Back to Calibration',
      showLoader: true,
    },
    {
      sectionName: 'results',
      videoShown: false,
      btnLabel: 'View Pattern',

      btnBackLabel: 'Back to Calibration',
      showLoader: true,
    },
  ];
  //change from index
  let sectionsCalibrated = [
    {
      sectionName: 'calibrate-vid',
      videoShown: true,
      videoPos: 'middle',
      disableBack: true,
      disableNext: false,
      btnBackLabel: 'Back to Overview',
      btnLabel: 'Got It - Face is Aligned',
      showLoader: true
    },
    sectionsNotCalibrated[4],    
    sectionsNotCalibrated[5],
  ]
  //prob shouldn't do this
  let sections = sectionsNotCalibrated;

  let calibrated = false;
  async function checkExistingCalibration(){
    let gazerData = await localforage.getItem('webgazerGlobalData');
    let calPct =  await localforage.getItem('calibrationPct');
    calibrationPct.set(calPct);
    console.log(gazerData, calibrationPct)
    if (gazerData.length > 20 && calPct > $calibrationCutoff){
      sections = sectionsCalibrated;
      calibrated = true;
    } else {
      sections = sectionsNotCalibrated;
    }
    //should store the date of calibration
  }
  function recalibrate(){
    calibrated = false;
    sections = sectionsNotCalibrated;
    calibrationPct.set(null);
    //webgazer.clearData();
  }

  let gazerReady, mount; //webgazer library loaded
  let disableBack = false,
    disableNext = false;

  afterUpdate(() => {
    mount = true;
    if (!$sessionID){
      sessionID.set(new Date().getTime());
    }
  });

  checkExistingCalibration()   //this should happen and return before anything else loads

  
  function backClick() {
    if (sections[$stateIndex] == 'calibrate-exercise') {
      gazerRestartCalibration();
    }
    $stateIndex--;
  }
  $: {
    if (mount && gazerReady) {
      gazerInitialize();
    }
  }

  //anytime page substate changes --- FIX THIS
  let gazeActive, gazeRecording;
  $: {
    $gazerInitVideoDone;
      let currSection = sections[$stateIndex];
    if (mount && gazerReady) {
      if (currSection.videoShown == true && $gazerInitDone) {
        webgazer.showVideo(true);
        gazerMoveVideo(currSection.videoPos);
      } else {
        webgazer.showVideo(false);
      }
      if (currSection.disableBack) {
        disableBack = true;
      } else {
        disableBack = false;
      }

      console.log(currSection.showLoader, currSection.loadingVar)
      if (currSection.showLoader == true && !currSection.loadingVar ) {
        loadingInd.set(true);
      } else {
        loadingInd.set(false);
      }
      if (currSection.disableNext) {
        disableNext = true;
      } else {
        disableNext = false;
      }
    }
   
 
  }
  //detect if going back BAD BAD BAD code
  $: {
    if ($gazerInitVideoDone) {
      disableNext = false;
    }
  }
  $: {
    if ($calibrationPct > $calibrationCutoff) {
      disableNext = false;
    }
  }
</script>


<svelte:head>
  <script on:load={() => {gazerReady = true} }  src="./assets/webgazer.min.js" ></script>
</svelte:head>


<section class="experiment-container">
  <div class="container-header">
    <div class="current-selection">
      Selected Work:<span class="selection-holder">{$selectedImage.title} by {$selectedImage.artist}</span>
    </div>
    <div class="nav-ind">
      {#each sections as section}
        <div class="nav-dot" class:active={sections[$stateIndex] === section} />
      {/each}
    </div>
  </div>
  <div class="container-body" transition:fade>
    {#if sections[$stateIndex].sectionName == 'overview'}
      <Overview />
    {:else if sections[$stateIndex].sectionName == 'calibrate-vid'}
      <CalibrateVid calibrated={calibrated} />
    {:else if sections[$stateIndex].sectionName == 'calibrate-instructions'}
      <CalibrateInstructions />
    {:else if sections[$stateIndex].sectionName == 'calibrate-exercise'}
      <CalibrateExercise />
    {:else if sections[$stateIndex].sectionName == 'view'}
      <CalibrateView />
    {:else if sections[$stateIndex].sectionName == 'results'}
      <CalibrateResults />
    {/if}
  </div>
  <div class="container-footer">
   
    <div class="btn re-cal"
    class:disabled={calibrated == false}
    on:click={recalibrate}
    >
      Re-Calibrate
    </div>
    <div
      class="btn-prev btn disabled"
      class:accent={$calibrationPct && $calibrationPct < 70}
      class:disabled={disableBack == true}
      on:click={backClick}
    >
      {sections[$stateIndex].btnBackLabel}
    </div>
    <div
      on:click={() => $stateIndex++}
      class="btn-next btn accent clickable"
      class:disabled={disableNext == true}
      class:glow={$loadingInd == true}
    >
      {#if $loadingInd}
        Loading...
      {:else}
        {sections[$stateIndex].btnLabel}
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
    margin-top: 80px;
  }
  .container-header,
  .container-footer,
  .container-body {
    padding: 0 30px;
  }
  .container-body {
    height: calc(100vh - 3 * var(--header-ht) - 80px);
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
  .btn.disabled  {
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
