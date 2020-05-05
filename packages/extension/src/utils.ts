import { stringify } from 'qs';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://edge-translate.lexswed.now.sh'
    : 'http://localhost:3000';

const request = <T = any>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  return fetch(
    `${baseURL}${url}${stringify(params, { addQueryPrefix: true })}`,
    params
  ).then((res) => res.json());
};

export const getLanguages = () => request('/api/languages');

export const translate = (params: TranslateQuery): Promise<TranslateResponse> =>
  request<TranslateResponse>('/api/translate', params);

export const userLang =
  window.navigator.language.slice(0, 2) ||
  window.navigator.languages[0].slice(0, 2);

export const getTranslatorLink = ({
  to,
  text
}: {
  to?: string;
  text?: string;
}) => `https://www.bing.com/translator?to=${to}&text=${text}`;

export const API = {
  getLanguages: () => {
    return new Promise((resolve) =>
      chrome.runtime.sendMessage({ request: 'getLanguages' }, resolve)
    );
  },
  translate: (params: TranslateQuery): Promise<TranslateResponse> => {
    return new Promise((resolve) =>
      chrome.runtime.sendMessage({ request: 'translate', params }, resolve)
    );
  }
};

export const setStorageTo = (to: string) => {
  return new Promise((resolve) => chrome.storage.local.set({ to }, resolve));
};

export const updateHistory = async ({
  text,
  to,
  from,
  translation
}: HistoryItem) => {
  if (text.length > 20) {
    return;
  }

  const { history } = await getStorageItems<{ history: HistoryItems }>(
    'history'
  );

  history.push({ text, to, from, translation });

  return new Promise((resolve) => {
    chrome.storage.sync.set({ history }, resolve);
  });
};

export function getStorageItems<T extends Record<string, any>>(
  item: string | string[]
): Promise<T> {
  return new Promise((resolve) => {
    chrome.storage.local.get(item, (caches) => resolve(caches as T));
  });
}
