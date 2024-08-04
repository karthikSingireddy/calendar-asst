import { ChatInput } from './ChatInput';
import { ScrollArea, Stack } from '@mantine/core';
import { ChatFeed } from './ChatFeed';

export function ChatMain() {
  return <Stack justify="space-between"
                w="100%"
                h='1160px'
                mah="fit-content"
                style={{ overflowY: 'hidden' }}>
    <ChatFeed />
    <ChatInput />
  </Stack>
}
