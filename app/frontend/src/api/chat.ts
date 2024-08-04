import { ChatDAO, MessageDAO, MessageDTO } from '@calendar-asst/types';
import { post } from './apiUtils';

const ChatAPI = {
  createChat: function () {
    return post<undefined, ChatDAO>('/api/chat', undefined)
  },

  sendMessage: function (messageDto: MessageDTO): Promise<MessageDAO> {
    return post<MessageDTO, MessageDAO>('/api/chat/message', messageDto);
  }
}

export default ChatAPI;
