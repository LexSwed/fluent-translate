<script>
  export let iconRight = null;
  export let iconLeft = null;
</script>

<button {...$$props} on:click>
  {#if iconLeft}
    <i class="material-icons">{iconLeft}</i>
  {/if}
  <span>
    <slot />
  </span>
  {#if iconRight}
    <i class="material-icons">{iconRight}</i>
  {/if}
</button>

<style>
  button {
    border: 1px solid transparent;
    outline: none;
    background-color: #edf2f7;
    color: #4a5568;
    cursor: pointer;
    transition: 0.12s ease-in;
    display: flex;
    align-items: center;
    font-size: 12px;
    white-space: nowrap;
    height: 28px;
    padding: 0 8px;
    line-height: 1;
    border-radius: 2px;
  }
  button:hover {
    background-color: #e2e8f0;
  }
  button:focus {
    border-color: #4a5568;
    outline: none;
  }
  .material-icons + span,
  span + .material-icons {
    margin-left: 8px;
  }
  .material-icons {
    color: inherit;
    font-size: 1.5em;
    user-select: none;
  }
</style>
