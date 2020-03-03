<script>
  import { translation, to } from "../stores/translation";
  import LanguageSelect from "./LangaugeSelect.svelte";
</script>

<style>
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
</style>

<div>
  {#if $translation}
    <div class="flex-center">
      <button type="button" class="switch" title="Switch langugaes">
        <i class="material-icons">compare_arrows</i>
      </button>
      <LanguageSelect bind:value={$to} />
    </div>
    <p>{$translation}</p>
  {/if}
</div>
