import { TextInput } from '@mantine/core';
import { useSetRecoilState } from 'recoil';
import { messagesListAtom } from '../../atoms/chat.atoms';
import { KeyboardEvent, useContext, useState } from 'react';
import { DefaultError, useMutation } from '@tanstack/react-query';
import ChatAPI from '../../api/chat';
import { MessageDTO } from '../../../../../lib/types/src/lib/message.dto';
import { ChatIDContext } from '../../routes/main/Chat.page';

export function ChatInput() {
  const setMessages = useSetRecoilState(messagesListAtom);
  const [inputValue, setInputValue] = useState('');
  const chatId = useContext(ChatIDContext);

  const sendMessageMutation = useMutation<undefined, DefaultError, MessageDTO>({
    mutationFn: ChatAPI.sendMessage
  })

  async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && inputValue.trim().length > 0) {
      try {
        await sendMessageMutation.mutateAsync({
          chatId: chatId,
          content: inputValue
        });

        setMessages(oldMessages => [
          ...oldMessages,
          { content: inputValue },
        ]);
        setInputValue('');
      } catch(e) {
        console.log(e);
      }
    }
  }

  return <TextInput
    placeholder="test placeholder"
    p="sm"
    value={inputValue}
    onChange={(event) => setInputValue(event.currentTarget.value)}
    onKeyDown={handleKeyDown}
  />
}
