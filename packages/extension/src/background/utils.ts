import { stringify } from 'qs';
import { debounce } from 'debounce';
import { nanoid } from 'nanoid';

import { Storage } from '../utils';

const baseURL = 'https://edge-translate.now.sh';

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

export const addMemoryItem = debounce(
  async ({ text, to, from, translation }: Omit<MemoryItem, 'id'>) => {
    if (text.length > 40) {
      return;
    }

    const { memory = [] } = await Storage.getSyncItems<{
      memory: MemoryItems;
    }>('memory');

    const textIndex = memory.findIndex((item) => item.text === text);
    const item = memory[textIndex];

    if (item) {
      memory.splice(textIndex, 1);
    }

    memory.unshift({
      id: item ? item.id : nanoid(),
      text,
      to,
      from,
      translation,
    });

    await Storage.setSyncItems({ memory: memory.slice(0, 100) });
  },
  3000
);
