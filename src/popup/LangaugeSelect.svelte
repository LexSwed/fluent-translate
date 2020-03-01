<script>
  let languages = ["English", "Russian"];
  let value = null;
</script>

<select bind:value>
  {#each languages as lang}
    <option value={lang}>{lang}</option>
  {/each}
</select>
