import { useEffect, useState } from 'react';
import { Storage } from '../../utils';
import { Option } from './styled';

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
            <Option key={lang} value={lang}>
              {languages[lang]}
            </Option>
          )
      )}
    </optgroup>
  );
};

export default RecentLanguages;

export function useRecentLanguages() {
  const [lastItems, setLastItems] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    Storage.getItems('recentLanguages').then((cache) => {
      if (
        mounted &&
        cache.recentLanguages &&
        Array.isArray(cache.recentLanguages)
      ) {
        setLastItems(cache.recentLanguages);
      }
    });

    return () => {
      mounted = false;
    };
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
