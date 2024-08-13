import { ChatMessage } from './ChatMessage';
import { useRecoilState } from 'recoil';
import { messagesListAtom } from '../../atoms/chat.atoms';
import { useContext, useEffect } from 'react';
import { ChatIDContext } from '../../routes/main/Chat.page';
import ChatAPI from '../../api/chat';

export function ChatFeed() {
  const [messages, setMessages] = useRecoilState(messagesListAtom);
  const chatId = useContext(ChatIDContext);

  useEffect(() => {
    ChatAPI.getMessagesInChat(chatId)
      .then(messages => {
        setMessages(messages.map(messageDao => {
          return {
            content: messageDao.content,
            fromUser: messageDao.fromUser
          }
        }));
      })
      .catch(err => console.error(err));
  }, [chatId, setMessages]);

  return <div className="flex flex-col">
    {messages.map((msg, index, row) =>
      <ChatMessage
        key={index}
        message={msg}
        align={msg.fromUser ? 'right' : 'left' }
        lastMessage={index === row.length - 1}
      />
    )}
  </div>
}
