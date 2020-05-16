import fetch from 'node-fetch';
import { uuid } from 'uuidv4';
import qs from 'qs';

export async function getLanguages() {
  const { translation } = await fetchJSON('/languages');

  return translation;
}

export async function translate({ from, to, text }: TranslateQuery) {
  const url = `/translate?${qs.stringify({
    query: {
      to,
      from,
    },
  })}`;

  const [{ detectedLanguage, translations }] = await fetchJSON(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.AZURE_KEY || '',
    },
    body: JSON.stringify([{ Text: text }]),
  });

  return {
    from: detectedLanguage ? detectedLanguage.language : null,
    to: translations[0].to,
    text: translations[0].text,
  };
}

if (!process.env.AZURE_KEY) {
  console.warn(
    "AZURE_KEY environment variable is not specified, /translate requests won't work!"
  );
}

async function fetchJSON(
  relativeUrl: string,
  params: Parameters<typeof fetch>[1] = {}
) {
  const enhanced = {
    ...params,
    headers: {
      ...params.headers,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuid().toString(),
    },
  };

  const apiVersion = qs.stringify({
    'api-version': '3.0',
  });

  relativeUrl = relativeUrl.includes('?')
    ? `${relativeUrl}&${apiVersion}`
    : `${relativeUrl}?${apiVersion}`;

  const res = await fetch(
    `https://api.cognitive.microsofttranslator.com${relativeUrl}`,
    enhanced
  );

  return await res.json();
}
