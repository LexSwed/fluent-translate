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
  @font-face {
    font-family: "Material Icons";
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2)
      format("woff2");
  }
  :global(.material-icons) {
    font-family: "Material Icons";
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
  }
</style>

<main>
  <TextInput />
  <Translated />
  <Footer />
</main>
