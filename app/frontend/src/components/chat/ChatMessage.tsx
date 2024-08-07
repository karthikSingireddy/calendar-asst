import { IChatMessage } from '../../atoms/chat.atoms';
import { Group, Paper, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useEffect, useRef } from 'react';

interface ChatMessageProps {
  message: IChatMessage;
  align: 'left' | 'right';
  lastMessage: boolean;
}

export function ChatMessage(props: ChatMessageProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const ref = useRef<HTMLDivElement>(null);

  const backgroundColor = colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3];
  const justifyContent = props.align === 'left' ? 'flex-start' : 'flex-end';

  useEffect(() => {
    if (props.lastMessage && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [props.lastMessage]);

  return (
      <Group
        w='100%'
        justify={justifyContent}
        p='0px 10px'
        ref={ref}
      >
        <Paper radius="md" m={5} maw='65%' style={{ backgroundColor }}>
          <Text p={10}>{props.message.content}</Text>
        </Paper>
      </Group>
  );
}
