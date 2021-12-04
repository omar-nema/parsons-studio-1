<script>
  import GalleryCard from '../components/GalleryCard.svelte';
  import { dbGet, dbWrite } from '../utils/firebaseUtils.js';
  import { slide, fade } from 'svelte/transition';
  import {
    artworkMetadata,
    loadedWorksKeys,
    loadedWorksArray,
  } from '../stores/artworkMetadata';
  import { initScroll } from '../utils/scrollListener';
  import { onMount } from 'svelte';
  import { cardInView, jumpCard } from '../stores/pageState';
  import jump from '../utils/jumpSection';

  //load the works in real time

  let worksArray = [],
    worksKeys = [];
  async function getAllWorks() {
    let worksObject = await dbGet('works');
    if (worksObject) {
      worksArray = Object.values(worksObject);
      worksKeys = Object.keys(worksObject);
      loadedWorksKeys.set(worksKeys);
      loadedWorksArray.set(worksArray);
      cardInView.set(worksKeys[0]);
    }
    document.querySelector('body').className = '';
    //write any new artwork that is not yet in DB to DB
    //issue is that this could remove sessionData if initial read was unsuccessful
    //FIX LATERRRRR
    // for (let key in $artworkMetadata) {
    //   if (!worksKeys.includes(key)) {
    //     let objToAdd = $artworkMetadata[key];
    //     console.log(key, objToAdd);
    //     dbWrite('works/' + key, objToAdd);
    //   }
    // }
  }

  $: {
    $jumpCard;
    jump($jumpCard);
  }

  async function init() {
    await getAllWorks();
    initScroll();
  }
  init();
</script>

<div class="card-holder">
  <div class="card-outer">
    <h2>The Gaze Gallery</h2>
    <p>
      Welcome to the Gallery. Each collection below visualizes how individuals
      gazed at a particular piece of artwork. Study the existing gazes in this
      gallery, or add your own.
    </p>
  </div>
  {#each worksArray as img}
    <GalleryCard data={img} />
  {/each}
</div>

<style>
  .card-holder {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 30px;
  }
  .card-outer {
    background: linear-gradient(
      0deg,
      rgba(240, 240, 240, 0.05) 0%,
      rgba(0, 212, 255, 0.05) 100%
    );
  }
  h2 {
    margin-top: 0;
  }
</style>
