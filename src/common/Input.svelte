<script>
  import { onMount, onDestroy } from "svelte";
  import autosize from "autosize";
  import { text } from "../stores/translation";

  let textareaRef;

  onMount(() => {
    autosize(textareaRef);
  });

  onDestroy(() => {
    autosize.destroy(textareaRef);
  });
</script>

<style>
  textarea {
    all: unset;
    resize: none;
    font-family: inherit;
    min-height: 1em;
    max-height: 300px;
    width: 100%;
    overflow: hidden;
  }
</style>

<textarea bind:value={$text} rows="1" bind:this={textareaRef} />
