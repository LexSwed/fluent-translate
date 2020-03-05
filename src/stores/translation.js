import { writable, derived } from 'svelte/store';
import debounce from 'lodash.debounce';

import { userLang, translate } from '../utils';

export const languages = writable({
  auto: {
    name: 'Auto',
    nativeName: 'Auto'
  }
});

chrome.storage.local.get(['languages'], cache => {
  languages.update(state => ({ ...state, ...cache.languages }));
});

export const from = writable('auto');
export const to = writable(userLang);
export const text = writable('');

const translateDebounced = debounce(async function([$from, $to, $text], set) {
  if ($text.length < 2) {
    set('');

    return;
  }
  translating.set(true);

  const res = await translate({
    // let guess language if Auto is selected
    from: $from === 'auto' ? undefined : $from,
    // user lang
    to: $to,
    text: $text
  });

  translating.set(false);

  if (res.from) {
    languages.update(langs => {
      const name = langs[res.from].name + ' | Auto';
      const nativeName = langs[res.from].nativeName + ' | Auto';

      return { ...langs, auto: { name, nativeName } };
    });
  }
  to.set(res.to);
  set(res.translation);
}, 300);

export const translating = writable(false);
export const translation = derived(
  [from, to, text],
  (params, set) => {
    translateDebounced(params, set);

    return () => {
      translateDebounced.cancel();
    };
  },
  ''
);

export default store;
