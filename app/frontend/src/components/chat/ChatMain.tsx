import { ChatInput } from './ChatInput';
import { ChatFeed } from './ChatFeed';

export function ChatMain() {

  return <div className="w-full h-screen flex flex-col justify-between overflow-y-auto">
    <ChatFeed />
    <div>
      <ChatInput />
    </div>
  </div>
}
