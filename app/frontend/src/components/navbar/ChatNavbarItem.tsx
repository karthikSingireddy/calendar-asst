import { Paper, Stack, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface IChatNavbarItemProps {
  chatId: string;
  description: string;
}

export function ChatNavbarItem({ chatId, description }: IChatNavbarItemProps) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const backgroundColor = colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3];

  function goToChat() {
    navigate(`/chat/${chatId}`);
  }

  return (
    <Paper
      h={28}
      mt='xs'
      bg={backgroundColor}
      style={{ cursor: 'pointer' }}
      onClick={goToChat}
    >
      <Stack justify='center' h='100%'>
        <Text size='sm' p={2} ta='left' ml={5} truncate>{description}</Text>
      </Stack>
    </Paper>
  );
}
