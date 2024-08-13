import { useNavigate } from 'react-router-dom';

interface IChatNavbarItemProps {
  chatId: string;
  description: string;
}

export function ChatNavbarItem({ chatId, description }: IChatNavbarItemProps) {
  const navigate = useNavigate();

  function goToChat() {
    navigate(`/chat/${chatId}`);
  }

  return (
    <div
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-light hover:bg-muted hover:text-foreground"
      onClick={goToChat}
    >
      <span className="truncate">{chatId}</span>
    </div>
  );
}
