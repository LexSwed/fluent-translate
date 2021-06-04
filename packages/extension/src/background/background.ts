import { addMemoryItem } from './utils';
import { translate, dictLookup } from './api';
import { Sentry, Storage } from '../utils';
import { languages } from './languages';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: 'Translate with Edge Translate',
    id: 'parent',
    type: 'normal',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab.id) {
      return;
    }

    chrome.tabs.sendMessage(tab.id, { text: info.selectionText });
  });
});

chrome.runtime.onMessage.addListener(
  (request: AsyncRequest, _sender, sendResponse) => {
    let promise: Promise<any> | null;
    switch (request.request) {
      case 'translateBing': {
        promise = translate(request.params).then((res) => {
          if (res !== null) {
            addMemoryItem({
              text: request.params.text,
              from: res.from || request.params.from || 'auto',
              to: res.to || request.params.to,
              translation: res.translation.text,
            });
          }
          console.log(res);
          return res;
        });
        break;
      }
      case 'dictionaryLookup': {
        promise = dictLookup(request.params);
        break;
      }
    }
    if (promise) {
      promise
        .then((res) => sendResponse({ ok: true, data: res }))
        .catch((err) => {
          Sentry.captureException(err.message, { data: request.params });
          sendResponse({ ok: false, message: err.message });
        });
    }
    return true;
  }
);

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  const { memory } = await Storage.getSyncItems<{ memory: MemoryItems }>(
    'memory'
  );

  const newMemoryWithGoogleLanguageCode: MemoryItems = [];
  for (let item of memory) {
    if ((languages as any)[item.from] && (languages as any)[item.to]) {
      newMemoryWithGoogleLanguageCode.push(item);
    }
  }
  switch (reason) {
    case 'install':
    case 'update':
      chrome.storage.local.set({
        languages,
        memory: newMemoryWithGoogleLanguageCode,
      });
    default:
      break;
  }
});
