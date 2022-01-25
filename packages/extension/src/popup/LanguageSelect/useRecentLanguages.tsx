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
    if (!langKey || langKey === 'auto') {
      return;
    }

    const recentLanguages = Array.from(new Set([langKey, ...lastItems])).slice(
      0,
      4
    );

    Storage.setItems({ recentLanguages });

    mutate(recentLanguages);
  };

  return [lastItems, addRecent] as const;
}
