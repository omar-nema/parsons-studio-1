<script>
  import GalleryCard from '../components/GalleryCard.svelte';

  let imgData = [
    {
      path: 'mehretuCropped.png',
      label: 'Local Calm',
      artist: 'Julie Mehretu',
      museumLink: 'blah',
    },
    {
      path: 'mehretuCropped.png',
      label: 'Local Calm',
      artist: 'Julie Mehretu',
      museumLink: 'blah',
    },
  ];

  //artworkdata, create card for each
</script>

<h1>Gallery</h1>
<p class="font-lg">
  Welcome to the gallery! Select a piece of artwork to see how participating
  individuals viewed it.
</p>

<div class="card-holder">
  {#each imgData as img}
    <GalleryCard data={img} />
  {/each}
</div>

<style>
</style>
