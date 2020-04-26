import fetch from 'node-fetch';
import { uuid } from 'uuidv4';
import qs from 'qs';

export function get(relativeUrl: string) {
  const url = `https://api.cognitive.microsofttranslator.com${relativeUrl}?${qs.stringify(
    {
      'api-version': '3.0'
    }
  )}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'X-ClientTraceId': uuid().toString()
    }
  }).then(res => res.json());
}

export function post(relativeUrl: string, { body, query }: PostParams) {
  const url = `https://api.cognitive.microsofttranslator.com${relativeUrl}?${qs.stringify(
    {
      'api-version': '3.0',
      ...query
    }
  )}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-ClientTraceId': uuid().toString(),
      'Ocp-Apim-Subscription-Key': process.env.AZURE_KEY || ''
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
}

type PostParams = {
  query?: object;
  body?: object;
};

if (!process.env.AZURE_KEY) {
  console.warn(
    "AZURE_KEY environment variable is not specified, /translate requests won't work!"
  );
}
