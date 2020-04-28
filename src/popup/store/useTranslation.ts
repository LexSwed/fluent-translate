import { useReducer, useEffect } from 'react';

import { translate } from '../../utils';

const initialState: Translation = {
  translating: false,
  truncated: false,
  text: '',
  from: '',
  to: ''
};

function useTranslationReducer({ text, from, to }: Params) {
  const [translation, dispatch] = useReducer(translationReducer, initialState);

  useEffect(() => {
    const id = setTimeout(async () => {
      if (text.length < 2) {
        dispatch({ type: 'textRemoved' });
        return;
      }

      dispatch({ type: 'translating' });

      const res = await translate({
        // let guess language if Auto is selected
        from: from === 'auto' ? undefined : from,
        // user lang
        to,
        text: text.trim()
      });

      dispatch({
        type: 'translated',
        payload: {
          ...res.translation,
          from: res.from,
          to: res.to
        }
      });
    }, 200);

    return () => clearTimeout(id);
  }, [text, from, to, dispatch]);

  return translation;
}

export default useTranslationReducer;

function translationReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'translating':
      return { ...state, from: '', to: '', translating: true };
    case 'translated':
      return { ...state, translating: false, ...action.payload };
    case 'textRemoved':
      return {
        ...state,
        text: ''
      };
    default:
      return state;
  }
}

type Params = {
  text: string;
  from: string;
  to: string;
};
