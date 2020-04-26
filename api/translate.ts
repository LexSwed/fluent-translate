import { NowRequest, NowResponse } from '@now/node';
import config from './config';
import { translate } from './_utils/bing';

export default async (req: NowRequest, res: NowResponse) => {
  const { to, from, text } = req.query as TranslateQuery;

  try {
    const Text = text.slice(0, config.maxLength);

    const translated = await translate({
      to,
      from,
      text
    });

    const body: TranslateResponse = {
      from: from ? from : translated.from,
      to: translated.to,
      translation: {
        text: translated.text,
        truncated: text.length > Text.length
      }
    };

    res.send(body);
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
};
