<script>
  import Input from "./Input.svelte";
  import LanguageSelect from "./LangaugeSelect.svelte";

  let text = "";

  $: multiline = Math.floor(text.length / 25) > 0;
</script>

<style>
  .wrapper {
    position: relative;
    border: 1px solid #cbd5e0;
    border-radius: 2px;
    padding: 8px;
    width: 300px;
    display: flex;
    align-items: center;
  }

  .wrapper:hover {
    border-color: #718096;
  }

  .wrapper:focus-within {
    border-color: #2d3748;
  }

  .language-select {
    align-self: flex-end;
    display: inline-block;
  }

  .multiline {
    flex-direction: column;
  }

  .multiline .language-select {
    margin-top: 8px;
    margin-left: 8px;
  }
</style>

<div class="wrapper" class:multiline>
  <Input bind:value={text} />
  <div class="language-select">
    <LanguageSelect />
  </div>
</div>
