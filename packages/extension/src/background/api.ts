import qs from 'qs';

export async function translate({ to, from, text }: TranslateQuery) {
  const url = `https://edge-translate.vercel.app/api/translate?${qs.stringify({
    to,
    from,
    text,
  })}`;

  return makeRequest(url);
}

export async function translateBing({ to, from, text }: TranslateQuery) {
  const query = text.slice(0, 300);

  const res = await makeRequest('https://www.bing.com/ttranslatev3', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: qs.stringify({ to, fromLang: from || 'auto-detect', text: query }),
  });

  if (!Array.isArray(res) || res.length === 0) {
    throw new Error('Wrong response');
  }

  const [{ detectedLanguage, translations }] = res;

  return {
    from: detectedLanguage ? detectedLanguage.language : null,
    to: translations[0].to,
    translation: {
      text: translations[0].text,
      truncated: text.length > query.length,
    },
  };
}

export async function dictLookup({
  from,
  text,
}: TranslateQuery): Promise<DictLookup[] | null> {
  if (text.split(/\s/).length > 1) {
    return null;
  }

  try {
    return await makeRequest(
      `https://api.dictionaryapi.dev/api/v2/entries/${from}/${text}`
    );
  } catch (error) {
    return null;
  }
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
