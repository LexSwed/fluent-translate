import * as Sentry from '@sentry/node';
import { NowRequest, NowResponse } from '@now/node';

Sentry.init({
  dsn:
    'https://dffd96a87e8f47e8a2921033d3d53e05@o383828.ingest.sentry.io/5214268'
});

function withSentry(handler: (req: NowRequest, res: NowResponse) => any) {
  return async (req: NowRequest, res: NowResponse) => {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
      await Sentry.flush(2000);
      return error;
    }
  };
}

export default withSentry;
