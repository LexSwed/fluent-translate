<script>
  import { onMount, onDestroy } from 'svelte';
  import autosize from 'autosize';
  import { text } from '../stores/translation';

  let textareaRef;

  onMount(() => {
    autosize(textareaRef);
  });

  onDestroy(() => {
    autosize.destroy(textareaRef);
  });
</script>

<textarea
  {...$$props}
  bind:value={$text}
  rows="1"
  bind:this={textareaRef}
  on:focus
  on:blur />

<style>
  textarea {
    all: unset;
    resize: none;
    font-family: inherit;
    min-height: 1em;
    max-height: 150px;
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    line-height: 16px;
  }
</style>
