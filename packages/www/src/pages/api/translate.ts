import translate from '@vitalets/google-translate-api';

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  TranslateResponse,
  TranslationSuccess,
} from '../../../../common/types';

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

  const { pronunciation, alternatives, definitions } = parseRaw(resp.raw);

  res.status(200).json({
    from: resp.from.language.iso || from || 'auto',
    to,
    translation: {
      text: resp.text,
      pronunciation: resp.pronunciation || pronunciation,
      alternatives: resp.text.length > 40 ? undefined : alternatives,
      definitions,
    },
  });
}

function parseRaw(raw: any) {
  const [translation, more, _lang, definitionsData] = raw;
  const data: {
    pronunciation?: TranslationSuccess['pronunciation'];
    alternatives?: TranslationSuccess['alternatives'];
    definitions?: TranslationSuccess['definitions'];
  } = {};
  if (translation?.[0]) {
    data.pronunciation = translation?.[0];
  }
  if (!Array.isArray(more)) {
    return data;
  }
  // TODO: Array.at(-1) is not available yet
  const alternatives = takeLast(takeLast(more[0]?.[0])[0]);
  if (Array.isArray(alternatives) && alternatives.length > 1) {
    data.alternatives = alternatives.map((item: [string, [number]]) => item[0]);
  }

  const definitions = definitionsData?.[1]?.[0];
  if (Array.isArray(definitions)) {
    data.definitions = definitions.map(
      ([type, explanations]: [string, any[]]) => {
        return {
          type,
          explanations: explanations.map(
            ([explanation, example]: [string, string | null]) => ({
              explanation,
              example: example || undefined,
            })
          ),
        };
      }
    );
  }

  return data;
}

function takeLast(arr: any[]): any[] {
  if (!Array.isArray(arr)) {
    return [];
  }
  return Array.isArray(arr[arr.length - 1]) ? arr[arr.length - 1] : [];
}
