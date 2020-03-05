<script>
  import Input from "../common/Input.svelte";
  import LanguageSelect from "./LangaugeSelect.svelte";
  import { text, from } from "../stores/translation";

  let inputFocused = false;

  $: multiline = Math.floor($text.length / 25) > 0;
</script>

<style>
  .input-wrapper {
    position: relative;
    border: 1px solid #cbd5e0;
    border-radius: 2px;
    display: flex;
    align-items: center;
    padding: 8px;
    transition: 0.12s ease-in-out;
  }

  .input-wrapper:hover {
    border-color: #718096;
  }

  /* focus-within is ugly due to possible focused select element */
  .input-wrapper.input-focused {
    border-color: #2d3748;
  }

  .language-select {
    align-self: flex-end;
    display: inline-block;
    margin: -4px -4px -4px 8px;
  }

  .multiline {
    flex-direction: column;
  }

  .multiline .language-select {
    margin-top: 8px;
    margin-left: 8px;
  }
</style>

<div class="input-wrapper" class:multiline class:input-focused={inputFocused}>
  <Input
    on:focus={() => (inputFocused = true)}
    on:blur={() => (inputFocused = false)} />
  <div class="language-select">
    <LanguageSelect bind:value={$from} />
  </div>
</div>
