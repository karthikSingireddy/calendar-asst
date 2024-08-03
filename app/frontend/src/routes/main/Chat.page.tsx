import { useParams } from 'react-router-dom';
import { ChatMain } from '../../components/chat/ChatMain';

interface IChatPageURLParams extends Record<string, string> {
  chatId: string;
}

export function ChatPage() {
  const { chatId} = useParams<IChatPageURLParams>();

  return <ChatMain />
}
