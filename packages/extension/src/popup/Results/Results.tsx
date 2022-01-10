import React from 'react';
import { Flex, Icon, styled } from '@fxtrot/ui';

import { Translated } from './Translated';
import { useTranslation } from '../atoms';

export const Result = React.memo(() => {
  const { translation } = useTranslation();

  return translation?.text ? (
    <Translated />
  ) : (
    <Wrapper flow="column" main="center" cross="center">
      <Icon as={LanguageIcon} size="3xl" />
    </Wrapper>
  );
});

const Wrapper = styled(Flex, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate3d(-50%, -50%, 0)',
  userSelect: 'none',
  height: '$24',
  color: '$textLight',
});

const LanguageIcon: React.FC = (props) => (
  <svg
    viewBox="0 0 480 480"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path d="M240 0a240 240 0 100 480 240 240 0 000-480zm208 324l-69 12c8-29 12-58 13-88h72c-1 26-7 52-16 76zM16 248h72c1 30 5 59 13 88l-69-12c-9-24-15-50-16-76zm16-92l69-12c-8 29-12 58-13 88H16c1-26 7-52 16-76zm216-28c29 1 57 3 86 8l28 5c9 30 13 60 14 91H248zm88-7c-29-5-58-8-88-9V16c46 5 86 47 108 108zm-104-9c-30 1-59 4-88 9l-20 3c22-61 62-103 108-108zm-86 24c29-5 57-7 86-8v104H104c1-31 5-61 14-91zm-42 112h128v104c-29-1-57-3-86-8l-28-5c-9-30-13-60-14-91zm40 111c29 5 58 8 88 9v96c-46-5-86-47-108-108zm104 9c30-1 59-4 88-9l20-3c-22 61-62 103-108 108zm86-24c-29 5-57 7-86 8V248h128c-1 31-5 61-14 91zm58-112c-1-30-5-59-13-88l69 12c9 24 15 50 16 76zm47-94l-65-11c-12-38-34-73-64-100 56 19 103 59 129 111zM170 27c-30 27-52 62-64 100l-65 11c26-52 73-92 129-111zM41 342l65 11c12 38 34 73 64 100-56-19-103-59-129-111zm269 111c30-27 52-62 64-100l65-11c-26 52-73 92-129 111zm0 0" />
  </svg>
);
