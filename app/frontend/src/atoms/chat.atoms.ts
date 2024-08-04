import { atom } from 'recoil';

export interface IChatMessage {
  content: string;
  fromUser: boolean;
}

export const messagesListAtom = atom<IChatMessage[]>({
  key: 'messages',
  default: [],
});
