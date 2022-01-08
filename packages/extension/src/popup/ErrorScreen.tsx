import { Box, Button, Flex, Icon, Text } from '@fxtrot/ui';
import { FireIcon } from '@heroicons/react/outline';
import { useError } from './atoms';

export const ErrorScreen = () => {
  const [error, setError] = useError();

  let content = error ? (
    <Text align="center" size="sm">
      {error}
    </Text>
  ) : (
    <>
      <Text align="center" size="sm">
        Something broke the service, checking what was it...
      </Text>
      <Text align="center" tone="light" size="xs">
        In the meanwhile, try to close and open this popup,
        <br />
        maybe the{' '}
        <span role="img" aria-label="bug">
          🐞
        </span>{' '}
        is already gone
      </Text>{' '}
    </>
  );
  return (
    <Box p="$3">
      <Flex flow="column" cross="center" main="center" gap="md">
        <Icon as={FireIcon} size="3xl" color="$gray400" />
        {content}
        <Flex main="center" cross="center">
          <Button onClick={() => setError(null)}>Refresh</Button>
        </Flex>
      </Flex>
    </Box>
  );
};
