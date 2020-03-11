<img src="icons/icon.svg" height="120px" align="right"/>

# edge-translate

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Translator extension for Microsoft Edge using Microsoft Translator

<img src="demo.gif" height="300px" />

## How it works

Extension consists of two main scripts: `popup` and `background`.

### `background`

The script subscribes to [`chrome.runtime.onInstalled`](https://developer.chrome.com/extensions/runtime#event-onInstalled) via `.addListener(callback)` so that the callback is executed once you installed the extension. In the callback extension fetches list of available languages and sets them to [`chrome.storage.local`](https://developer.chrome.com/apps/storage) (no point to use `storage.sync` to sync data between browsers).
The script also adds an entry to contextual menu, only when you right-click on selected text. This is because we want to redirect user to the [Bing Translator](https://www.bing.com/translator) with selected text already pre-filled.

### `popup`

`popup.js` has all the Svelte3 app which is displayed when user clicks on the icon in the tool bar. The app takes available languages from [`chrome.storage.local`](https://developer.chrome.com/apps/storage) to display them in the language selectors. Entered text with selected `to` and `from` languages is then sent to the BE (see [API](#API)).
Language to translate the text to is saved to [`chrome.storage.local`](https://developer.chrome.com/apps/storage) as well to preserve user preferred language. By default, language to translate to is user's browser language.

## API

This extension uses [Microsoft Translator Text API](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/). Since the only way to get access to the API isby using a [subscription key](https://docs.microsoft.com/en-us/azure/cognitive-services/authentication), this extension is using free [`zeit.co` Serverless Functions](https://zeit.co/docs/v2/serverless-functions/introduction). This enables to have a proxy which enriches requests from the extension to the `Microsoft Translator Text API` with needed Subscription Key. This key is exposed via `env` variable `AZURE_KEY`. Thanks to [`zeit.co` secrets management](https://zeit.co/docs/v2/serverless-functions/env-and-secrets#), that key can be saved for production environment.

### GET /languages

Returns the list of supported languages, see [Microsoft Translator Text API](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-languages)

### GET /translate?from=langCode&to=langCode&text=text

| Param | Description                     | Example |
| ----- | ------------------------------- | :-----: |
| to    | Language code to translate to   |   fr    |
| from  | Language code to translate from |   en    |
| text  | Text to translate               | Hello!  |

Translates `text` from language `from` to language `to`, see [Microsoft Translator Text API](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate). Text length is restricted by the [config](https://github.com/LexSwed/edge-translate/blob/master/config/consts.js).

## To do

- [ ] Tests
- [ ] Handle errors
- [ ] Publish
- [ ] Add content scripts for one click translation (via on-page popup)
