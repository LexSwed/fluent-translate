import translate from '@vitalets/google-translate-api';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  from: string;
  to: string;
  translation?: {
    text: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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

  res.status(200).json({
    from: resp.from.language.iso || from || 'auto',
    to,
    translation: { text: resp.text },
  });
}
