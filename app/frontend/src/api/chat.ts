import { ChatDAO, MessageDAO, MessageDTO } from '@calendar-asst/types';
import { get, post } from './apiUtils';

const ChatAPI = {
  getAllChats: function () {
   return get<ChatDAO[]>('/api/chat');
  },

  createChat: function () {
    return post<undefined, ChatDAO>('/api/chat', undefined)
  },

  sendMessage: function (messageDto: MessageDTO): Promise<MessageDAO> {
    return post<MessageDTO, MessageDAO>('/api/chat/message', messageDto);
  },

  getMessagesInChat: function (chatId: string): Promise<MessageDAO[]> {
    return get<MessageDAO[]>(`/api/chat/messages/${chatId}`);
  }
}

export default ChatAPI;
