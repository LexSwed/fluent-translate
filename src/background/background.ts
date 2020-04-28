import { userLang, getTranslatorLink, getLanguages } from '../utils';

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
  chrome.tabs.create({
    url: getTranslatorLink({ to: userLang, text: info.selectionText })
  });
});
