import fetch from 'node-fetch';
import { stringify } from 'qs';

import SuperError from './error';

const BASE_URL =
  'https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&dj=1';

export async function translate({ to, from, text }: TranslateQuery) {
  const res: TranslateResponse = await fetch(
    `${BASE_URL}&${stringify({ tl: to, sl: from || 'auto', q: text })}`,
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  ).then((res) => {
    const { status, statusText } = res;

    if (status === 200) {
      return res.json();
    } else {
      throw new SuperError('Wrong status returned', { status, statusText });
    }
  });

  try {
    const { sentences, src } = res;

    return {
      from: src || from || 'auto',
      to: to,
      text: sentences.map((s) => s.trans).join(''),
    };
  } catch (error) {
    throw new SuperError(error.message, { res, from, to, text });
  }
}

interface TranslateResponse {
  sentences: [
    {
      trans: string;
      orig: string;
    }
  ];
  src: string;
  spell: any;
}
