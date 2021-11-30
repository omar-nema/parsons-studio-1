<script>
  import {
    pageState,
    selectedImage,
    gazerReady,
    gazerInitVideoDone,
    calibrationPct,
    calibrationCutoff,
    stateIndex,
    loadingInd,
    sessionID,
    gazerInitDone,
  } from '../stores/pageState';
  import { slide, fade } from 'svelte/transition';
  import Overview from '../components/RecordOverview.svelte';
  import CalibrateVid from '../components/RecordCalibrateVid.svelte';
  import CalibrateExercise from '../components/RecordCalibrateExercise.svelte';
  import CalibrateInstructions from '../components/RecordCalibrateInstructions.svelte';
  import CalibrateResults from '../components/RecordCalibrateResults.svelte';
  import CalibrateView from '../components/RecordView.svelte';
  import { onMount } from 'svelte';
  import {
    gazerInitialize,
    gazerMoveVideo,
    gazerInitVideo,
    gazerRestartCalibration,
  } from '../utils/gazerUtils.js';
  import { time_ranges_to_array } from 'svelte/internal';
  import * as localforage from 'localforage';

  let disableBack = false,
    disableNext = false,
    hideNext = false;
  let calibrated = false;

  let sectionsNotCalibrated = [
    {
      sectionName: 'overview',
      videoShown: false,
      btnLabel: 'Start!',
      disableBack: true,
      showLoader: true,
      btnBackLabel: 'Back to Overview',
    },
    {
      sectionName: 'calibrate-vid',
      videoShown: true,
      videoPos: 'middle',
      disableBack: false,
      disableNext: false,
      btnBackLabel: 'Back to Overview',
      btnLabel: 'Got It - Face is Aligned',
      showLoader: true,
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
      disableNext: false,
      btnBackLabel: 'Back to Calibration',
      showLoader: true,
    },
    {
      sectionName: 'results',
      videoShown: false,
      btnLabel: 'View Pattern',
      disableBack: true,
      hideNext: true,
      btnBackLabel: 'Back to Calibration',
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
      showLoader: true,
    },
    sectionsNotCalibrated[4],
    sectionsNotCalibrated[5],
  ];

  let sections = sectionsNotCalibrated;

  async function checkExistingCalibration() {
    let gazerData = await localforage.getItem('webgazerGlobalData');
    let calPct = await localforage.getItem('calibrationPct');
    calibrationPct.set(calPct);
    if (gazerData) {
      if (gazerData.length > 20 && calPct > $calibrationCutoff) {
        sections = sectionsCalibrated;
        calibrated = true;
      } else {
        sections = sectionsNotCalibrated;
      }
    }

    //should store the date of calibration. if more than a day then it don't count sry bb
  }
  function recalibrate() {
    calibrated = false;
    sections = sectionsNotCalibrated;
    calibrationPct.set(null);
    webgazer.clearData();
  }
  checkExistingCalibration(); //this should happen and return before anything else loads

  onMount(() => {
    stateIndex.set(0);
    //set unique ID for session
    if (!$sessionID) {
      sessionID.set(new Date().getTime());
    }
    if (!$gazerInitDone) {
      gazerInitialize();
    }
    document.querySelector('body').className = 'gaze';
  });

  //move video, disable next and prev buttons on subpage change
  let gazeActive, gazeRecording, currSection;
  $: {
    $gazerInitVideoDone;
    currSection = sections[$stateIndex];
    if (currSection.videoShown == true && $gazerInitVideoDone == true) {
      webgazer.showVideo(true);
      gazerMoveVideo(currSection.videoPos);
    } else {
      webgazer.showVideo(false);
    }
    currSection.disableBack ? (disableBack = true) : (disableBack = false);
    currSection.disableNext ? (disableNext = true) : (disableNext = false);
    currSection.hideNext ? (hideNext = true) : (hideNext = false);
  }

  //reactively update loading indicator for sections
  $: {
    $gazerInitVideoDone, $gazerInitDone;
    sectionsNotCalibrated[0].loadingVar = $gazerInitDone;
    sectionsNotCalibrated[1].loadingVar = $gazerInitVideoDone;
    sectionsCalibrated[0].loadingVar = $gazerInitVideoDone;
    if (currSection) {
      if (currSection.showLoader == true && !currSection.loadingVar) {
        loadingInd.set(true);
      } else {
        loadingInd.set(false);
      }
    }
  }

  $: {
    if ($calibrationPct > $calibrationCutoff) {
      disableNext = false;
    }
  }

  //detect if going back BAD BAD BAD code
  // $: {
  //   if ($gazerInitVideoDone) {
  //     disableNext = false;
  //   }
  // }
  // $: {
  //   if ($calibrationPct > $calibrationCutoff) {
  //     disableNext = false;
  //   }
  // }
</script>

<section class="experiment-container">
  <div class="container-header">
    <div class="current-selection">
      Gazing at:<span class="selection-holder"
        >{$selectedImage.title} by {$selectedImage.artist}</span
      >
    </div>
    <div class="nav-ind">
      {#each sections as section}
        <div class="nav-dot" class:active={sections[$stateIndex] === section} />
      {/each}
    </div>
  </div>
  <div class="container-body">
    {#if sections[$stateIndex].sectionName == 'overview'}
      <div>
        <Overview />
      </div>
    {:else if sections[$stateIndex].sectionName == 'calibrate-vid'}
      <div>
        <CalibrateVid {calibrated} />
      </div>
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
    {#if calibrated && $stateIndex !== sections.length - 1}
      <div
        class="btn re-cal clickable"
        class:disabled={calibrated == false}
        on:click={recalibrate}
      >
        Re-Calibrate
      </div>
    {:else}
      <div
        class="btn-prev btn disabled"
        class:accent={$calibrationPct && $calibrationPct < 70}
        class:disabled={disableBack == true}
        on:click={() => {
          if (sections[$stateIndex].sectionName == 'calibrate-exercise') {
            console.log('yea that me');
            gazerRestartCalibration();
          }
          $stateIndex--;
        }}
      >
        {sections[$stateIndex].btnBackLabel}
      </div>
    {/if}

    {#if !hideNext}
      <div
        on:click={() => {
          if ($stateIndex < sections.length - 2) {
            $stateIndex++;
          }
        }}
        class="btn-next btn accent clickable"
        class:disabled={$loadingInd || disableNext}
        class:glow={$loadingInd}
      >
        {#if $loadingInd}
          Loading...
        {:else}
          {sections[$stateIndex].btnLabel}
        {/if}
      </div>
    {/if}
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
    margin-top: 60px;
    height: auto;
    box-shadow: var(--box-shadow-light);
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .container-header,
  .container-footer,
  .container-body {
    padding: 0 30px;
  }
  .container-body {
    height: calc(100vh - 3 * var(--header-ht) - 65px);
    padding: 0 30px;
    font-size: 18px;
    position: relative;
  }
  .container-header,
  .container-footer {
    width: 100%;
    height: var(--header-ht);
    /* background: var(--bg-contrast-darker); */
  }
  .container-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    font-weight: 500;
  }
  .container-footer {
    box-shadow: var(--box-shadow-light-inverse);
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
    background: #dbd7d7;
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
  .btn.disabled {
    opacity: 0;
    pointer-events: none;
  }

  .btn-next.disabled {
    opacity: 0.2;
    pointer-events: none;
    display: block;
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
