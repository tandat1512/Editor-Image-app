import { ImageEdits } from "../App";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import {
  Upload,
  Droplets,
  Palette,
  Sun,
  Contrast,
  RotateCcw,
  RotateCw,
  FlipHorizontal2,
  FlipVertical2,
  Crop,
  RotateCcw as Reset,
  Download,
  Wand2,
} from "lucide-react";

interface ToolsSidebarProps {
  edits: ImageEdits;
  setEdits: React.Dispatch<React.SetStateAction<ImageEdits>>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onRotate: (direction: "left" | "right") => void;
  onFlip: (direction: "horizontal" | "vertical") => void;
  onExport: (format: "jpg" | "png") => void;
  hasImage: boolean;
  onOpenUploadDialog: () => void;
}

export function ToolsSidebar({
  edits,
  setEdits,
  onImageUpload,
  onReset,
  onRotate,
  onFlip,
  onExport,
  hasImage,
  onOpenUploadDialog,
}: ToolsSidebarProps) {
  return (
    <div className="w-96 bg-[#F4F4F5] p-6 overflow-y-auto">
      <div className="space-y-5">
        {/* Upload Button */}
        <div>
          <Button
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8]"
            onClick={onOpenUploadDialog}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
        </div>

        {/* Editing Tools Section */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 px-1">
            <Wand2 className="w-4 h-4 text-gray-700" />
            <h2 className="text-gray-900">Editing Tools</h2>
          </div>

          {/* Blur Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-gray-600" />
                Blur
              </Label>
              <span className="text-xs text-gray-500">{edits.blur}px</span>
            </div>
            <Slider
              value={[edits.blur]}
              onValueChange={(value) =>
                setEdits((prev) => ({ ...prev, blur: value[0] }))
              }
              max={10}
              step={0.5}
              disabled={!hasImage}
              className="w-full"
            />
          </div>

          {/* Grayscale Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-gray-600" />
                Grayscale
              </Label>
              <Switch
                checked={edits.grayscale}
                onCheckedChange={(checked) =>
                  setEdits((prev) => ({ ...prev, grayscale: checked }))
                }
                disabled={!hasImage}
              />
            </div>
          </div>

          {/* Brightness Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-gray-600" />
                Brightness
              </Label>
              <span className="text-xs text-gray-500">{edits.brightness}%</span>
            </div>
            <Slider
              value={[edits.brightness]}
              onValueChange={(value) =>
                setEdits((prev) => ({ ...prev, brightness: value[0] }))
              }
              min={0}
              max={200}
              step={1}
              disabled={!hasImage}
              className="w-full"
            />
          </div>

          {/* Contrast Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Contrast className="w-4 h-4 text-gray-600" />
                Contrast
              </Label>
              <span className="text-xs text-gray-500">{edits.contrast}%</span>
            </div>
            <Slider
              value={[edits.contrast]}
              onValueChange={(value) =>
                setEdits((prev) => ({ ...prev, contrast: value[0] }))
              }
              min={0}
              max={200}
              step={1}
              disabled={!hasImage}
              className="w-full"
            />
          </div>

          {/* Rotate Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-sm space-y-3">
            <Label className="flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-gray-600" />
              Rotate
            </Label>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                onClick={() => onRotate("left")}
                disabled={!hasImage}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Left
              </Button>
              <Button
                className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                onClick={() => onRotate("right")}
                disabled={!hasImage}
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Right
              </Button>
            </div>
          </div>

          {/* Flip Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-sm space-y-3">
            <Label className="flex items-center gap-2">
              <FlipHorizontal2 className="w-4 h-4 text-gray-600" />
              Flip
            </Label>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                onClick={() => onFlip("horizontal")}
                disabled={!hasImage}
              >
                <FlipHorizontal2 className="w-4 h-4 mr-2" />
                Horizontal
              </Button>
              <Button
                className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                onClick={() => onFlip("vertical")}
                disabled={!hasImage}
              >
                <FlipVertical2 className="w-4 h-4 mr-2" />
                Vertical
              </Button>
            </div>
          </div>

          {/* Crop Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-sm">
            <Button
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
              disabled={!hasImage}
            >
              <Crop className="w-4 h-4 mr-2" />
              Crop
            </Button>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          className="w-full border-[#E5E7EB]"
          onClick={onReset}
          disabled={!hasImage}
        >
          <Reset className="w-4 h-4 mr-2" />
          Reset All
        </Button>

        {/* Export Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
            onClick={() => onExport("png")}
            disabled={!hasImage}
          >
            <Download className="w-4 h-4 mr-2" />
            Export as PNG
          </Button>
          <Button
            variant="outline"
            className="w-full border-[#E5E7EB]"
            onClick={() => onExport("jpg")}
            disabled={!hasImage}
          >
            <Download className="w-4 h-4 mr-2" />
            Export as JPG
          </Button>
        </div>
      </div>
    </div>
  );
}