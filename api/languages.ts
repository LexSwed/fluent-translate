import { NowRequest, NowResponse } from '@now/node';
import { getLanguages } from './_utils/microsoft-cognitive';

export default async (_req: NowRequest, res: NowResponse) => {
  const langs = await getLanguages();

  res.send(langs);
};
