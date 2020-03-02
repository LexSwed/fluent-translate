<script>
  import { from, languages } from "../stores/translation";
</script>

<style>
  select {
    width: 100px;
  }
</style>

<select bind:value={$from}>
  {#each [...Object.entries($languages || {})] as [lang, { name, nativeName }]}
    <option value={lang} title={nativeName}>{name}</option>
  {/each}
</select>
