import { ReactNode } from "react";

export function IconButton({
  icon,
  onClick,
  activated,
}: {
  icon: ReactNode;
  onClick: () => void;
  activated: boolean;
}) {
  return (
    <button
      className={`flex items-center justify-center w-10 h-10 rounded-md border transition 
      ${activated ? "bg-blue-100 border-blue-400" : "bg-white border-gray-300 hover:bg-gray-100"}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}