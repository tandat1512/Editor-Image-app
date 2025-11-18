import { Button } from "./ui/button";
import { ZoomIn, ZoomOut, Maximize2, Download } from "lucide-react";

interface NewTopMenuBarProps {
  filename: string;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onExport: () => void;
  hasImage: boolean;
}

export function NewTopMenuBar({
  filename,
  zoom,
  onZoomChange,
  onExport,
  hasImage,
}: NewTopMenuBarProps) {
  const menuItems = ["Tệp", "Chỉnh sửa", "Xem", "Trợ giúp"];

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Left - Logo & Menu Items */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Beauty Editor Pro
          </span>
        </div>
        <div className="h-5 w-px bg-gray-300" />
        <div className="flex items-center gap-1">
          {menuItems.map((item) => (
            <Button
              key={item}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 px-3 text-xs"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      {/* Center - Filename */}
      <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
        <span className="text-xs text-gray-500">📷</span>
        <span className="text-sm text-gray-700 font-medium">
          {filename}
        </span>
      </div>

      {/* Right - Zoom Controls & Export */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200">
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            onClick={() => onZoomChange(Math.max(25, zoom - 10))}
            disabled={!hasImage}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs text-gray-700 min-w-[45px] text-center font-medium">
            {zoom}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            onClick={() => onZoomChange(Math.min(200, zoom + 10))}
            disabled={!hasImage}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            onClick={() => onZoomChange(100)}
            disabled={!hasImage}
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
        <Button
          onClick={onExport}
          disabled={!hasImage}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-9 px-5 shadow-md"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
}
