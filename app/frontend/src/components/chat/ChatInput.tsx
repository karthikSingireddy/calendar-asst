import { TextInput } from '@mantine/core';
import { useSetRecoilState } from 'recoil';
import { messagesListAtom } from '../../atoms/chat.atoms';
import { KeyboardEvent, useContext, useState } from 'react';
import { DefaultError, useMutation } from '@tanstack/react-query';
import ChatAPI from '../../api/chat';
import { ChatIDContext } from '../../routes/main/Chat.page';
import { MessageDAO, MessageDTO } from '@calendar-asst/types';

export function ChatInput() {
  const setMessages = useSetRecoilState(messagesListAtom);
  const [inputValue, setInputValue] = useState('');
  const chatId = useContext(ChatIDContext);

  const sendMessageMutation = useMutation<MessageDAO, DefaultError, MessageDTO>({
    mutationFn: ChatAPI.sendMessage
  })

  async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && inputValue.trim().length > 0) {
      try {
        const responseMessage = await sendMessageMutation.mutateAsync({
          chatId: chatId,
          content: inputValue
        });

        setMessages(oldMessages => [
          ...oldMessages,
          { content: inputValue , fromUser: true},
          { content: responseMessage.content, fromUser: false }
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
