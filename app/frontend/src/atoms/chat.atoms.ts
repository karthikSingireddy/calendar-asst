import { atom } from 'recoil';

export interface IChatMessage {
  content: string;
}

export const messagesListAtom = atom<IChatMessage[]>({
  key: 'messages',
  default: [],
});
