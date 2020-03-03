<script>
  import LanguageSelect from "./LangaugeSelect.svelte";
  import ProgressBar from "../common/ProgressBar.svelte";

  import { translation, translating, to } from "../stores/translation";
</script>

<style>
  .wrapper {
    position: relative;
    margin-top: 16px;
    min-heigh: 100px;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }

  .switch {
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-sizing: border-box;
    transition: all 0.1s ease-in-out;
    white-space: nowrap;
    text-decoration: none;
    font-size: 20px;
    border: 2px solid transparent;
    border-radius: 2px;
    padding: 0 8px;
    height: 26px;
    color: #262626;
    margin-right: 8px;
  }

  .switch > .material-icons {
    font-size: inherit;
    color: inherit;
    transform: rotate(90deg);
  }

  .switch:hover {
    background-color: #eaeaea;
  }

  .empty {
    text-align: center;
    margin: 8px 0 16px;
    user-select: none;
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
    <div class="flex-center">
      <button type="button" class="switch" title="Switch langugaes">
        <i class="material-icons">compare_arrows</i>
      </button>
      <LanguageSelect bind:value={$to} />
    </div>
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
