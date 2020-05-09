import React, { useEffect, useState } from 'react';
import { Storage } from '../../utils';

type Props = {
  recent: string[];
  languages: Languages;
};

const RecentLanguages: React.FC<Props> = ({ recent, languages }) => {
  if (!recent.length) {
    return null;
  }

  return (
    <optgroup label="Recently used">
      {recent.map(
        (lang) =>
          languages[lang] && (
            <option key={lang} value={lang} title={languages[lang].nativeName}>
              {languages[lang].name}
            </option>
          )
      )}
    </optgroup>
  );
};

export default RecentLanguages;

export function useRecentLanguages() {
  const [lastItems, setLastItems] = useState<string[]>([]);

  useEffect(() => {
    Storage.getItems('recentLanguages').then((cache) => {
      if (cache.recentLanguages && Array.isArray(cache.recentLanguages)) {
        setLastItems(cache.recentLanguages);
      }
    });
  }, []);

  const updateRecent = (recentLanguages: string[]) => {
    Storage.setItems({ recentLanguages });

    setLastItems(recentLanguages);
  };

  const addRecent = (langKey: string) => {
    if (langKey === 'auto') {
      return;
    }
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
