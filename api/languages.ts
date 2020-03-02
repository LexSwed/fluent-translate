import { NowRequest, NowResponse } from '@now/node';
import { get } from './_utils/fetch';

export default async (req: NowRequest, res: NowResponse) => {
  const { translation } = await get('/languages');
  res.send(translation);
};
