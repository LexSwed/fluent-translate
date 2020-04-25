<script>
  import TextInput from './TextInput.svelte';
  import Translated from './Translated.svelte';
  import Footer from './Footer.svelte';
</script>

<main>
  <TextInput />
  <Translated />
  <Footer />
</main>

<style>
  :global(body) {
    font-size: 15px;
    font-family: 'system-ui', sans-serif;
    overflow: hidden;
    color: #262626;
    margin: 0;
    padding: 10px;
  }

  main {
    width: 300px;
  }
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2)
      format('woff2');
  }
  :global(.material-icons) {
    font-family: 'Material Icons';
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
