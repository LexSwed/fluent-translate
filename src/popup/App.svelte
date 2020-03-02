<script>
  import TextInput from "./TextInput.svelte";
  import ProgressBar from "../common/ProgressBar.svelte";
  import Translated from "./Translated.svelte";
  import { translating } from "../stores/translation";
</script>

<style>
  :global(body) {
    font-size: 15px;
    font-family: Segoe UI, SegoeUI, "Helvetica Neue", Helvetica, Arial,
      sans-serif;
    overflow: hidden;
  }

  main {
    width: 300px;
  }
</style>

<main>
  <TextInput />
  <ProgressBar visible={$translating} />
  <Translated />
</main>
