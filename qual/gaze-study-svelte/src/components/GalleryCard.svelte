<script>
  import { pageState, selectedImage } from '../stores/pageState';
  export let data;
  let filePath = '/assets/img/';

  function patternDrilldown() {
    selectedImage.set(data);
    pageState.set('patterns');
  }
</script>

<div class="card-outer clickable" on:click={patternDrilldown}>
  <div class="card">
    <img src={filePath + data.path} />
  </div>
  <p>{data.label}</p>
</div>

<style>
  p {
    margin-top: 10px;
    padding: 0;
  }
</style>
