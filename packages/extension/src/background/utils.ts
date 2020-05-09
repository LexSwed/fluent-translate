import { stringify } from 'qs';
import { debounce } from 'debounce';

import { Storage } from '../utils';

const baseURL = 'https://edge-translate.lexswed.now.sh';

const request = <T = any>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  return fetch(
    `${baseURL}${url}${stringify(params, { addQueryPrefix: true })}`,
    params
  ).then((res) => res.json());
};

export const getLanguages = () => request<Languages>('/api/languages');

export const translate = (params: TranslateQuery): Promise<TranslateResponse> =>
  request<TranslateResponse>('/api/translate', params);

export const addHistoryItem = debounce(
  async ({ text, to, from, translation }: HistoryItem) => {
    if (text.length > 40) {
      return;
    }

    const { history = [] } = await Storage.getSyncItems<{
      history: HistoryItems;
    }>('history');

    history.unshift({ text, to, from, translation });
    console.log('Save item', { text, from, to, translation });
    await Storage.setSyncItems({ history });
  },
  3000
);
