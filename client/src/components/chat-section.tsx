import { ScrollArea } from "~/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import { useFightMessages } from "~/hooks/useFightMessages";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Message } from "~/@types/message.type";
import Loading from "~/app/loading";
import { env } from "~/env";

// Function to fetch fight messages from the server
async function fetchFightMessages({
  queryKey,
}: {
  queryKey: [string, string];
}) {
  const [, fightId] = queryKey;
  return (await fetch(
    `${env.NEXT_PUBLIC_SOCKET_URL}/api/fights/${fightId}/messages`,
  ).then((res) => res.json())) as Promise<Message[]>;
}

// Function to send a message to the server
function sendMessage({
  fightId,
  messageInput,
  userId,
  username,
}: {
  fightId: string;
  messageInput: string;
  userId: string;
  username: string;
}) {
  return fetch(`${env.NEXT_PUBLIC_SOCKET_URL}/api/fights/${fightId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: messageInput, userId, username }),
  }).then((res) => res.json());
}

// ChatSection component
export default function ChatSection({
  fightId,
  userId,
  username,
}: {
  fightId: string;
  userId: string;
  username: string;
}) {
  const [messageInput, setMessageInput] = useState("");

  // Fetch initial messages using useQuery hook
  const {
    data: initialMessages,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["fightMessages", fightId],
    queryFn: fetchFightMessages,
    refetchOnWindowFocus: false,
  });

  // Get updated messages using useFightMessages hook
  const messages = useFightMessages({ fightId, initialMessages });

  // Use useMutation hook to handle sending messages
  const { mutate } = useMutation({
    mutationFn: sendMessage,
  });

  // Event handler for input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  };

  // Event handler for sending a message
  const handleSendMessage = () => {
    mutate({ fightId, messageInput, userId, username });
    setMessageInput("");
  };

  // Render loading state if data is still loading
  if (isLoading) {
    return <Loading />;
  }

  // Render the chat section
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="chat">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-gray-100 p-4 shadow dark:bg-gray-800">
        <ScrollArea className="h-96">
          <div className="flex flex-col gap-4">
            {messages.map((message: Message) => (
              <div key={message._id} className="flex items-start gap-2">
                <Avatar>
                  <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>
                    {message.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{message.username}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-4 flex items-center gap-2">
          <Textarea
            className="h-16 flex-1"
            placeholder="Type your message here..."
            value={messageInput}
            onChange={handleChange}
          />
          <Button onClick={handleSendMessage}>
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// Path: client/src/components/chat-section.tsx
