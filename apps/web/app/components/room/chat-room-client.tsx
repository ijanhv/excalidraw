"use client";

import { useSocket } from "hooks/use-socket";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ChatRoomClientProps = {
  messages: { message: string }[];
  id: string;
};

export function ChatRoomClient({ messages, id }: ChatRoomClientProps) {
  const [chats, setChats] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket, loading } = useSocket();

useEffect(() => {
  if (!loading && socket) {
    const joinMsg = JSON.stringify({ type: "join_room", roomId: id });
    console.log("Sending join_room:", joinMsg);
    socket.send(joinMsg);

    socket.onmessage = (event) => {
      console.log("Received WS message:", event.data);
      const parsedData = JSON.parse(event.data);
      if (parsedData.type === "chat") {
        setChats((c) => [...c, { message: parsedData.message }]);
      }
    };
  }
  return () => {
    socket?.close();
  };
}, [socket, loading, id]);

  return (
    <div>
      {chats.map((m, i) => (
        <div key={i}>{m.message}</div>
      ))}
      <Input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <Button
        onClick={() => {
          if (!loading && socket && socket.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({
                type: "chat",
                roomId: id,
                message: currentMessage,
              })
            );
            setCurrentMessage("");
          }
        }}
      >
        Send
      </Button>
    </div>
  );
}
