import {
  MousePointer2,
  Crop,
  Paintbrush,
  Type,
  Pen,
  Eraser,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function LeftToolbar() {
  const tools = [
    { icon: MousePointer2, label: "Select", id: "select" },
    { icon: Crop, label: "Crop", id: "crop" },
    { icon: Paintbrush, label: "Brush", id: "brush" },
    { icon: Type, label: "Text", id: "text" },
    { icon: Pen, label: "Pen", id: "pen" },
    { icon: Eraser, label: "Eraser", id: "eraser" },
    { icon: Sparkles, label: "AI Tools", id: "ai" },
  ];

  return (
    <div className="w-14 bg-[#1E1E1E] border-r border-[#2D2D2D] flex flex-col items-center py-4 gap-2">
      <TooltipProvider>
        {tools.map((tool) => (
          <Tooltip key={tool.id}>
            <TooltipTrigger
              className="w-9 h-9 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-[#2D2D2D] transition-colors"
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
