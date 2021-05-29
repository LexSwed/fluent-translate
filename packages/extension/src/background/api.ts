import qs from 'qs';
import { v4 } from 'uuid';

export async function getLanguages() {
  const { translation } = await makeRequest(
    'https://api.cognitive.microsofttranslator.com/languages?' +
      qs.stringify({
        'api-version': '3.0',
      }),
    {
      headers: {
        'Content-type': 'application/json',
        'X-ClientTraceId': v4().toString(),
      },
    }
  );

  return translation;
}

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
  to,
  from,
  text,
}: Required<TranslateQuery>): Promise<DictLookup | null> {
  if (text.split(/\s/).length > 1) {
    return null;
  }

  try {
    const response: DictLookupResponse = await makeRequest(
      'https://www.bing.com/tlookupv3?isVertical=1',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: qs.stringify({ to, from: from || 'auto-detect', text }),
      }
    );

    const [{ displaySource, translations }] = response;

    const normalized = translations.reduce((res, tr) => {
      if (!Array.isArray(res[tr.posTag])) {
        res[tr.posTag] = [];
      }

      res[tr.posTag].push({
        source: displaySource,
        target: tr.displayTarget,
        confidence: tr.confidence,
        backTranslations: tr.backTranslations.map((bt) => bt.displayText),
      });

      return res;
    }, {} as DictLookup['translations']);

    return {
      from,
      to,
      source: text,
      translations: normalized,
    };
  } catch (error) {
    return null;
  }
}

const msg = (
  status: string | number
) => `Microsoft Bing Translator responded with ${status}.
Unfortunately, this app is free and uses free version of Microsoft Bing Translator and hence, it restricts the number of translation requests. Try again a bit later.`;

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
