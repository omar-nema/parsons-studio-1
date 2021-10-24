<script>
  import { pageState, selectedImage } from '../stores/pageState';
</script>

<h1>Viewing Patterns</h1>
<p class="font-lg">
  Below: a series of visualizations summarizing how participants viewed {$selectedImage.artist +
    "'s"}
  {$selectedImage.label}. Click on a tile to see a detailed analysis or
  visualize your own viewing session!
</p>

<section class="card-holder">
  <div class="card-outer clickable" on:click={() => pageState.set('record')}>
    <div class="card">
      <span>View & Visualize</span>
    </div>
  </div>
</section>

<style>
</style>
