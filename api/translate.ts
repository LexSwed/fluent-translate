import { NowRequest, NowResponse } from '@now/node';
import { post } from './_utils/fetch';
import config from './config';

export default async (req: NowRequest, res: NowResponse) => {
  const { to, from, text } = req.query;

  try {
    const Text = text.slice(0, config.maxLength);
    const [{ detectedLanguage, translations }] = await post('/translate', {
      body: [{ Text }],
      query: { to, from }
    });

    res.send({
      from: from ? from : detectedLanguage ? detectedLanguage.language : null,
      to: translations[0].to,
      translation: {
        text: translations[0].text,
        truncated: text.length > Text.length
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
};
