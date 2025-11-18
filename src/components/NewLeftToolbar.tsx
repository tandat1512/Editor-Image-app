import {
  MousePointer2,
  Crop,
  Type,
  Pen,
  Eraser,
  Hand,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function NewLeftToolbar() {
  const tools = [
    { icon: MousePointer2, label: "Chọn", id: "select" },
    { icon: Hand, label: "Di chuyển", id: "move" },
    { icon: Crop, label: "Cắt", id: "crop" },
    { icon: Type, label: "Văn bản", id: "text" },
    { icon: Pen, label: "Vẽ", id: "pen" },
    { icon: Eraser, label: "Tẩy", id: "eraser" },
  ];

  return (
    <div className="w-14 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-3 gap-1">
      <TooltipProvider>
        {tools.map((tool) => (
          <Tooltip key={tool.id}>
            <TooltipTrigger
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            >
              <tool.icon className="w-5 h-5" />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{tool.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
