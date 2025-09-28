import { WS_URL } from "@/config";
import { useEffect, useState } from "react";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZmYzM2YxNC02YTY3LTQ5ZjUtOGRmZS0yNGMwNWU0NmFmYzQiLCJpYXQiOjE3NTkwNDkwODR9.5CWdodexYrZCBpqsAgo8sk9_UXtzowu5uqRuFQpnzHk`);
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  }, []);

  return {
    socket,
    loading,
  };
}
