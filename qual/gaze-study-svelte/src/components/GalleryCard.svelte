<script>
  import {
    pageState,
    selectedImage,
    screenWidth,
    screenHeight,
  } from '../stores/pageState';
  import { dbGet } from '../utils/firebaseUtils.js';
  import { onMount } from 'svelte';
  export let data;

  let maxW = 1000,
    maxH = 500;

  onMount(() => {
    //get this bounding client rect
    //console.log(document.querySelector('.card-outer').getBoundingClientRect());
  });

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

  // Object.keys(sessions).forEach(async (d) => {
  //   let sessionData = await dbGet('sessionData/' + d);
  // });

  function patternDrilldown() {
    selectedImage.set(data);
    pageState.set('patterns');
  }
</script>

<div class="card-outer">
  <h2>{data.artist}, <i>{data.title}</i></h2>
  <div class="card-filters">
    <div class="viewer-filter">
      <div class="label">
        <span class="material-icons-round md-14">people</span>
        <span>Viewer</span>
      </div>
      <div class="filter-options">
        <div class="filter selected">
          <span class="material-icons-round md-18">chevron_left</span>
          <span class="name">Pablo L.</span>
          <span class="material-icons-round md-18">chevron_right</span>
        </div>
        <div class="filter">Add Gaze</div>
      </div>
    </div>
  </div>
  <div class="img-holder" style="width: {width}; height: {ht}">
    <img src={data.url} style={styleSubstring} />
  </div>
</div>

<style>
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

  .card-outer {
    max-width: 1100px;
    width: 100%;
    height: calc(100vh - 200px);
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

  .viewer-filter {
    min-width: 300px;
    width: 50%;
    margin-bottom: 30px;
    font-size: 14px;
    padding: 10px 0;
  }

  .viewer-filter,
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
    padding: 5px 15px;
  }
  .name {
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }
</style>
