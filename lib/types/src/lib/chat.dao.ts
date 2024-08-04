import { UserDAO } from '@calendar-asst/types';

export class ChatDAO {
  constructor(
    public readonly id: string,
    public readonly description: string,
  ) {}
}
