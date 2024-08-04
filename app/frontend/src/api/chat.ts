import { ChatDAO } from '@calendar-asst/types';
import { post } from './apiUtils';

const ChatAPI = {
  createChat: function () {
    return post<undefined, ChatDAO>('/api/chat', undefined)
  }
}

export default ChatAPI;
