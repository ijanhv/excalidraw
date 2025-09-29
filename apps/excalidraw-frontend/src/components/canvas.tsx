import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./icon-button";
import {
  Circle,
  Pencil,
  RectangleHorizontalIcon,
  Redo2,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Game } from "@/draw/game";

export type Tool = "circle" | "rect" | "pencil";

export function Canvas({
  roomId,
  socket,
}: {
  socket: WebSocket;
  roomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const [selectedTool, setSelectedTool] = useState<Tool>("circle");
  const [scale, setScale] = useState(1);

  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const game = new Game(canvasRef.current, roomId, socket);
      setGame(game);

      return () => {
        game.destroy();
      };
    }
  }, [canvasRef, roomId, socket]);

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-gray-100">
      <canvas
        className="bg-white shadow-inner"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>

      {/* Top Toolbar (like Excalidraw left toolbar) */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 bg-white p-2 rounded-md shadow-md">
        <IconButton
          onClick={() => setSelectedTool("pencil")}
          activated={selectedTool === "pencil"}
          icon={<Pencil className="w-5 h-5" />}
        />
        <IconButton
          onClick={() => setSelectedTool("rect")}
          activated={selectedTool === "rect"}
          icon={<RectangleHorizontalIcon className="w-5 h-5" />}
        />
        <IconButton
          onClick={() => setSelectedTool("circle")}
          activated={selectedTool === "circle"}
          icon={<Circle className="w-5 h-5" />}
        />
      </div>

      {/* Bottom Toolbar (like Excalidraw center bottom) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white p-2 rounded-md shadow-md">
        <IconButton onClick={() => {}} activated={false} icon={<Undo2 className="w-5 h-5" />} />
        <IconButton onClick={() => {}} activated={false} icon={<Redo2 className="w-5 h-5" />} />
        <IconButton
          onClick={() => setScale((s) => Math.max(0.2, s - 0.1))}
          activated={false}
          icon={<ZoomOut className="w-5 h-5" />}
        />
        <IconButton
          onClick={() => setScale((s) => Math.min(3, s + 0.1))}
          activated={false}
          icon={<ZoomIn className="w-5 h-5" />}
        />
      </div>
    </div>
  );
}

function Topbar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10,
      }}
    >
      <div className="flex gap-t">
        <IconButton
          onClick={() => {
            setSelectedTool("pencil");
          }}
          activated={selectedTool === "pencil"}
          icon={<Pencil />}
        />
        <IconButton
          onClick={() => {
            setSelectedTool("rect");
          }}
          activated={selectedTool === "rect"}
          icon={<RectangleHorizontalIcon />}
        ></IconButton>
        <IconButton
          onClick={() => {
            setSelectedTool("circle");
          }}
          activated={selectedTool === "circle"}
          icon={<Circle />}
        ></IconButton>
      </div>
    </div>
  );
}
