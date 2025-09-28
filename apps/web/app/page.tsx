"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className="h-screen  items-center justify-center flex ">
     <div className="max-w-2xl flex flex-col gap-4">
       <Input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        type="text"
      />
      <Button
      onClick={() => {
        router.push(`/room/${roomId}`)
      }}
      >
        Join Room</Button>
     </div>
    </div>
  );
}
