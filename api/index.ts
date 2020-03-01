import { NowRequest, NowResponse } from '@now/node';

export default (req: NowRequest, res: NowResponse) => {
  console.log(process.env.AZURE_KEY);
  res.send('Hello world');
};
