import { ChatInput } from './ChatInput';
import { Stack } from '@mantine/core';
import { ChatMessage } from './ChatMessage';

export function ChatMain() {
  return <Stack justify="space-between" w="100%">
    <Stack
      h="80%"
      mih="80%"
      justify="flex-end"
      style={{
        flexGrow: 2
      }}
    >
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
    </Stack>
    <ChatInput />
  </Stack>
}
