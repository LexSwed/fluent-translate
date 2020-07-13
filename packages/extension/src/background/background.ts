import { addMemoryItem } from './utils';
import { getLanguages, translateBing, dictLookup } from './api';
import { Sentry } from '../utils';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: 'Translate with Edge Translate',
    id: 'parent',
    type: 'normal',
    contexts: ['selection'],
  });

  getLanguages().then((languages) => {
    chrome.storage.local.set({ languages });
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
      case 'getLanguages': {
        promise = getLanguages();
        break;
      }
      case 'translateBing': {
        promise = translateBing(request.params).then((res) => {
          if (res !== null) {
            addMemoryItem({
              text: request.params.text,
              from: res.from || request.params.from || 'auto',
              to: res.to || request.params.to,
              translation: res.translation.text,
            });
          }

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
