import { getLanguages } from './_utils/microsoft-cognitive';
import withSentry from './_utils/withSentry';

export default withSentry(async (_req, res) => {
  const langs = await getLanguages();

  res.send(langs);
});
