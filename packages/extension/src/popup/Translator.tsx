import useSWR from 'swr';
import { TranslateResponse } from '../../../common/types';
import { API, useDebouncedValue } from '../utils';
import {
  useFromLanguage,
  useInputText,
  useToLanguage,
  useUpdateError,
} from './atoms';

/**
 * I use `swr` to avoid saving multiple responses to atom.
 * `swr` allows to ignore resolved promises when a new one is out
 * */
export function useTranslation(): Translation {
  const [text] = useInputText();
  const [from] = useFromLanguage();
  const [to] = useToLanguage();
  const setError = useUpdateError();

  const debouncedText = useDebouncedValue(text, 500);

  // TODO: when Switch button is used, debouncedText is delayed, while from and to are updated
  // TODO: this makes swr to make 2 request, with old text first, then with debouncedText
  const { data, isValidating } = useSWR(
    { text: debouncedText, from, to },
    API.translate,
    {
      onError: setError,
      revalidateOnFocus: false,
    }
  );

  if (!data?.translation) {
    return {
      from: '',
      to: '',
      translation: null,
      status: isValidating ? 'fetching' : 'initial',
    };
  }

  return {
    status: 'done',
    from: data.from,
    to: data.to,
    translation: data.translation,
  };
}

type Translation = TranslateResponse & {
  status: 'initial' | 'done' | 'fetching';
};
