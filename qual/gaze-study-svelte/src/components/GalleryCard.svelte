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

  export let data;
  let maxW = 1000,
    maxH = $screenHeight * 0.85 - 200;

  let sliderVal = 0;

  let width = 'auto',
    ht = 'auto',
    styleSubstring = '';
  if (data.dimsWidthToHt > 1) {
    ht = maxH + 'px';
    styleSubstring = 'height: 100%';
  } else {
    width = maxW + 'px';
    styleSubstring = 'width: 100%';
  }
  let sessions = data.sessionData;
  let sessionsArray = Object.keys(sessions);
  let currSessionIndex = 0;
  let currSessionKey, currSession;
  $: {
    currSessionKey = sessionsArray[currSessionIndex];
    currSession = sessions[currSessionKey];
  }
  function navigateKeys(chg) {
    currSessionIndex = currSessionIndex + chg;
  }

  //on viewer change
  $: (async () => {
    let sessionData = await dbGet('sessionData/' + currSessionKey);
    if (sessionData) {
      contourMapBlur(sessionData);
      document.querySelector('#slider').setAttribute('max', sessionData.length);
      sliderVal = 0;
    }
  })();
</script>

<div class="card-outer">
  <h2>{data.artist}, <i>{data.title}</i></h2>
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
              navigateKeys(-1);
            }}
            class="material-icons-round md-18 nav clickable">chevron_left</span
          >
          <span
            class:disabled={currSessionIndex == sessionsArray.length - 1}
            on:click={() => {
              navigateKeys(1);
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
          <span class="material-icons-round md-14 clickable">play_arrow</span>
          <!-- <span class="material-icons-round md-14 clickable">pause</span> -->
          <span id="slider-holder">
            <input
              type="range"
              id="slider"
              name="slider"
              min="0"
              max="150"
              step="1"
              bind:value={sliderVal}
            />
          </span>
        </div>
        <div class="filter clickable">Aggregate</div>
      </div>
    </div>
  </div>
  <div class="img-holder" style="width: {width}; height: {ht}">
    <svg style={styleSubstring} id="contour-overlay" />
    <!-- <img src={data.url} style={styleSubstring} /> -->
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
    background: none;
    border: none;
    color: white;
    padding: 0;
    margin: 0;
    width: 130px;
    text-align: center;
    text-transform: capitalize;
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
</style>
