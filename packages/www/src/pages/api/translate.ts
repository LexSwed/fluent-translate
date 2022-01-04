import translate from '@vitalets/google-translate-api';

import type { NextApiRequest, NextApiResponse } from 'next';
import { TranslateResponse } from '../../../../common/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranslateResponse>
) {
  const { text, from, to } = req.query as {
    text: string;
    from?: string;
    to: string;
  };
  const resp = await translate(text, { from, to });

  if (!resp) {
    res.status(400);
  }

  const { pronunciation, alternatives } = parseRaw(resp.raw);

  res.status(200).json({
    from: resp.from.language.iso || from || 'auto',
    to,
    translation: {
      text: resp.text,
      pronunciation: resp.pronunciation || pronunciation,
      alternatives,
    },
  });
}

function parseRaw(raw: any) {
  const [translation, moreData] = raw;
  const data: {
    pronunciation?: string;
    alternatives?: string[];
  } = {};
  if (translation?.[0]) {
    data.pronunciation = translation?.[0];
  }
  if (!Array.isArray(moreData)) {
    return data;
  }

  // TODO: Array.at(-1) is not available yet
  const alternatives = moreData[0]?.[0]?.[moreData[0]?.[0]?.length - 1];
  if (Array.isArray(alternatives)) {
    // TODO: Array.at(-1) is not available yet
    data.alternatives = alternatives[0][alternatives[0].length - 1]?.map(
      (item: [string, [number]]) => item[0]
    );
  }

  return data;
}
