import { useMutation, useQuery } from '@tanstack/react-query';
import { ChatDAO } from '@calendar-asst/types';
import ChatAPI from '../../api/chat';
import { useNavigate } from 'react-router-dom';
import { Button, ScrollArea } from '@mantine/core';
import { ChatNavbarItem } from './ChatNavbarItem';

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

  return <>
    <Button h={50} onClick={createNewChat}>new chat placeholder</Button>

    {chatsQuery.isLoading && <p>loading...</p>}
    <ScrollArea scrollbars='y'>
      {chatsQuery.isSuccess && chatsQuery.data.map(chat =>
        <ChatNavbarItem key={chat.id} chatId={chat.id} description={chat.id + chat.id + chat.id} />
      )}
    </ScrollArea>
  </>
}
