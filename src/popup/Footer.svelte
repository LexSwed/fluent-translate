<script>
  import { to, text } from "../stores/translation";
</script>

<style>
  .wrapper {
    margin-top: 16px;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
  }
  .line {
    border-top: 1px solid #b6b6b6;
    width: 90%;
    margin: 8px auto 16px;
  }
  a {
    border-bottom: 1px solid #4a5568;
    color: inherit;
    outline: none;
    text-decoration: none;
  }
  a:hover {
    border-color: #1a202c;
  }
</style>

<div class="wrapper">
  <div class="line" />
  <a
    href="https://www.bing.com/translator/?to={$to}&text={$text}"
    rel="noopener">
    Microsoft Translator
  </a>
</div>
