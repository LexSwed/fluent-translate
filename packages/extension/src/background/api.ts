import { isNextEnv } from '../isNextEnv';

export async function translate({ to, from, text }: TranslateQuery) {
  const url = new URL(
    isNextEnv
      ? window.location.origin + '/api/translate'
      : 'https://edge-translate.vercel.app/api/translate'
  );
  // const url = new URL('http://localhost:3000/api/translate');
  url.searchParams.append('to', to);
  if (from) {
    url.searchParams.append('from', from);
  }
  url.searchParams.append('text', text);

  return makeRequest(url.toString());
}

const msg = (status: string | number) => `Translator responded with ${status}.
Unfortunately, this app is free and uses free version of Google Translate and other free services. Hence, it restricts the number of translation requests. Try again a bit later.`;

async function makeRequest(...params: Parameters<typeof fetch>) {
  return fetch(...params)
    .then((res) => {
      if (res.status !== 200) {
        throw Error(msg(res.status));
      }
      return res;
    })
    .then((res) => res.json())
    .then((res) => {
      if (!res || res.statusCode) {
        throw Error(msg(res?.statusCode));
      }

      return res;
    });
}
