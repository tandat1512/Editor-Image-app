import { ImageState } from "../../types";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Crop,
  RotateCcw,
  RotateCw,
  FlipHorizontal2,
  FlipVertical2,
} from "lucide-react";

interface BasicTabProps {
  imageState?: ImageState;
  onUpdate: (updates: Partial<ImageState>) => void;
  hasImage: boolean;
}

export function BasicTab({ imageState, onUpdate, hasImage }: BasicTabProps) {
  const aspectRatios = [
    { label: "Gốc", value: "Original" },
    { label: "1:1", value: "1:1" },
    { label: "4:5", value: "4:5" },
    { label: "9:16", value: "9:16" },
    { label: "16:9", value: "16:9" },
  ];

  const updateAdjustment = (key: keyof ImageState["adjustments"], value: number) => {
    if (!imageState) return;

    const currentAdjustments = imageState.adjustments ?? {};

    onUpdate({
      adjustments: {
        ...currentAdjustments,
        [key]: value,
      },
    });
    console.log(`Updating ${key}:`, value);
  };

  const handleRotate = (direction: "left" | "right") => {
    if (!imageState) return;

    const currentTransform = imageState.transform ?? {};
    const currentRotate = currentTransform.rotate ?? 0;
    const newRotate = direction === "left" 
      ? (currentRotate - 90 + 360) % 360 
      : (currentRotate + 90) % 360;
    
    onUpdate({
      transform: {
        ...currentTransform,
        rotate: newRotate,
      },
    });
  };

  const handleFlip = (axis: "x" | "y") => {
    if (!imageState) return;

    const currentTransform = imageState.transform ?? {};

    if (axis === "x") {
      onUpdate({
        transform: {
          ...currentTransform,
          flipX: !currentTransform.flipX,
        },
      });
    } else {
      onUpdate({
        transform: {
          ...currentTransform,
          flipY: !currentTransform.flipY,
        },
      });
    }
  };

  if (!imageState) {
    return <div className="p-4 text-sm text-center text-gray-500">Vui lòng tải ảnh lên để bắt đầu chỉnh sửa.</div>;
  }

  const transform = imageState.transform ?? {};
  const adjustments = imageState.adjustments ?? {};

  return (
    <div className="space-y-6">
      {/* Công cụ Cắt */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <Crop className="w-4 h-4" />
          <span className="text-sm font-medium">Cắt & Xoay</span>
        </div>
        
        {/* Aspect Ratios */}
        <div className="flex flex-wrap gap-2">
          {aspectRatios.map((ratio) => (
            <Button
              key={ratio.value}
              variant="outline"
              size="sm"
              className={`flex-1 min-w-[60px] h-8 ${
                (transform.crop ?? {}).aspectRatio === ratio.value
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "border-gray-300"
              }`}
              disabled={!hasImage}
              onClick={() => {
                onUpdate({
                  transform: {
                    ...transform,
                    crop: {
                      aspectRatio: ratio.value,
                      x: 0,
                      y: 0,
                      width: 100,
                      height: 100,
                    },
                  },
                });
              }}
            >
              {ratio.label}
            </Button>
          ))}
        </div>

        {/* Rotate & Flip */}
        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            disabled={!hasImage}
            onClick={() => handleRotate("left")}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            disabled={!hasImage}
            onClick={() => handleRotate("right")}
          >
            <RotateCw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            disabled={!hasImage}
            onClick={() => handleFlip("x")}
          >
            <FlipHorizontal2 className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            disabled={!hasImage}
            onClick={() => handleFlip("y")}
          >
            <FlipVertical2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Ánh sáng (Light) */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Ánh sáng</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Phơi sáng</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.exposure ?? 0) > 0 ? "+" : ""}
                {(adjustments.exposure ?? 0).toFixed(1)}
              </span>
            </div>
            <Slider
              value={[adjustments.exposure ?? 0]}
              onValueChange={(v) => updateAdjustment("exposure", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Tương phản</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.contrast ?? 0) > 0 ? "+" : ""}
                {(adjustments.contrast ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.contrast ?? 0]}
              onValueChange={(v) => updateAdjustment("contrast", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Vùng sáng</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.highlights ?? 0) > 0 ? "+" : ""}
                {(adjustments.highlights ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.highlights ?? 0]}
              onValueChange={(v) => updateAdjustment("highlights", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Vùng tối</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.shadows ?? 0) > 0 ? "+" : ""}
                {(adjustments.shadows ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.shadows ?? 0]}
              onValueChange={(v) => updateAdjustment("shadows", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Trắng</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.whites ?? 0) > 0 ? "+" : ""}
                {(adjustments.whites ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.whites ?? 0]}
              onValueChange={(v) => updateAdjustment("whites", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Đen</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.blacks ?? 0) > 0 ? "+" : ""}
                {(adjustments.blacks ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.blacks ?? 0]}
              onValueChange={(v) => updateAdjustment("blacks", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Màu sắc (Color) */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Màu sắc</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Nhiệt độ màu</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.temp ?? 0) > 0 ? "+" : ""}
                {(adjustments.temp ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.temp ?? 0]}
              onValueChange={(v) => updateAdjustment("temp", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Tông màu</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.tint ?? 0) > 0 ? "+" : ""}
                {(adjustments.tint ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.tint ?? 0]}
              onValueChange={(v) => updateAdjustment("tint", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Rực rỡ</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.vibrance ?? 0) > 0 ? "+" : ""}
                {(adjustments.vibrance ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.vibrance ?? 0]}
              onValueChange={(v) => updateAdjustment("vibrance", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Bão hòa</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.saturation ?? 0) > 0 ? "+" : ""}
                {(adjustments.saturation ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.saturation ?? 0]}
              onValueChange={(v) => updateAdjustment("saturation", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Chi tiết (Detail) */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Chi tiết</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Làm nét</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.sharpen ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.sharpen ?? 0]}
              onValueChange={(v) => updateAdjustment("sharpen", v[0])}
              min={0}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Độ rõ</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.clarity ?? 0) > 0 ? "+" : ""}
                {(adjustments.clarity ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.clarity ?? 0]}
              onValueChange={(v) => updateAdjustment("clarity", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Khử mờ</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.dehaze ?? 0) > 0 ? "+" : ""}
                {(adjustments.dehaze ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.dehaze ?? 0]}
              onValueChange={(v) => updateAdjustment("dehaze", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Tối góc</Label>
              <span className="text-xs text-gray-500 font-mono">
                {(adjustments.vignette ?? 0) > 0 ? "+" : ""}
                {(adjustments.vignette ?? 0).toFixed(0)}
              </span>
            </div>
            <Slider
              value={[adjustments.vignette ?? 0]}
              onValueChange={(v) => updateAdjustment("vignette", v[0])}
              min={-100}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
