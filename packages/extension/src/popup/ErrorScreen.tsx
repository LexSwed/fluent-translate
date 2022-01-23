import React from 'react';
import { Box, Button, Column, Icon, Row, Text } from '@fxtrot/ui';
import { FireIcon } from '@heroicons/react/outline';
import { useLocale } from '../translations';
import { useError } from './atoms';

export const ErrorScreen = () => {
  const [, setError] = useError();
  const t = useLocale();

  return (
    <Box p="$3">
      <Column cross="center" main="center" gap="md">
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

        <Row main="center" cross="center">
          <Button onClick={() => setError(null)}>{t('error.refresh')}</Button>
        </Row>
      </Column>
    </Box>
  );
};
