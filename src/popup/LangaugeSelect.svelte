<script>
  import { languages } from "../stores/translation";

  export let value;
</script>

<style>
  select {
    width: 100px;
  }
</style>

<select bind:value>
  {#each [...Object.entries($languages || {})] as [lang, { name, nativeName }]}
    <option value={lang} title={nativeName}>{name}</option>
  {/each}
</select>
