import { IChatMessage } from '../../atoms/chat.atoms';
import { useEffect, useRef } from 'react';
import { cn } from '@calendar-asst/components';

interface ChatMessageProps {
  message: IChatMessage;
  align: 'left' | 'right';
  lastMessage: boolean;
}

interface MessageStyles {
  justify: string;
  backgroundColor: string;
  textColor: string;
}

const UserMessageStyles: MessageStyles = {
  justify: 'justify-end',
  backgroundColor: 'bg-primary',
  textColor: 'text-primary-foreground',
}

const AIMessageStyles: MessageStyles = {
  justify: 'justify-start',
  backgroundColor: 'bg-secondary',
  textColor: 'text-primary-background',
}

export function ChatMessage(props: ChatMessageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const styles = props.align === 'left' ? AIMessageStyles : UserMessageStyles;

  useEffect(() => {
    if (props.lastMessage && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [props.lastMessage]);

  return <div ref={ref} className={cn('flex flex-start', styles.justify)}>
    <div className={cn("rounded-lg p-4 text-sm text-primary m-2", styles.backgroundColor, styles.textColor)}>
      {props.message.content}
    </div>
  </div>
}
