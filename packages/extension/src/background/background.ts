import { getLanguages, translate, addMemoryItem } from './utils';

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
    switch (request.request) {
      case 'getLanguages': {
        getLanguages().then(sendResponse);
        break;
      }
      case 'translate': {
        translate(request.params).then((res) => {
          addMemoryItem({
            text: request.params.text,
            from: res.from || request.params.from || 'auto',
            to: res.to || request.params.to,
            translation: res.translation.text,
          });
          sendResponse(res);
        });
        break;
      }
    }

    return true;
  }
);
