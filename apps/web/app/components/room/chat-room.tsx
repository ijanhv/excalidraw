import { BACKEND_URL } from "@/config";
import axios from "axios";
import { ChatRoomClient } from "./chat-room-client";

async function getChats(roomId: number) {
  try {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.messages;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
}

export async function ChatRoom({ id }: { id: string }) {
  const messages = await getChats(Number(id));

  return (
    <div>
      <ChatRoomClient id={id} messages={messages} />
    </div>
  );
}
