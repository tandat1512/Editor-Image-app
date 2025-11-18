import { Button } from "./ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface TopMenuBarProps {
  filename: string;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onExport: () => void;
  hasImage: boolean;
}

export function TopMenuBar({
  filename,
  zoom,
  onZoomChange,
  onExport,
  hasImage,
}: TopMenuBarProps) {
  const menuItems = ["File", "Edit", "View", "Help"];

  return (
    <div className="h-12 bg-[#1E1E1E] border-b border-[#2D2D2D] flex items-center justify-between px-4">
      {/* Left - Menu Items */}
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57] mr-2"></div>
        {menuItems.map((item) => (
          <Button
            key={item}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-[#2D2D2D] h-8 px-3"
          >
            {item}
          </Button>
        ))}
      </div>

      {/* Center - Filename */}
      <div className="text-sm text-gray-400">
        {filename || "Untitled"}
      </div>

      {/* Right - Zoom Controls & Export */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-gray-400 hover:text-white hover:bg-[#2D2D2D]"
            onClick={() => onZoomChange(Math.max(25, zoom - 10))}
            disabled={!hasImage}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs text-gray-400 min-w-[50px] text-center">
            {zoom}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-gray-400 hover:text-white hover:bg-[#2D2D2D]"
            onClick={() => onZoomChange(Math.min(200, zoom + 10))}
            disabled={!hasImage}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-gray-400 hover:text-white hover:bg-[#2D2D2D]"
            disabled={!hasImage}
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
        <Button
          onClick={onExport}
          disabled={!hasImage}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white h-8 px-4"
        >
          Export
        </Button>
      </div>
    </div>
  );
}
