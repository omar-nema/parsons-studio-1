<script>
  export let videoInit = false;
</script>

<h3>Calibrate: Video</h3>
<p>
  We’ll need to first calibrate your webcam in order to proceed. Ensure that
  your are in a well-lit environment, and that your face is in the green section
  of the screen below.
</p>

{#if !videoInit}
  <div class="video-wrapper">
    <p>Initializing Video Stream...</p>
  </div>
{/if}

<style>
  .video-wrapper {
    position: absolute;
    width: 500px;
    height: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #585656ad;
    pointer-events: none;
  }
</style>
