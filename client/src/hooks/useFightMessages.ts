import { useEffect, useState } from "react";
import { Message } from "~/@types/message.type";
import { useSocketContext } from "~/utils/SocketContext";

export const useFightMessages = ({
  fightId,
  initialMessages,
}: {
  fightId: string;
  initialMessages: Message[] | undefined;
}) => {
  const socket = useSocketContext();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (!socket) return;

    socket.on(`${fightId}`, (message) => {
      setMessages((prevMessages) => [...prevMessages, message] as Message[]);
    });

    return () => {
      socket.off(`${fightId}`);
    };
  }, [socket, fightId]);

  return messages;
};
