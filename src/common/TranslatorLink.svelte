<script>
  import { to, text } from '../stores/translation';
  import { getTranslatorLink } from '../utils';

  $: link = getTranslatorLink({ to: $to, text: $text });
</script>

<a href={link} target="_blank" rel="noopener">
  <slot />
</a>

<style>
  a {
    border-bottom: 1px solid #0072c9;
    color: #0072c9;
    outline: none;
    text-decoration: none;
    line-height: 0.9;
  }
  a:hover {
    border-bottom-color: #0060a9;
    color: #0060a9;
  }
</style>
