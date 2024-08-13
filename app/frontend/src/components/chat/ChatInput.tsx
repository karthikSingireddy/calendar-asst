import { useSetRecoilState } from 'recoil';
import { messagesListAtom } from '../../atoms/chat.atoms';
import { KeyboardEvent, useContext, useState } from 'react';
import { DefaultError, useMutation } from '@tanstack/react-query';
import ChatAPI from '../../api/chat';
import { ChatIDContext } from '../../routes/main/Chat.page';
import { MessageDAO, MessageDTO } from '@calendar-asst/types';
import {
  Button,
  Label,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Input
} from '@calendar-asst/components';
import { CornerDownLeft, Mic, Paperclip } from "lucide-react"

export function ChatInput() {
  const setMessages = useSetRecoilState(messagesListAtom);
  const [inputValue, setInputValue] = useState('');
  const chatId = useContext(ChatIDContext);

  const sendMessageMutation = useMutation<MessageDAO, DefaultError, MessageDTO>({
    mutationFn: ChatAPI.sendMessage
  });

  async function submitMessage() {
    try {
      setMessages(oldMessages => [...oldMessages, { content: inputValue, fromUser: true }]);
      setInputValue('');
      const responseMessage = await sendMessageMutation.mutateAsync({
        chatId: chatId,
        content: inputValue
      });
      setMessages(oldMessages => [...oldMessages, { content: responseMessage.content, fromUser: false }]);
    } catch(e) {
      console.log(e);
    }
  }

  async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && inputValue.trim().length > 0) {
      await submitMessage();
    }
  }

  return (
    <div
      className="m-2 relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
    >
      <TooltipProvider >

      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Input
        id="message"
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center p-3 pt-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Attach File</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Use Microphone</TooltipContent>
        </Tooltip>
        <Button type="submit" size="sm" className="ml-auto gap-1.5" onClick={submitMessage}>
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
      </TooltipProvider>
    </div>
  );
}
