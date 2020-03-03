import { writable, readable, derived, get } from 'svelte/store';
import debounce from 'lodash.debounce';
import * as api from '../api';

export const userLang = window.navigator.language.slice(0, 2) || window.navigator.languages[0].slice(0, 2);
const langsPromise = api.getLanguages();

export const languages = readable(
  {
    auto: {
      name: 'Auto',
      nativeName: 'Auto'
    }
  },
  async set => {
    const languages = await langsPromise;

    set({
      auto: {
        name: 'Auto',
        nativeName: 'Auto'
      },
      ...languages
    });
  }
);

export const from = writable('auto');
export const to = writable(userLang);
export const text = writable('');

const translateDebounced = debounce(async function([$from, $to, $text], set) {
  if ($text.length < 2) {
    set('');

    return;
  }
  translating.set(true);

  const res = await api.translate({
    // let guess language if Auto is selected
    from: $from === 'auto' ? undefined : $from,
    // user lang
    to: $to,
    text: $text
  });

  translating.set(false);
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
