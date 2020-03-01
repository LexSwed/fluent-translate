<script>
  import { onMount, onDestroy } from "svelte";
  import autosize from "autosize";

  export let value = "";
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
    width: 100%;
    overflow: hidden;
  }
</style>

<textarea bind:value rows="1" bind:this={textareaRef} />
