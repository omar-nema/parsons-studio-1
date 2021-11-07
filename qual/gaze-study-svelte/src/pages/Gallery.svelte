<script>
  import GalleryCard from '../components/GalleryCard.svelte';
  import { dbGet } from '../utils/firebaseUtils.js';

  //load the works in real time

  let works = [];
  async function getAllWorks() {
    works = Object.values(await dbGet('works'));
    console.log(works);
  }

  getAllWorks();

  ///get imgdata instead from API
  //ping the works

  //artworkdata, create card for each
</script>

<!-- <p class="font-lg" style="margin-bottom: 30px">
  Welcome to the gallery! Select a piece of artwork to see how participating
  individuals viewed it.
</p> -->

<div class="card-holder">
  {#each works as img}
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
