<script>
  import { gazerArtRecording } from '../utils/gazerUtils';

  let imageInactive = true;
  setTimeout(() => {
    imageInactive = false;
    gazerArtRecording();
  }, 3000);
  //20 seconds after that
  //start recording, this time to a diff variable
  //stateIndex is plus plused in this bitch
</script>

<div class="wrapper-full">
  <div class="img-holder">
    <img
      id="artView"
      src="./assets/img/mehretuCropped.png"
      class:inactive={imageInactive == true}
    />
    <p class:inactive={imageInactive == false}>
      Please look at the following image for 20 seconds
    </p>
  </div>
</div>

<style>
  .wrapper-full {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    z-index: 1;
  }
  p {
    font-size: 24px;
    z-index: 1;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .img-holder {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 50px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
  img.inactive {
    opacity: 0.1;
  }
  p.inactive {
    opacity: 0;
  }
  p,
  img {
    transition: opacity 0.3s ease-in-out;
  }
</style>
