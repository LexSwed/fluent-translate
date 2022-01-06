import { memo } from 'react';
import { Text, Flex, Box, Menu, Button, CssStyles } from '@fxtrot/ui';

import { ToLanguageSelect } from '../LanguageSelect';
import { useTranslation } from '../atoms';

export const Translated = memo(() => {
  const { translation } = useTranslation();

  if (!translation) {
    return null;
  }
  console.log(translation);
  const { text, pronunciation, alternatives } = translation;
  return (
    <Box p="$3" pb="$6">
      <Flex flow="column" gap="2" cross="stretch">
        <ToLanguageSelect />
        <Flex flow="column" gap="1" cross="start" css={{ pl: '$1' }}>
          {alternatives ? (
            <Menu>
              <Button
                aria-label="Alternative translations"
                size="sm"
                variant="flat"
                css={styles.moreButton}
              >
                {text}
              </Button>
              <Menu.List side="top" css={{ bc: '$surfaceHover', p: '$3' }}>
                {alternatives.map((alt) => (
                  <Menu.Item size="sm" css={styles.item} key={alt}>
                    {alt}
                  </Menu.Item>
                ))}
              </Menu.List>
            </Menu>
          ) : (
            <Text size="md">{text}</Text>
          )}

          {pronunciation && (
            <Text size="sm" css={styles.pronunciation}>
              {pronunciation}
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
});

const styles: Record<string, CssStyles> = {
  moreButton: {
    ml: '-$2',
    whiteSpace: 'break-spaces',
    py: '$1',
    height: 'auto',
    textSize: '$md',
    textAlign: 'start',
  },
  item: {
    bc: 'transparent !important',
  },
  pronunciation: { color: '$textSubtle' },
};
