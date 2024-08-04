import { ChatInput } from './ChatInput';
import { ScrollArea, Stack } from '@mantine/core';
import { ChatFeed } from './ChatFeed';
import { useContext } from 'react';
import { MainViewHeightContext } from '../../routes/main/Layout';

export function ChatMain() {
  const mainViewHeight = useContext(MainViewHeightContext);

  return <Stack justify="space-between"
                w="100%"
                h={`${mainViewHeight}px`}
                mah="fit-content"
                style={{ overflowY: 'hidden' }}>
    <ChatFeed />
    <ChatInput />
  </Stack>
}
