import qs from 'qs';
import { uuid } from 'uuidv4';
import { Sentry } from '../utils';

export async function getLanguages() {
  try {
    const { translation } = await fetch(
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
    ).then((res) => res.json());

    return translation;
  } catch (error) {
    Sentry.captureException(error);
  }
}

export async function translateBing({ to, from, text }: TranslateQuery) {
  const query = text.slice(0, 300);

  const res = await fetch('https://www.bing.com/ttranslatev3', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: qs.stringify({ to, fromLang: from || 'auto-detect', text: query }),
  }).then((res) => res.json());

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
