<script>
  export let visible = false;
</script>

<style>
  .wrapper {
    --size: 6px;
    --color: #0078d4;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: opacity 0.1s 0.2s ease;
  }

  .invisible {
    opacity: 0;
  }

  .ball {
    margin: 3px;
    width: var(--size);
    height: var(--size);
    background-color: var(--color);
    border-radius: 50%;
    animation: ball-pulse 1s ease infinite;
  }
  .ball:nth-child(1) {
    animation-delay: -200ms;
  }
  .ball:nth-child(2) {
    animation-delay: -100ms;
  }
  .ball:nth-child(3) {
    animation-delay: 0;
  }

  @keyframes ball-pulse {
    0%,
    60%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    30% {
      opacity: 0.1;
      transform: scale(0.01);
    }
  }
</style>

<div class="wrapper" class:invisible={!visible}>
  <div class="ball" />
  <div class="ball" />
  <div class="ball" />
</div>
