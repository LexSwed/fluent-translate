import { isSupported } from './languages';
import type { TranslateResponse, TranslationSuccess } from '@shared/types';

type TranslateOptions = {
  from?: string;
  to?: string;
};

export async function translate(
  text: string,
  { from = 'auto', to = 'en' }: TranslateOptions
): Promise<TranslateResponse> {
  [from, to].forEach((code) => {
    if (!isSupported(code)) {
      throw new Error(`Unsupported language code: ${code}`);
    }
  });

  const initRequestResponse = await fetch('https://translate.google.com', {
    method: 'get',
  }).then((res) => res.text());

  const googleParams = new URLSearchParams({
    'rpcids': 'MkEWBc',
    'f.sid': extract('FdrFJe', initRequestResponse),
    'bl': extract('cfb2h', initRequestResponse),
    'hl': 'en-US',
    'soc-app': '1',
    'soc-platform': '1',
    'soc-device': '1',
    '_reqid': `${Math.floor(1000 + Math.random() * 9000)}`,
    'rt': 'c',
  });

  const translateUrl = new URL(
    `https://translate.google.com/_/TranslateWebserverUi/data/batchexecute?${googleParams.toString()}`
  );

  const translateResponse = await fetch(translateUrl.toString(), {
    method: 'post',
    body: `f.req=${encodeURIComponent(
      JSON.stringify([
        [
          [
            'MkEWBc',
            JSON.stringify([[text, from, to, true], [null]]),
            null,
            'generic',
          ],
        ],
      ])
    )}&`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });

  if (translateResponse.status !== 200) {
    throw new Error(
      `Google Translate API returned ${translateResponse.status}`
    );
  }

  try {
    const json = await parseResponse(translateResponse);

    const source = extractSourceLanguageData(json);
    const text = extractText(json);
    const pronunciation = extractPronounciation(json);
    const alternatives =
      text.length > 40 ? undefined : extractAlternatives(json);
    const definitions = extractDefinitions(json);

    return {
      from: source.language.iso || from,
      to,
      translation: {
        text: text,
        pronunciation,
        alternatives,
        definitions,
      },
    };
  } catch (error) {
    throw new Error('Error parsing response from Google Translate API');
  }
}

function extract(key: string, respBody: string): string {
  if (!respBody) {
    return '';
  }
  const regex = new RegExp(`"${key}":".*?"`);
  const result = regex.exec(respBody);
  if (result !== null) {
    return result[0].replace(`"${key}":"`, '').slice(0, -1);
  }
  return '';
}

async function parseResponse(resp: Response): Promise<any> {
  const translateRaw = await resp.text();

  let json = translateRaw.slice(6);
  let length = '';

  length = /^\d+/.exec(json)?.[0] || '';
  json = JSON.parse(
    json.slice(length.length, parseInt(length, 10) + length.length)
  );

  return JSON.parse(json[0][2]);
}

/** Taken from source: https://github.com/vitalets/google-translate-api/blob/master/index.js */
function extractText(json: any): string {
  if (json[1][0][0][5] === undefined || json[1][0][0][5] === null) {
    // translation not found, could be a hyperlink or gender-specific translation?
    return json[1][0][0][0];
  } else {
    return (
      json[1][0][0][5]
        .map((obj: string[]) => obj[0])
        .filter(Boolean)
        // Google api seems to split text per sentences by <dot><space>
        // So we join text back with spaces.
        // See: https://github.com/vitalets/google-translate-api/issues/73
        .join(' ')
    );
  }
}

function extractPronounciation(json: any): TranslationSuccess['pronunciation'] {
  return json[1][0][0][1] || json[0]?.[0];
}

function extractDefinitions(json: any): TranslationSuccess['definitions'] {
  const definitions = json[3]?.[1]?.[0];
  if (Array.isArray(definitions)) {
    return definitions.map(([type, explanations]: [string, any[]]) => {
      return {
        type,
        explanations: explanations.map(
          ([explanation, example]: [string, string | null]) => ({
            explanation,
            example: example || undefined,
          })
        ),
      };
    });
  }
  return;
}

function extractAlternatives(json: any): TranslationSuccess['alternatives'] {
  // TODO: Array.at(-1) is not available yet
  const alternatives = takeLast(takeLast(json[1]?.[0]?.[0])[0]);
  if (Array.isArray(alternatives) && alternatives.length > 1) {
    return alternatives.map((item: [string, [number]]) => item[0]);
  }

  return;
}

function takeLast(arr: any[]): any[] {
  if (!Array.isArray(arr)) {
    return [];
  }
  return Array.isArray(arr[arr.length - 1]) ? arr[arr.length - 1] : [];
}

type SourceLanguageData = {
  language: {
    didYouMean: boolean;
    iso: string;
  };
  text: {
    value: string;
    autoCorrected: boolean;
    didYouMean: boolean;
  };
};
function extractSourceLanguageData(json: any): SourceLanguageData {
  const res: SourceLanguageData = {
    language: {
      didYouMean: false,
      iso: '',
    },
    text: {
      autoCorrected: false,
      value: '',
      didYouMean: false,
    },
  };
  // From language
  if (json[0] && json[0][1] && json[0][1][1]) {
    res.language.didYouMean = true;
    res.language.iso = json[0][1][1][0];
  } else if (json[1][3] === 'auto') {
    res.language.iso = json[2];
  } else {
    res.language.iso = json[1][3];
  }

  // Did you mean & autocorrect
  if (json[0] && json[0][1] && json[0][1][0]) {
    var str = json[0][1][0][0][1];

    str = str.replace(/<b>(<i>)?/g, '[');
    str = str.replace(/(<\/i>)?<\/b>/g, ']');

    res.text.value = str;

    if (json[0][1][0][2] === 1) {
      res.text.autoCorrected = true;
    } else {
      res.text.didYouMean = true;
    }
  }

  return res;
}
