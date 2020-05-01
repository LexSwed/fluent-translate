import { getLanguages, translate } from '../utils';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: 'Translate with Edge Translate',
    id: 'parent',
    type: 'normal',
    contexts: ['selection']
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
    console.log(request);
    switch (request.request) {
      case 'getLanguages': {
        getLanguages().then(sendResponse);
        break;
      }
      case 'translate': {
        translate(request.params).then(sendResponse);
        break;
      }
    }

    return true;
  }
);
// function(request, sender, sendResponse) {
//   if (request.contentScriptQuery == "queryPrice") {
//     var url = "https://another-site.com/price-query?itemId=" +
//             encodeURIComponent(request.itemId);
//     fetch(url)
//         .then(response => response.text())
//         .then(text => parsePrice(text))
//         .then(price => sendResponse(price))
//         .catch(error => ...)
//     return true;  // Will respond asynchronously.
//   }
// });
