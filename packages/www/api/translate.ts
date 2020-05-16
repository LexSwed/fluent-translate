import config from './config';
import { translate } from './_utils/google';
import withSentry from './_utils/withSentry';

const translateHandler: Parameters<typeof withSentry>[0] = async (req, res) => {
  const { to, from, text } = req.query as TranslateQuery;
  const textTruncated = text.slice(0, config.maxLength);

  const translated = await translate({
    to,
    from,
    text: textTruncated,
  });

  const body: TranslateResponse = {
    from: from ? from : translated.from,
    to: translated.to,
    translation: {
      text: translated.text,
      truncated: text.length > textTruncated.length,
    },
  };

  res.send(body);
};

export default withSentry(translateHandler);
