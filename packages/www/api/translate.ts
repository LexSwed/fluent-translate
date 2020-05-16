import config from './config';
import { translate } from './_utils/google';
import withSentry from './_utils/withSentry';

export default withSentry(async (req, res) => {
  const { to, from, text } = req.query as TranslateQuery;
  const Text = text.slice(0, config.maxLength);

  const translated = await translate({
    to,
    from,
    text,
  });

  const body: TranslateResponse = {
    from: from ? from : translated.from,
    to: translated.to,
    translation: {
      text: translated.text,
      truncated: text.length > Text.length,
    },
  };

  res.send(body);
});
