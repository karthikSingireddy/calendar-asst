import { TextInput } from '@mantine/core';
import { useSetRecoilState } from 'recoil';
import { messagesListAtom } from '../../atoms/chat.atoms';
import { KeyboardEvent, useState } from 'react';

export function ChatInput() {
  const setMessages = useSetRecoilState(messagesListAtom);
  const [inputValue, setInputValue] = useState('');

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && inputValue.trim().length > 0) {
      setMessages(oldMessages => [
        ...oldMessages,
        { content: inputValue },
      ]);
      setInputValue('');
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
