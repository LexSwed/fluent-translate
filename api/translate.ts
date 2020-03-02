import { NowRequest, NowResponse } from '@now/node';
import { post } from './_utils/fetch';

export default async (req: NowRequest, res: NowResponse) => {
  const { to, from, text } = req.query;

  try {
    const [{ detectedLanguage, translations }] = await post('/translate', {
      body: [{ Text: text }],
      query: { to, from }
    });

    res.send({
      from: from ? from : detectedLanguage ? detectedLanguage.language : null,
      to: translations[0].to,
      translation: translations[0].text
    });
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
};
