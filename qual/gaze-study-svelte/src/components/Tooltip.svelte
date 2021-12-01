<script>
  import { tooltipText, tooltipX, tooltipY } from '../stores/pageState';
</script>

<div class="tooltip" style="top: {$tooltipY + 20}px; left: {$tooltipX}px">
  {$tooltipText}
</div>

<style>
  .tooltip {
    position: fixed;
    background: black;
    color: white;
    max-width: 250px;
    padding: 10px 20px;
    z-index: 10000;
    pointer-events: none;
    font-size: 14px;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  }
</style>
