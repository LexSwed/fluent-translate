import type { NextRequest } from 'next/server';
import { translate } from '../../../translate';

export async function middleware(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const text = params.get('text');

  if (!text) {
    return new Response('text is required', { status: 400 });
  }

  try {
    const data = await translate(text, {
      from: params.get('from') ?? undefined,
      to: params.get('to') ?? undefined,
    });

    const headers = new Headers({
      'Cache-Control': 's-maxage=86400',
      'Content-Type': 'application/json',
    });

    return new Response(JSON.stringify(data), {
      headers,
    });
  } catch (error: unknown) {
    return new Response((error as Error).message, { status: 500 });
  }
}
