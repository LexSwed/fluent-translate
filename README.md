<img src="packages/extension/src/assets/icons/icon.svg" height="120px" align="right"/>

# Fluent Translate

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Translator extension for Chromium browsers

<!-- <img src="public/images/demo.gif" height="300px" /> -->

## Development

This monorepo consists of `www` and `extension` workspaces. To start local dev server for extension, run:

```bash
yarn dev:ext
```

For the landing page:

```bash
yarn dev:www
```

See the rest of the commands inside respective folders in `packages/\*/package.json#scripts

## Parts

- `packages/extension/src/popup` is the central UI, holding all the visuals.
- `packages/extension/src/background` is the "BE" logic that makes API requests for translations and adds successfully translated text to the sync storage (aka `Memory`).
- `packages/extension/src/content` is the content script that is using some of the `popup` visuals, state and `React` context to show the translation on page in a dialog window. It is installed as a `Web Component` to not leak the styles.
- `packages/www/` is a `Next.js` website for Fluent Translate deployed on Vercel. It's prety static and could use `Remix` (is it still a thing?), but it's already fast enough and Vercel integration is just great. The website renders the extension using `env` variable teling the source code if the bundler is for the browser environment (`Next.js`) or extension, hence avoid using Web Extension API. Ideally, `popup` could live in the `shared` folder, using dependency injection for browser/WebExtension API, but the world isn't ideal, and so isn't the extension.
- `packages/www/src/pages/api/_middleware` is a Worker running on the edge using [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions). It is super fast and does the job being a middleware between extension UI and Google Translate.
- `packages/shared` is a place for shared utils between the extension and the website (although so far not really)

## API

Uses [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions) and Google Translate internal API, used in [vitalets/google-translate-api](https://github.com/vitalets/google-translate-api).

### GET /translate?from=langCode&to=langCode&text=text

| Param | Description                     | Example |
| ----- | ------------------------------- | :-----: |
| to    | Language code to translate to   |   fr    |
| from  | Language code to translate from |   en    |
| text  | Text to translate               | Hello!  |
