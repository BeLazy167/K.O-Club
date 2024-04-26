"use client";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { env } from "~/env";

// Create a context for the socket instance
export const SocketContext = createContext<Socket | null>(null);

// Custom hook to access the socket instance from the context
export const useSocketContext = () => {
  return useContext(SocketContext);
};

// Component that provides the socket instance to its children
export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // Create a new socket instance with the socket.io-client library
      const socket = io(env.NEXT_PUBLIC_SOCKET_URL, {
        query: { userId: session.user.id },
      });
      setSocket(socket);

      // Clean up the socket instance when the component is unmounted
      return () => {
        socket.close();
        setSocket(null);
      };
    }
  }, [session]);

  // Provide the socket instance to its children through the context
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
