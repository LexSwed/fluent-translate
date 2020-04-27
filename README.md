<img src="icons/icon.svg" height="120px" align="right"/>

# edge-translate

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Translator extension for Microsoft Edge using Microsoft Translator

<!-- <img src="public/images/demo.gif" height="300px" /> -->

### [🛤 Track progress](https://www.notion.so/lexswed/Edge-Translate-0fdfc85fee82448689ffd1dfb8f51c08)

## How it works

Extension consists of two main scripts: `popup` and `background`.

### `background`

The script subscribes to [`chrome.runtime.onInstalled`](https://developer.chrome.com/extensions/runtime#event-onInstalled) via `.addListener(callback)` so that the callback is executed once you installed the extension. In the callback extension fetches list of available languages and sets them to [`chrome.storage.local`](https://developer.chrome.com/apps/storage) (no point to use `storage.sync` to sync data between browsers).
The script also adds an entry to contextual menu, only when you right-click on selected text. This is because we want to redirect user to the [Bing Translator](https://www.bing.com/translator) with selected text already pre-filled.

### `popup`

`popup.js` has all the Svelte3 app which is displayed when user clicks on the icon in the tool bar. The app takes available languages from [`chrome.storage.local`](https://developer.chrome.com/apps/storage) to display them in the language selectors. Entered text with selected `to` and `from` languages is then sent to the BE (see [API](#API)).
Language to translate the text to is saved to [`chrome.storage.local`](https://developer.chrome.com/apps/storage) as well to preserve user preferred language. By default, language to translate to is user's browser language.

## API

The API is developed using [Vercel Serverless Functions](https://vercel.com/docs/runtimes#official-runtimes/node-js). It wraps Translations provider in a convenient API.
Translations provided by [Microsoft Translator Text API](https://docs.microsoft.com/en-us/azure/cognitive-services/translator).

### GET /languages

Returns the list of supported languages, see [Microsoft Translator Text API](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-languages)

### GET /translate?from=langCode&to=langCode&text=text

| Param | Description                     | Example |
| ----- | ------------------------------- | :-----: |
| to    | Language code to translate to   |   fr    |
| from  | Language code to translate from |   en    |
| text  | Text to translate               | Hello!  |

Translates `text` from language `from` to language `to`, see [Microsoft Translator Text API](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate).

## Development

This extension uses [Vercel](https://vercel.com) for easier switching of translation API provider.

You can start the development via:

```bash
npm run start
```

It will run [`now dev`](https://zeit.co/docs/now-cli#commands/dev) command which will use your imported `now` project config. This is handy for automatic pick up of environment variables from `.env` file and running Lambda functions in `/api` folder.
