<script>
  import GalleryCard from '../components/GalleryCard.svelte';
  import { dbGet, dbWrite } from '../utils/firebaseUtils.js';
  import { slide, fade } from 'svelte/transition';
  import { artworkMetadata } from '../stores/artworkMetadata';

  //load the works in real time

  let worksArray = [],
    worksKeys = [];
  async function getAllWorks() {
    let worksObject = await dbGet('works');
    if (worksObject) {
      worksArray = Object.values(worksObject);
      worksKeys = Object.keys(worksObject);
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

  getAllWorks();
</script>

<div class="card-holder">
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
</style>
