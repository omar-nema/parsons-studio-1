<script>
  import {
    pageState,
    selectedImage,
    screenWidth,
    screenHeight,
  } from '../stores/pageState';
  import { dbGet } from '../utils/firebaseUtils.js';
  import { onMount } from 'svelte';
  import { contourMapBlur } from '../utils/generateVisuals';

  let visSvg;
  export let data;
  let maxW = 1000,
    maxH = $screenHeight - 300;

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

  let sliderMax = 100;
  $: {
    if (sessionData) {
      sliderMax = sessionData.length;
    }
  }

  //managing slices
  let viewMode = 'slice'; //other mode = aggregate
  let playStatus = 'pause';

  //if it ends, we change
  $: {
    if (playStatus == 'play' && currFrame < sessionData.length - 1) {
      setTimeout(() => {
        currFrame++;
        console.log(currFrame, sessionData.length);
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
  function moveClips(centerx, centery) {
    // let clips = document.querySelectorAll('.clip');
    domClips.forEach((d) => {
      let currClipPath = d.style['clip-path'];
      let split = currClipPath.split('at ');
      let prefix = split[0];
      let newCtr = `at ${centerx}% ${centery}%)`;
      d.style['clip-path'] = prefix + newCtr;
    });
  }
  $: clips;
  $: {
    if (clipHolder) {
      domClips = clipHolder.childNodes;
    }
  }
</script>

<div class="card-outer">
  <h2 style="display: flex; justify-content: space-between">
    <div>{data.artist}, <i>{data.title}</i></div>
    <div style="font-weight: 400; color: #bdbdbd">Gaze Collection</div>
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
        <div class="filter selected time">
          {#if playStatus == 'pause'}
            <span
              on:click={() => {
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
              bind:value={currFrame}
            />
          </span>
        </div>
        <div class="filter clickable">Aggregate</div>
      </div>
    </div>
  </div>
  <div class="center">
    <div class="img-holder" style="width: {width}; height: {ht}">
      {#if viewMode == 'slice'}
        <img src={data.url} style="filter: blur(6px); {styleSubstring}" />
        <div bind:this={clipHolder}>
          {#each clips as clip}
            <img
              class="clip"
              style="clip-path: circle({clip.r}% at {clip.ctrx}% {clip.ctry}%); filter: blur({clip.blur}px);opacity: ${clip.opacity}"
              src={data.url}
            />
          {/each}
        </div>
      {:else}
        <svg id={data.key} bind:this={visSvg} style={styleSubstring} />
      {/if}

      <!-- <img src={data.url} style={styleSubstring} /> -->
    </div>
  </div>
</div>

<style>
  #contour-overlay {
    background: black;
  }
  .card-filters {
    display: flex;
    align-items: center;
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
    max-width: 1100px;
    width: 100%;
    background: var(--bg-contrast);
    padding: 30px 40px;
    margin: auto;
    margin-top: 70px;
    margin-bottom: 70px;
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

  .filter-group {
    min-width: 300px;
    width: 50%;
    margin-bottom: 30px;
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
  .label {
    margin-right: 10px;
  }
  select {
    background: var(--bg-contrast-darkest);
    border: none;
    color: white;
    padding: 0;
    margin: 0;
    width: 130px;
    text-align: center;
    text-transform: capitalize;
  }
  select option {
    color: white;
  }

  .filter {
    background: var(--bg-contrast-darker);
    padding: 0 10px;
    height: 100%;
  }
  .filter.selected {
    background: var(--bg-contrast-darkest);
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
    transition: opacity 0.1s linear;
  }
  input[type='range']::-moz-range-thumb:hover {
    opacity: 0.9;
  }

  input[type='range']::-webkit-slider-thumb:hover {
    opacity: 0.9;
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
  }

  .center {
    display: flex;
    justify-content: center;
  }
</style>
