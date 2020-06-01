import qs from 'qs';
import { uuid } from 'uuidv4';
import { Sentry } from '../utils';

export async function getLanguages() {
  try {
    const { translation } = await makeRequest(
      'https://api.cognitive.microsofttranslator.com/languages?' +
        qs.stringify({
          'api-version': '3.0',
        }),
      {
        headers: {
          'Content-type': 'application/json',
          'X-ClientTraceId': uuid().toString(),
        },
      }
    );

    return translation;
  } catch (error) {
    Sentry.captureException(error);
  }
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

  try {
    const [{ detectedLanguage, translations }] = res;

    return {
      from: detectedLanguage ? detectedLanguage.language : null,
      to: translations[0].to,
      translation: {
        text: translations[0].text,
        truncated: text.length > query.length,
      },
    };
  } catch (error) {
    Sentry.captureException(error.message, { data: { res, from, to, text } });
  }

  return null;
}

export async function dictLookup({
  to,
  from,
  text,
}: Required<TranslateQuery>): Promise<DictLookup | null> {
  if (text.split(/\s/).length > 1) {
    return null;
  }

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

  try {
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
    Sentry.captureException(error.message, {
      data: { response, from, to, text },
    });
  }

  return null;
}

async function makeRequest(...params: Parameters<typeof fetch>) {
  try {
    const response = await fetch(...params).then((res) => res.json());

    if (response.statusCode === 400) {
      throw new Error('Request went wrong');
    }

    return response;
  } catch (error) {
    Sentry.captureException(error.message, {
      data: { url: params[0], data: params[1] },
    });
  }
  return null;
}
