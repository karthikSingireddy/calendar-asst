import { useMutation, useQuery } from '@tanstack/react-query';
import { ChatDAO } from '@calendar-asst/types';
import ChatAPI from '../../api/chat';
import { useNavigate } from 'react-router-dom';
import { ChatNavbarItem } from './ChatNavbarItem';
import { CalendarIcon, ChatBubbleIcon, PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@calendar-asst/components';

export function Navbar() {
  const navigate = useNavigate();

  const chatsQuery = useQuery({
    queryKey: ['allChats'],
    queryFn: ChatAPI.getAllChats
  });

  const newChatMutation = useMutation<ChatDAO>({
    mutationFn: ChatAPI.createChat
  });

  function createNewChat() {
    newChatMutation.mutateAsync()
      .then((chat) => {
        navigate(`/chat/${chat.id}`);
      })
      .catch(err => console.error(err));
  }

  return <nav className="h-screen flex-col border-r bg-muted/40 p-4 sm:flex">
    <div className="flex h-14 items-center justify-between">
      <div className="flex items-center gap-2 font-semibold">
        <CalendarIcon className="h-6 w-6" />
        <span className="truncate">AI Chatbot</span>
      </div>
      <Button variant="ghost" size="icon">
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">New Conversation</span>
      </Button>
    </div>
    <div className="flex-1 overflow-auto space-y-1">
      {chatsQuery.data?.map((chat) => <ChatNavbarItem key={chat.id} chatId={chat.id} description={chat.description}/>)}
    </div>
  </nav>;
}
