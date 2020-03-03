<script>
  import TextInput from "./TextInput.svelte";
  import Translated from "./Translated.svelte";
  import Footer from "./Footer.svelte";

  import { translating } from "../stores/translation";
</script>

<style>
  :global(body) {
    font-size: 15px;
    font-family: Segoe UI, SegoeUI, "Helvetica Neue", Helvetica, Arial,
      sans-serif;
    overflow: hidden;
    color: #262626;
    margin: 0;
    padding: 16px;
  }

  main {
    width: 300px;
  }
</style>

<main>
  <TextInput />
  <Translated />
  <Footer />
</main>
