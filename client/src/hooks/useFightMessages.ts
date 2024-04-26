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
    // Set initial messages when they are provided
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    // Subscribe to socket events when the socket is available
    if (!socket) return;

    // Listen for messages specific to the fightId
    socket.on(`${fightId}`, (message) => {
      // Append the new message to the existing messages
      setMessages((prevMessages) => [...prevMessages, message] as Message[]);
    });

    // Unsubscribe from socket events when the component is unmounted
    return () => {
      socket.off(`${fightId}`);
    };
  }, [socket, fightId]);

  // Return the messages for the component to use
  return messages;
};
