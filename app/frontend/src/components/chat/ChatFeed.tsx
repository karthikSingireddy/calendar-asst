import { ScrollArea, Stack } from '@mantine/core';
import { ChatMessage } from './ChatMessage';
import { useRecoilValue } from 'recoil';
import { IChatMessage, messagesListAtom } from '../../atoms/chat.atoms';

export function ChatFeed() {
  const messages: IChatMessage[] = useRecoilValue(messagesListAtom);

  return <ScrollArea>
    <Stack
      h="80%"
      mih="80%"
      justify="flex-end"
      style={{
        flexGrow: 2,
      }}
    >
      {messages.map((msg, index, row) =>
        <ChatMessage
          key={index}
          message={msg}
          align={index % 2 === 0 ? 'left' : 'right' }
          lastMessage={index === row.length - 1}
        />
      )}
    </Stack>
  </ScrollArea>
}
