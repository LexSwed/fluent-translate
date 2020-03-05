import { writable, readable, derived, get } from 'svelte/store';
import debounce from 'lodash.debounce';
import * as api from '../api';

export const userLang = window.navigator.language.slice(0, 2) || window.navigator.languages[0].slice(0, 2);

export const languages = writable({
  auto: {
    name: 'Auto',
    nativeName: 'Auto'
  }
});

api.getLanguages().then(langs => {
  languages.update(state => Object.assign(state, langs));
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

  const res = await api.translate({
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
