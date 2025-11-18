import { ImageState } from "../../types";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import {
  Sparkles,
  Eraser,
  Image as ImageIcon,
  Droplet,
} from "lucide-react";

interface AITabProps {
  imageState: ImageState;
  onUpdate: (updates: Partial<ImageState>) => void;
  hasImage: boolean;
}

export function AITab({ imageState, onUpdate, hasImage }: AITabProps) {
  const updateAI = (key: keyof ImageState["ai"], value: any) => {
    onUpdate({
      ai: {
        ...imageState.ai,
        [key]: value,
      },
    });
    console.log(`Updating ai.${key}:`, value);
  };

  const backgroundColors = [
    { name: "Trắng", value: "#FFFFFF" },
    { name: "Đen", value: "#000000" },
    { name: "Xám", value: "#9CA3AF" },
    { name: "Xanh", value: "#3B82F6" },
    { name: "Hồng", value: "#EC4899" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-gray-700">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">Công cụ AI</span>
      </div>

      {/* Remove Background */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-700">Xóa phông nền</p>
              <p className="text-xs text-gray-500">Tự động xóa nền ảnh</p>
            </div>
          </div>
          <Switch
            checked={imageState.ai.removeBackground}
            onCheckedChange={(checked) =>
              updateAI("removeBackground", checked)
            }
            disabled={!hasImage}
          />
        </div>

        {/* Background Replacement */}
        {imageState.ai.removeBackground && (
          <div className="space-y-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Label className="text-xs text-gray-700 font-medium">
              Chọn nền mới
            </Label>

            {/* Background Type Selection */}
            <div className="flex gap-2">
              <Button
                variant={
                  imageState.ai.backgroundType === "none" ? "default" : "outline"
                }
                size="sm"
                className="flex-1 h-8"
                onClick={() => updateAI("backgroundType", "none")}
                disabled={!hasImage}
              >
                Trong suốt
              </Button>
              <Button
                variant={
                  imageState.ai.backgroundType === "solid"
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="flex-1 h-8"
                onClick={() => updateAI("backgroundType", "solid")}
                disabled={!hasImage}
              >
                Màu đơn
              </Button>
              <Button
                variant={
                  imageState.ai.backgroundType === "gradient"
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="flex-1 h-8"
                onClick={() => updateAI("backgroundType", "gradient")}
                disabled={!hasImage}
              >
                Gradient
              </Button>
            </div>

            {/* Solid Color Picker */}
            {imageState.ai.backgroundType === "solid" && (
              <div className="flex gap-2">
                {backgroundColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateAI("backgroundColor", color.value)}
                    disabled={!hasImage}
                    className={`flex-1 h-10 rounded border-2 transition-all ${
                      imageState.ai.backgroundColor === color.value
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-px bg-gray-200" />

      {/* Magic Eraser */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Eraser className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-700">Tẩy thông minh</p>
              <p className="text-xs text-gray-500">Xóa vật thể không mong muốn</p>
            </div>
          </div>
          <Switch
            checked={imageState.ai.magicEraser.active}
            onCheckedChange={(checked) =>
              updateAI("magicEraser", {
                ...imageState.ai.magicEraser,
                active: checked,
              })
            }
            disabled={!hasImage}
          />
        </div>

        {imageState.ai.magicEraser.active && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-xs text-orange-700">
              💡 Nhấp vào ảnh để chọn vùng cần xóa
            </p>
          </div>
        )}
      </div>

      <div className="h-px bg-gray-200" />

      {/* Effects */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Droplet className="w-3.5 h-3.5 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">Hiệu ứng</h3>
        </div>

        <div className="space-y-3">
          {/* Bokeh */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Làm mờ phông (Bokeh)</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.ai.bokehAmount}
              </span>
            </div>
            <Slider
              value={[imageState.ai.bokehAmount]}
              onValueChange={(v) => updateAI("bokehAmount", v[0])}
              min={0}
              max={100}
              step={1}
              disabled={!hasImage}
            />
            <p className="text-[10px] text-gray-500">
              Làm mờ nền sau, tạo độ sâu trường ảnh
            </p>
          </div>

          {/* Grain */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Hạt nhiễu phim</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.ai.grain}
              </span>
            </div>
            <Slider
              value={[imageState.ai.grain]}
              onValueChange={(v) => updateAI("grain", v[0])}
              min={0}
              max={100}
              step={1}
              disabled={!hasImage}
            />
            <p className="text-[10px] text-gray-500">
              Thêm hạt nhiễu vintage như phim film
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* AI Enhance Placeholder */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-purple-900">
              Nâng cấp chất lượng AI
            </p>
            <p className="text-xs text-purple-700 mt-1">
              Tự động nâng cao độ phân giải, khử nhiễu và cải thiện chi tiết ảnh
            </p>
            <Button
              size="sm"
              className="mt-3 bg-purple-600 hover:bg-purple-700 text-white h-8"
              disabled={!hasImage}
            >
              Áp dụng AI Enhance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
