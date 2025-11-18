import { Button } from "./ui/button";
import { FilePlus, Download, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface NavBarProps {
  onNewProject: () => void;
  onExport: () => void;
  hasImage: boolean;
}

export function NavBar({ onNewProject, onExport, hasImage }: NavBarProps) {
  return (
    <nav className="h-16 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-lg flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <span className="text-gray-900">AI Photo Editor</span>
      </div>

      {/* Center - Help */}
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                <HelpCircle className="w-4 h-4" />
                Quick Guide
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-sm">
                Upload an image, apply edits using the tools sidebar, and export when ready.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Right - Action Buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onNewProject}
          className="border-[#E5E7EB] text-gray-700"
        >
          <FilePlus className="w-4 h-4 mr-2" />
          New Project
        </Button>
        <Button
          onClick={onExport}
          disabled={!hasImage}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Image
        </Button>
      </div>
    </nav>
  );
}