import useSWR from 'swr';
import { Storage } from '../utils';

const fetcher = () =>
  Storage.getItems<{ recentLanguages: string[] | null }>(
    'recentLanguages'
  ).then((cache) => {
    if (cache.recentLanguages && Array.isArray(cache.recentLanguages)) {
      return cache.recentLanguages;
    }
    return [];
  });

export function useRecentLanguages() {
  const { data: lastItems = [], mutate } = useSWR('recentLanguages', fetcher);

  const addRecent = (langKey: string) => {
    if (langKey === 'auto') {
      return;
    }
    const updateRecent = (recentLanguages: string[]) => {
      Storage.setItems({ recentLanguages });

      mutate(recentLanguages);
    };
    const inListIndex = lastItems.findIndex((el) => el === langKey);

    if (inListIndex > -1) {
      lastItems.splice(inListIndex, 1);
      updateRecent([langKey, ...lastItems]);
    } else {
      const [first, second] = lastItems;
      updateRecent(Array.from(new Set([langKey, first, second])));
    }
  };

  return [lastItems, addRecent] as const;
}
