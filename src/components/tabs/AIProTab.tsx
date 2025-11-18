import { ImageState } from "../../types";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  Sparkles,
  Wand2,
  ImageOff,
  Eraser,
  Palette,
  SmilePlus,
} from "lucide-react";

interface AIProTabProps {
  imageState: ImageState;
  onUpdate: (updates: Partial<ImageState>) => void;
  hasImage: boolean;
  onAutoEnhance: () => void;
}

export function AIProTab({
  imageState,
  onUpdate,
  hasImage,
  onAutoEnhance,
}: AIProTabProps) {
  const updateAIPro = (key: keyof ImageState["aiPro"], value: any) => {
    onUpdate({
      aiPro: {
        ...imageState.aiPro,
        [key]: value,
      },
    });
    console.log(`Updating aiPro.${key}:`, value);
  };

  const backgroundColors = [
    { name: "Trắng", value: "#FFFFFF" },
    { name: "Xám nhạt", value: "#F3F4F6" },
    { name: "Hồng", value: "#FCE7F3" },
    { name: "Tím", value: "#F3E8FF" },
    { name: "Xanh", value: "#DBEAFE" },
  ];

  const styleTransferOptions = [
    { id: "korean", name: "Phong cách Hàn Quốc", gradient: "from-pink-300 to-rose-300" },
    { id: "studio", name: "Studio chuyên nghiệp", gradient: "from-gray-300 to-slate-300" },
    { id: "film", name: "Film Nhật Bản", gradient: "from-blue-300 to-teal-300" },
    { id: "beauty", name: "Beauty Blogger", gradient: "from-purple-300 to-pink-300" },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-50 via-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-semibold text-purple-900">
            AI Pro - Trí tuệ nhân tạo
          </span>
        </div>
      </div>

      {/* 1. AI AUTO ENHANCE */}
      <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
        <div className="flex items-start gap-3 mb-3">
          <Wand2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold mb-1">
              Nâng cấp tự động AI
            </h3>
            <p className="text-xs opacity-90">
              AI tự động phân tích và cải thiện: sáng tối, màu sắc, da, chi tiết
            </p>
          </div>
        </div>
        <Button
          onClick={onAutoEnhance}
          disabled={!hasImage}
          className="w-full bg-white text-purple-600 hover:bg-purple-50"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Áp dụng AI Enhance
        </Button>
      </div>

      {/* 2. REMOVE BACKGROUND */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageOff className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Xóa phông nền AI
              </p>
              <p className="text-xs text-gray-500">
                Tách nền siêu mịn, 1 chạm
              </p>
            </div>
          </div>
          <Switch
            checked={imageState.aiPro.removeBackground}
            onCheckedChange={(checked) =>
              updateAIPro("removeBackground", checked)
            }
            disabled={!hasImage}
          />
        </div>

        {/* Background Options */}
        {imageState.aiPro.removeBackground && (
          <div className="space-y-3 p-3 bg-blue-50 border border-blue-200 rounded-lg mt-3">
            <Label className="text-xs text-gray-700 font-medium">
              Chọn nền mới
            </Label>

            {/* Background Type */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={
                  imageState.aiPro.backgroundType === "none"
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="h-8 text-xs"
                onClick={() => updateAIPro("backgroundType", "none")}
                disabled={!hasImage}
              >
                Trong suốt
              </Button>
              <Button
                variant={
                  imageState.aiPro.backgroundType === "solid"
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="h-8 text-xs"
                onClick={() => updateAIPro("backgroundType", "solid")}
                disabled={!hasImage}
              >
                Màu đơn
              </Button>
              <Button
                variant={
                  imageState.aiPro.backgroundType === "gradient"
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="h-8 text-xs"
                onClick={() => updateAIPro("backgroundType", "gradient")}
                disabled={!hasImage}
              >
                Gradient
              </Button>
              <Button
                variant={
                  imageState.aiPro.backgroundType === "blur"
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="h-8 text-xs"
                onClick={() => updateAIPro("backgroundType", "blur")}
                disabled={!hasImage}
              >
                Làm mờ
              </Button>
            </div>

            {/* Solid Color Picker */}
            {imageState.aiPro.backgroundType === "solid" && (
              <div className="flex gap-2">
                {backgroundColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateAIPro("backgroundColor", color.value)}
                    disabled={!hasImage}
                    className={`flex-1 h-10 rounded border-2 transition-all ${
                      imageState.aiPro.backgroundColor === color.value
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

      {/* 3. REMOVE OBJECT */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eraser className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Xóa vật thể AI
              </p>
              <p className="text-xs text-gray-500">
                Xóa người, đồ vật không mong muốn
              </p>
            </div>
          </div>
          <Switch
            checked={imageState.aiPro.removeObject.active}
            onCheckedChange={(checked) =>
              updateAIPro("removeObject", {
                ...imageState.aiPro.removeObject,
                active: checked,
              })
            }
            disabled={!hasImage}
          />
        </div>

        {imageState.aiPro.removeObject.active && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-xs text-orange-700">
              💡 Nhấp vào ảnh để chọn vùng cần xóa. AI sẽ tự động lấp đầy nền.
            </p>
          </div>
        )}
      </div>

      {/* 4. STYLE TRANSFER */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Chuyển đổi phong cách AI
              </p>
              <p className="text-xs text-gray-500">
                Biến đổi phong cách ảnh tự động
              </p>
            </div>
          </div>
          <Switch
            checked={imageState.aiPro.styleTransfer.active}
            onCheckedChange={(checked) =>
              updateAIPro("styleTransfer", {
                ...imageState.aiPro.styleTransfer,
                active: checked,
              })
            }
            disabled={!hasImage}
          />
        </div>

        {imageState.aiPro.styleTransfer.active && (
          <div className="space-y-2 mt-3">
            {styleTransferOptions.map((style) => (
              <button
                key={style.id}
                onClick={() =>
                  updateAIPro("styleTransfer", {
                    active: true,
                    style: style.id,
                  })
                }
                disabled={!hasImage}
                className={`w-full p-3 rounded-lg border-2 transition-all bg-gradient-to-r ${
                  style.gradient
                } ${
                  imageState.aiPro.styleTransfer.style === style.id
                    ? "border-purple-500 ring-2 ring-purple-200"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <span className="text-xs font-medium text-gray-800">
                  {style.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 5. FACE SWAP (Optional) */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SmilePlus className="w-5 h-5 text-pink-600" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Chỉnh cảm xúc AI
              </p>
              <p className="text-xs text-gray-500">
                Thay đổi nụ cười, biểu cảm
              </p>
            </div>
          </div>
          <Switch
            checked={imageState.aiPro.faceSwap.active}
            onCheckedChange={(checked) =>
              updateAIPro("faceSwap", {
                ...imageState.aiPro.faceSwap,
                active: checked,
              })
            }
            disabled={!hasImage}
          />
        </div>

        {imageState.aiPro.faceSwap.active && (
          <div className="flex gap-2 mt-3">
            <Button
              variant={
                imageState.aiPro.faceSwap.emotion === "neutral"
                  ? "default"
                  : "outline"
              }
              size="sm"
              className="flex-1 h-9 text-xs"
              onClick={() =>
                updateAIPro("faceSwap", {
                  active: true,
                  emotion: "neutral",
                })
              }
              disabled={!hasImage}
            >
              😐 Bình thường
            </Button>
            <Button
              variant={
                imageState.aiPro.faceSwap.emotion === "smile"
                  ? "default"
                  : "outline"
              }
              size="sm"
              className="flex-1 h-9 text-xs"
              onClick={() =>
                updateAIPro("faceSwap", {
                  active: true,
                  emotion: "smile",
                })
              }
              disabled={!hasImage}
            >
              😊 Cười nhẹ
            </Button>
            <Button
              variant={
                imageState.aiPro.faceSwap.emotion === "laugh"
                  ? "default"
                  : "outline"
              }
              size="sm"
              className="flex-1 h-9 text-xs"
              onClick={() =>
                updateAIPro("faceSwap", {
                  active: true,
                  emotion: "laugh",
                })
              }
              disabled={!hasImage}
            >
              😄 Cười rộng
            </Button>
          </div>
        )}
      </div>

      {/* AI Info */}
      <div className="mt-4 p-4 bg-gradient-to-r from-cyan-50 to-purple-50 border border-cyan-200 rounded-lg">
        <p className="text-xs text-cyan-900 mb-2">
          🤖 <strong>Công nghệ AI:</strong>
        </p>
        <ul className="text-[10px] text-cyan-800 space-y-1 ml-4 list-disc">
          <li>Deep Learning - Nhận diện khuôn mặt & đối tượng</li>
          <li>Neural Style Transfer - Chuyển đổi phong cách</li>
          <li>Generative AI - Lấp đầy thông minh</li>
          <li>Computer Vision - Phân tích và tối ưu hóa</li>
        </ul>
      </div>
    </div>
  );
}
