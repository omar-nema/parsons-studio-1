<script>
  import { slide, fade } from 'svelte/transition';
</script>

<h3>Calibrate: Instructions</h3>
<p class="instr">
  Great! Your face calibration will be displayed on the right for reference.
  Next, we’ll calibrate your eye tracking movement on the screen. Remember these
  two rules!
</p>

<div class="explain">
  <div>
    <p>#1: Eyes on cursor at all times</p>
    <img src="./assets/img/explain-eye.svg" />
  </div>
  <div>
    <p>#2: Move cursor to each red dot, and click on dot until it disappears</p>
    <img src="./assets/img/explain-cursor.svg" />
  </div>
</div>

<style>
  .instr {
    width: 80%;
  }
  .explain {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: auto;
    justify-content: space-between;
    padding-top: 25px;
    max-width: 850px;
  }
  .explain div {
    flex-basis: 47%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--bg-contrast-darker);
    border-radius: 10px;
    padding: 10px 30px;
    padding-bottom: 30px;
    flex-direction: column;
    border: 1px dashed #ffffff40;
  }
  .explain p {
    margin-top: 0;
    height: 80px;
    font-weight: 500;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
