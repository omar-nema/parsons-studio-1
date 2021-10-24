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
    <p>Eyes on cursor at all times</p>
    <img src="/assets/img/explain-eye.svg" />
  </div>
  <div>
    <p>Move cursor to each red dot, and click on dot until it disappears</p>
    <img src="/assets/img/explain-cursor.svg" />
  </div>
</div>

<style>
  .instr {
    width: 90%;
  }
  .explain {
    display: flex;
    flex-direction: row;
    width: 80%;
    margin: auto;
    justify-content: space-between;
    padding-top: 100px;
  }
  .explain div {
    flex-basis: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--bg-contrast-darker);
    border-radius: 10px;
    padding: 0px 30px;
    padding-bottom: 30px;
    flex-direction: column;
  }
  .explain p {
    margin-top: 0;

    height: 80px;
    color: white;
    border-bottom: 1px solid gray;
    font-weight: 600;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .explain img {
    padding-left: 25%;
  }
</style>
