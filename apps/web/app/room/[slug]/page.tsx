import { ChatRoom } from "@/components/room/chat-room";
import { BACKEND_URL } from "@/config";
import axios from "axios";

async function getRoomId(slug: string) {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  return response.data.room.id;
}

export default async function ChatRoomPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = (await params).slug;
  const roomId = await getRoomId(slug);
  console.log("[SLUG]: ", slug);
  console.log("[ROOM ID]: ", roomId);

  return (
    <div>
      <ChatRoom id={roomId} />
    </div>
  );
}
