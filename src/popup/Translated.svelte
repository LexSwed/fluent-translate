<script>
  import { translation } from "../stores/translation";
</script>

<div>
  {#if $translation}
    <p>{$translation}</p>
  {/if}
</div>
