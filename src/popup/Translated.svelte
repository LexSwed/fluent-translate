<script>
  import LanguageSelect from "./LangaugeSelect.svelte";
  import ProgressBar from "../common/ProgressBar.svelte";

  import { translation, translating, to } from "../stores/translation";
</script>

<style>
  .wrapper {
    position: relative;
    margin-top: 16px;
  }

  .empty {
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
  }

  .empty .material-icons {
    font-size: 42px;
    color: #e2e8f0;
  }

  .progress-bar {
    position: absolute;
    top: 8px;
    right: 0;
    display: inline-flex;
  }
</style>

<div class="wrapper">
  {#if $translation}
    <LanguageSelect bind:value={$to} />
    <p>{$translation}</p>
  {:else}
    <div class="empty">
      <i class="material-icons">language</i>
    </div>
  {/if}
  <div class="progress-bar">
    <ProgressBar visible={$translating} />
  </div>
</div>
