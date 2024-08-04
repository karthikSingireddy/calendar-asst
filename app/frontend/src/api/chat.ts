import { ChatDAO } from '@calendar-asst/types';
import { post } from './apiUtils';
import { MessageDTO } from '../../../../lib/types/src/lib/message.dto';

const ChatAPI = {
  createChat: function () {
    return post<undefined, ChatDAO>('/api/chat', undefined)
  },

  sendMessage: function (messageDto: MessageDTO): Promise<undefined> {
    return post<MessageDTO, undefined>('/api/chat/message', messageDto);
  }
}

export default ChatAPI;
