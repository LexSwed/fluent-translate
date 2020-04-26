import fetch from 'node-fetch';
import { stringify } from 'qs';

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
  ).then(res => res.json());

  return {
    from: detectedLanguage ? detectedLanguage.language : null,
    to: translations[0].to,
    text: translations[0].text
  };
}
