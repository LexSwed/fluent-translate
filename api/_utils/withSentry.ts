import * as Sentry from '@sentry/node';
import { NowRequest, NowResponse } from '@now/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN
});

function withSentry(handler: (req: NowRequest, res: NowResponse) => any) {
  return async (req: NowRequest, res: NowResponse) => {
    try {
      return await handler(req, res);
    } catch (error) {
      Sentry.captureException(error);

      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }

      return error;
    }
  };
}

export default withSentry;
