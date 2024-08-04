import { useParams } from 'react-router-dom';
import { ChatMain } from '../../components/chat/ChatMain';
import { createContext } from 'react';

interface IChatPageURLParams extends Record<string, string> {
  chatId: string;
}

export const ChatIDContext = createContext<string>('');

export function ChatPage() {
  const { chatId} = useParams<IChatPageURLParams>();

  return <ChatIDContext.Provider value={chatId || ''}>
    <ChatMain />
  </ChatIDContext.Provider>
}
