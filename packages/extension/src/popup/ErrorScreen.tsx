import { Box, Button, Flex, Icon, Text } from '@fxtrot/ui';
import { FireIcon } from '@heroicons/react/outline';
import { useLocale } from '../translations';
import { useError } from './atoms';

export const ErrorScreen = () => {
  const [, setError] = useError();
  const t = useLocale();

  return (
    <Box p="$3">
      <Flex flow="column" cross="center" main="center" gap="md">
        <Icon as={FireIcon} size="3xl" color="$gray400" />

        <>
          <Text align="center" size="sm">
            {t('error.line1')}
            <br />
            <br />
            {t('error.line2')}{' '}
            <span role="img" aria-label={t('error.bug')}>
              🐞
            </span>{' '}
            {t('error.line3')}
          </Text>
        </>

        <Flex main="center" cross="center">
          <Button onClick={() => setError(null)}>{t('error.refresh')}</Button>
        </Flex>
      </Flex>
    </Box>
  );
};
