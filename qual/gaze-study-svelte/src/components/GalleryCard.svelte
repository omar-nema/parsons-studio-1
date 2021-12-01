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
    maxH = Math.max($screenHeight - 300, 500);
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
    <div class="viewer-filter  filter-group">
      <div class="label">
        <span class="material-icons-round md-14">people</span>
        <span>Viewer</span>
      </div>
      <div class="filter-options">
        <div class="filter selected">
          <span
            class:disabled={currSessionIndex == 0}
            on:click={() => {
              currSessionIndex--;
              currSessionKey = sessionsArray[currSessionIndex];
            }}
            class="material-icons-round md-18 nav clickable">chevron_left</span
          >
          <span
            class:disabled={currSessionIndex == sessionsArray.length - 1}
            on:click={() => {
              currSessionIndex++;
              currSessionKey = sessionsArray[currSessionIndex];
            }}
            class="material-icons-round md-18 nav clickable">chevron_right</span
          >
          <select class="clickable" bind:value={currSessionKey}>
            {#each sessionsArray as session}
              <option value={session}>{sessions[session].name}</option>
            {/each}
          </select>
        </div>
        <div
          class="filter clickable"
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
          Add Gaze
        </div>
      </div>
    </div>

    <div class="visual-filter filter-group">
      <div class="label">
        <span class="material-icons-round md-14">layers</span>
        <span>Visual</span>
      </div>
      <div class="filter-options">
        <div class="filter time" class:selected={viewMode == 'slice'}>
          {#if playStatus == 'pause'}
            <span
              on:click={() => {
                viewMode = 'slice';
                if (currFrame == sessionData.length - 1) {
                  currFrame = 0;
                }
                playStatus = 'play';
              }}
              class="material-icons-round md-14 clickable">play_arrow</span
            >
          {:else}
            <span
              on:click={() => {
                playStatus = 'pause';
              }}
              class="material-icons-round md-14 clickable">pause</span
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
          on:mouseover={(e) => {
            updateTooltip(
              e.x,
              e.y,
              'View a summary of personX gaze. The image is blurred out in portions where the viewer paid less attention.'
            );
          }}
          on:mousemove={(e) => {
            updateTooltip(e.x, e.y);
          }}
          on:mouseleave={(e) => {
            updateTooltip();
          }}
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
          Aggregate
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
    font-size: 14px;
  }
  .material-icons-round {
    font-size: 18px;
  }

  .card-outer {
    max-width: min(75vw, 1100px);
    width: 100%;
    background: var(--bg-contrast);
    padding: 30px 40px;
    margin: auto;
    margin-top: 70px;
    margin-bottom: 70px;
    border-radius: 10px;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);
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
    min-width: 350px;
    font-size: 14px;
    padding: 10px 0;
  }

  .filter-group,
  .filter-options {
    display: flex;
    flex-direction: row;
  }
  .filter-options {
    border-radius: 5px;
    overflow: hidden;
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
  }
  .filter.selected {
    background: var(--bg-contrast-darkest);
    /* border: 0.5px solid #0000004f; */
  }
  .filter,
  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
  }

  .name {
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }

  .clickable:hover {
    color: var(--color-accent);
  }

  .disabled {
    opacity: 0.2;
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
    transition: opacity 0.1s linear;
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
  }
  input[type='range']::-moz-range-thumb:hover {
    box-shadow: var(--box-shadow-med);
  }

  input[type='range']::-webkit-slider-thumb:hover {
    box-shadow: var(--box-shadow-med);
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
