<script>
  import { languages } from "../stores/translation";

  export let value;
</script>

<style>
  select {
    width: 100px;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    border: 1px solid transparent;
    color: inherit;
    background-color: #edf2f7;
    height: 28px;
    /* otherwise doesn't look centered: */
    line-height: 26px;
    padding: 0 22px 0 8px;
    -webkit-appearance: none;
    background-position: right 4px center;
    background-repeat: no-repeat;
    background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" fill="rgb(26, 32, 44)" width="14" height="14" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>');
  }

  select:hover {
    background-color: #e2e8f0;
  }

  select:focus {
    outline: none;
    border-color: rgb(26, 32, 44);
  }
</style>

<select bind:value on:change>
  {#each [...Object.entries($languages || {})] as [lang, { name, nativeName }]}
    <option value={lang} title={nativeName}>{name}</option>
  {/each}
</select>
