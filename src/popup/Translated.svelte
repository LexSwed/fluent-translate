<script>
  import LanguageSelect from './LangaugeSelect.svelte';
  import ProgressBar from '../common/ProgressBar.svelte';
  import TranslatorLink from '../common/TranslatorLink.svelte';

  import { translation, to, text } from '../stores/translation';

  function onChange(ev) {
    const { value } = ev.target;

    to.set(value);
    chrome.storage.local.set({ to: value });
  }
</script>

<div class="wrapper">
  {#if $translation.text}
    <LanguageSelect value={$to} on:change={onChange} />
    <p class="translated">
      {#if $translation.trimmed}
        {`${$translation.text}…`}
        <TranslatorLink>Full translation</TranslatorLink>
      {:else}{$translation.text}{/if}
    </p>
  {:else}
    <div class="empty">
      <i class="material-icons">language</i>
    </div>
  {/if}
</div>

<style>
  .wrapper {
    position: relative;
    margin-top: 8px;
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

  .translated {
    white-space: pre-wrap;
    font-size: 14px;
    line-height: 20px;
    color: #262626;
    padding: 0 4px 0 4px;
    margin: 4px 0 0;
  }
</style>
