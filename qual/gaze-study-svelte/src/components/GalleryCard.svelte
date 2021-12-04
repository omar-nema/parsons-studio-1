<script>
  import {
    pageState,
    selectedImage,
    screenWidth,
    screenHeight,
    cardInView,
    tooltipText,
  } from '../stores/pageState';
  import { dbGet } from '../utils/firebaseUtils.js';
  import { onMount } from 'svelte';
  import { contourMapBlur } from '../utils/generateVisuals';
  import Tooltip from './Tooltip.svelte';
  import { fade } from 'svelte/transition';
  import { updateTooltip } from '../utils/tooltipUtils';

  //CUSTOM WIDTH AND HEIGHT CALC
  export let data;
  let maxW = Math.min($screenWidth - 500, 1000),
    maxH = Math.max($screenHeight - 350, 500);
  let width = 'auto',
    ht = 'auto',
    styleSubstring = '';
  if (data.dimWidthToHt < 1) {
    ht = maxH + 'px';
    styleSubstring = 'height: 100%';
  } else {
    width = maxW + 'px';
    styleSubstring = 'width: 100%';
  }

  //GET CURRENT SESSION DATA
  let currSessionKey, currSession, sessionData;
  let currFrame = 0;
  let sessions = [];
  if (data.sessionData) {
    sessions = data.sessionData;
  }
  let sessionsArray = [];
  if (sessions) {
    sessionsArray = Object.keys(sessions);
  }
  let currSessionIndex = sessionsArray.length - 1;
  currSessionKey = sessionsArray[currSessionIndex];
  //SWITCH SESSIONS
  $: {
    currSession = sessions[currSessionKey];
    getSessionData(currSessionKey);
  }
  async function getSessionData(key) {
    sessionData = await dbGet('sessionData/' + key);
    console.log(data, sessionData);
    createClips();
    //reset the slider
    if (sessionData) {
      currFrame = 0;
    }
  }
  //RE-CALCULATE SLIDER STEPS ON SESSION SWITCH
  let sliderMax = 100;
  $: {
    if (sessionData) {
      sliderMax = sessionData.length;
    }
    if (viewMode == 'aggregate') {
      contourMapBlur(
        sessionData,
        `#${data.key} .img-holder`,
        `#${data.key}-contour`,
        data.url
      );
    }
  }

  //managing slices
  let viewMode = 'slice'; //other mode = aggregate
  let playStatus = 'pause';

  //SLICE VISUAL - PROB BEST TO MOVE OUT
  $: {
    if (playStatus == 'play' && currFrame < sessionData.length - 1) {
      setTimeout(() => {
        currFrame++;
      }, 50);
    } else if (playStatus == 'play' && currFrame == sessionData.length - 1) {
      playStatus = 'pause';
    }
  }
  $: {
    currFrame;
    if (sessionData) {
      moveClips(sessionData[currFrame].xPct, sessionData[currFrame].yPct);
    }
  }
  let clips = [];
  function createClips() {
    clips = [];
    let numClips = 10;
    let clipMaxSize = 20;
    let clipMinR = 10;
    let clipInc = (clipMaxSize - clipMinR) / numClips;
    let blurMax = 6;
    let blurInc = blurMax / numClips;
    let opacityInc = 1 / numClips;
    for (let i = numClips; i > 0; i--) {
      let r = clipInc * i + clipMinR;
      let blur = blurInc * i;
      let opacity = opacityInc * (numClips - i);
      clips.push({
        class: 'clip',
        r: r,
        ctrx: sessionData[0].xPct,
        ctry: sessionData[0].yPct,
        blur: blur,
        opacity: opacity,
        src: data.url,
      });
    }
  }
  let clipHolder, domClips;
  $: {
    if (clipHolder) {
      domClips = clipHolder.childNodes;
    }
  }
  function moveClips(centerx, centery) {
    domClips.forEach((d) => {
      let currClipPath = d.style['clip-path'];
      let split = currClipPath.split('at ');
      let prefix = split[0];
      let newCtr = `at ${centerx}% ${centery}%)`;
      d.style['clip-path'] = prefix + newCtr;
    });
  }
  $: clips;
</script>

{#if $tooltipText}
  <div transition:fade={{ duration: 200 }}>
    <Tooltip />
  </div>
{/if}

<div class="card-outer" id={data.key} class:active={data.key == $cardInView}>
  <h2 style="display: flex; align-items: center;">
    <div style="font-weight: 400; color: rgb(126 123 123);margin-right: 15px;">
      Gaze Collection
    </div>
    <div>{data.artist}, <i>{data.title}</i></div>
    <!-- <span style="margin: 0 15px; font-size: 18px;color: rgb(126 123 123)"
      >-</span
    > -->
  </h2>
  <div class="card-filters">
    <div class="visual-filter filter-group">
      <!-- <div class="label compact">
        <span>Gaze View</span>
      </div> -->
      <div class="filter-options">
        <div
          class="filter time clickable"
          class:selected={viewMode == 'slice'}
          on:click={() => {
            if (playStatus == 'pause') {
              viewMode = 'slice';
              if (currFrame == sessionData.length - 1) {
                currFrame = 0;
              }
              playStatus = 'play';
            } else if (viewMode == 'slice' && playStatus !== 'pause') {
              playStatus = 'pause';
            }
          }}
        >
          {#if playStatus == 'pause'}
            <!-- <span class="material-icons-round md-14">style</span> -->
            <span
              on:click={() => {
                // viewMode = 'slice';
                // if (currFrame == sessionData.length - 1) {
                //   currFrame = 0;
                // }
                // playStatus = 'play';
              }}
              class="play-toggle">Animate</span
            >
          {:else}
            <span
              on:click={() => {
                // playStatus = 'pause';
              }}
              class="play-toggle">Pause</span
            >
          {/if}

          <span id="slider-holder">
            <input
              type="range"
              id="slider"
              name="slider"
              min="0"
              max={sliderMax}
              step="1"
              on:input={() => {
                viewMode = 'slice';
              }}
              bind:value={currFrame}
            />
          </span>
        </div>
        <div
          class="filter clickable"
          class:selected={viewMode == 'aggregate'}
          on:click={() => {
            playStatus = 'pause';
            viewMode = 'aggregate';
            contourMapBlur(
              sessionData,
              `#${data.key} .img-holder`,
              `#${data.key}-contour`,
              data.url
            );
          }}
        >
          <!-- <span class="material-icons-round md-14">image</span> -->
          <span>Aggregate</span>
        </div>
        <div class="filter clickable">
          <!-- <span class="material-icons-round md-14">compare</span> -->
          <span>Original</span>
        </div>
      </div>
    </div>
    <div class="viewer-filter  filter-group">
      <!-- <div class="label compact">
        <span class="material-icons-round md-14">people</span>
        <span>Viewer</span>
      </div> -->
      <div class="filter-options">
        <!-- <div class="label compact">
          <span class="material-icons-round md-14">add</span>
  
        </div> -->
        <div
          class="filter clickable add"
          on:mouseover={(e) => {
            updateTooltip(e.x, e.y, 'Add your gaze to the collection');
          }}
          on:mousemove={(e) => {
            updateTooltip(e.x, e.y);
          }}
          on:mouseleave={(e) => {
            updateTooltip();
          }}
          on:click={() => {
            selectedImage.set(data);
            pageState.set('record');
          }}
        >
          <span> Add Gaze</span>
        </div>
      </div>
    </div>
  </div>
  <div class="center">
    <div
      class="img-holder"
      style="width: {width}; height: {ht}; max-width: {data.width}px; max-height: {data.height}px"
    >
      <img
        class:slice={viewMode == 'slice'}
        class:agg={viewMode == 'aggregate'}
        src={data.url}
        style={styleSubstring}
      />
      <svg
        class="contour"
        class:active={viewMode == 'aggregate'}
        id="{data.key}-contour"
        style="width: 100%; height: 100%; position: absolute; top:0; left:0; z-index:10"
      />
      {#if viewMode == 'slice'}
        <div bind:this={clipHolder}>
          {#each clips as clip}
            <img
              class="clip"
              style="clip-path: circle({clip.r}% at {clip.ctrx}% {clip.ctry}%); filter: blur({clip.blur}px);opacity: ${clip.opacity}"
              src={data.url}
            />
          {/each}
        </div>
      {/if}

      <!-- <img src={data.url} style={styleSubstring} /> -->
    </div>

    <div class="filter person">
      <div
        class="arrow-nav clickable"
        class:disabled={currSessionIndex == 0}
        on:click={() => {
          currSessionIndex--;
          currSessionKey = sessionsArray[currSessionIndex];
        }}
      >
        <span class="material-icons-round md-18 nav" style="font-size: 26px"
          >arrow_left</span
        >
        <span>Prev</span>
      </div>

      <select class="clickable" bind:value={currSessionKey}>
        {#each sessionsArray as session, index}
          <option value={session}>
            <span style="font-weight: 600; color: black;"
              >{sessions[session].name}'s Gaze</span
            >
            <span style="font-weight: 400; color: gray"
              >({index + 1} of {sessionsArray.length})</span
            >
          </option>
        {/each}
      </select>
      <div
        class="clickable arrow-nav"
        class:disabled={currSessionIndex == sessionsArray.length - 1}
        on:click={() => {
          currSessionIndex++;
          currSessionKey = sessionsArray[currSessionIndex];
        }}
      >
        <span>Next</span>
        <span class="material-icons-round md-18 nav" style="font-size: 26px"
          >arrow_right</span
        >
      </div>
    </div>
  </div>
</div>

<style>
  .card-outer {
    opacity: 0.2;
    transition: opacity 0.3s ease-in-out;
  }
  .card-outer.active {
    opacity: 1;
  }

  #contour-overlay {
    background: black;
  }
  .card-filters {
    display: flex;
    align-items: center;
    font-weight: 500;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 30px;
    justify-content: space-between;
  }

  p {
    margin-top: 10px;
    padding: 0;
  }
  h2 {
    text-align: left;
    width: 100%;
    margin-top: 0;
  }
  i {
    text-decoration: underline;
    text-decoration-color: gray;
  }

  .label .material-icons-round {
    margin-right: 10px;
    color: gray;
  }
  .material-icons-round {
    font-size: 18px;
    margin-right: 5px;
  }

  .img-holder {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
    display: inline-block;
    margin: auto;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  img.agg {
    filter: blur(8px);
  }
  img.slice {
    filter: blur(6px);
  }

  .filter-group {
    /* min-width: 350px; */
    font-size: var(--font-size-filter);
    height: 38px;
  }

  .filter-group,
  .filter-options {
    display: flex;
    flex-direction: row;
  }
  .filter-options {
    overflow: hidden;
    flex-grow: 0.7;
    border-radius: 5px;
  }
  .arrow-nav {
    display: flex;
    align-items: center;
  }

  select {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    text-align: center;
    text-transform: capitalize;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    font-weight: 500;
  }
  /* select option {
    color: white;
  } */

  .filter {
    background: var(--bg-contrast-darker);
    padding: 0 10px;
    height: 100%;
    border: 0.5px dashed transparent;
    transition: all 0.15s linear;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  .filter.add {
    background: var(--bg-gradient);
  }
  .filter:last-child {
    border-right: none;
  }
  .filter.person {
    background: none;
    width: 100%;

    margin: auto;
    margin-top: 10px;
  }
  .filter.selected {
    background: #2196f329;
    /* border: 0.5px solid #0000004f; */
  }
  .filter,
  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
  }
  .label.compact {
    padding-left: 0;
    padding-right: 0;
  }

  .name {
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }

  .clickable:hover {
    color: var(--color-accent);
  }
  .play-toggle {
    width: 50px;
  }

  .disabled {
    opacity: 0.1;
    pointer-events: none;
  }
  .viewer-filter {
    margin-right: 15px;
  }

  input {
    margin: 0;
    padding: 0;
  }

  #slider-holder {
    display: flex;
    margin-left: 15px;
    align-items: center;
    width: 50px;
  }
  input {
    width: 100%;
  }

  .filter.time span {
    margin: 0 4px;
  }
  input[type='range'] {
    -webkit-appearance: none !important;
    height: 7px;
    border: none;
    border-radius: 0;
    background: var(--bg-contrast);
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    background: white;
    border-radius: 100%;
    border: none;
    box-shadow: none;
    height: 15px;
    width: 15px;
    cursor: pointer !important;
    transition: all 0.1s linear;
    /* box-shadow: var(--box-shadow-med); */
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  input[type='range']::-ms-fill-lower {
    background: blue !important;
  }
  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none !important;
    background: white;
    border-radius: 100%;
    border: none;
    box-shadow: none;
    height: 15px;
    width: 15px;
    cursor: pointer !important;
    transition: all 0.15s ease-in-out;
    /* box-shadow: var(--box-shadow-med); */
    border: 0.5px solid rgba(0, 0, 0, 0.1);
  }
  input[type='range']::-moz-range-thumb:hover {
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  }

  input[type='range']::-webkit-slider-thumb:hover {
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  }
  input[type='range']:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  .clip {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    margin: auto;
    opacity: 1;
    transition: all 0.07s linear;
  }

  .center {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .contour {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease-in-out;
  }
  .contour.active {
    opacity: 1;
  }
</style>
