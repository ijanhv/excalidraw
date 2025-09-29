"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZmYzM2YxNC02YTY3LTQ5ZjUtOGRmZS0yNGMwNWU0NmFmYzQiLCJpYXQiOjE3NTkwODI3MjV9.v4ysf8mI4SWtXY7Ey4GFwAuOe8DeIQJK83V5s_MXliM`);

    ws.onopen = () => {
      setSocket(ws);
      ws.send(JSON.stringify({
        type: "join_room",
        roomId
      }))
    };

  }, []);

  if(!socket) {
    return <div>
        Connecting to the server
    </div>
  }

  return <div>
    <Canvas roomId={roomId} socket={socket}/>
    </div>
}
