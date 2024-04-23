"use client";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const socket = io("http://localhost:5000", {
        query: { userId: session.user.id },
      });
      setSocket(socket);

      return () => {
        socket.close();
        setSocket(null);
      };
    }
  }, [session]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
