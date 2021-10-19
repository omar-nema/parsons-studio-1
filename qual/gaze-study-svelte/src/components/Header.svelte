<script>
  import { pageState } from '../stores/pageState';
  console.log($pageState);
</script>

<header>
  <div class="header-content">
    <div class="header-left">How We Gaze</div>
    <div class="header-right">
      <div class="breadcrumb" class:active={$pageState === 'gallery'}>
        Gallery
      </div>
      <div class="breadcrumb" class:active={$pageState === 'patterns'}>
        Patterns
      </div>
      <div class="breadcrumb" class:active={$pageState === 'analysis'}>
        Analysis
      </div>
    </div>
  </div>
</header>

<style>
  header {
    background: black;
    height: var(--header-ht);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-content {
    max-width: var(--content-width-max);
    width: var(--content-width-pct);
    display: flex;
    justify-content: space-between;
  }
  .header-left {
    font-weight: 600;
  }
  .header-right {
    display: flex;
    font-weight: 400;
  }
  .breadcrumb {
    margin-left: 25px;
    color: var(--color-gray-faded);
    transition: color 0.3s linear;
  }
  .breadcrumb.active {
    color: var(--color-accent);
    font-weight: 600;
  }
</style>
