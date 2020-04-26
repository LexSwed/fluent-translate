import fetch from 'node-fetch';
import { stringify } from 'qs';

import SuperError from './error';

export async function translate({ to, from, text }: TranslateQuery) {
  const [{ detectedLanguage, translations }] = await fetch(
    'https://www.bing.com/ttranslatev3',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: stringify({ to, fromLang: from || 'auto-detect', text })
    }
  ).then(res => {
    const { status, statusText } = res;

    if (status === 200) {
      return res.json();
    } else {
      throw new SuperError('Wrong status returned', { status, statusText });
    }
  });

  return {
    from: detectedLanguage ? detectedLanguage.language : null,
    to: translations[0].to,
    text: translations[0].text
  };
}
