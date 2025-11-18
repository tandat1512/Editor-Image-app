import { ImageState } from "../../types";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Sparkles, User, Eye, Smile, Scissors } from "lucide-react";
import { useState } from "react";

interface BeautyProTabProps {
  imageState: ImageState;
  onUpdate: (updates: Partial<ImageState>) => void;
  hasImage: boolean;
}

export function BeautyProTab({
  imageState,
  onUpdate,
  hasImage,
}: BeautyProTabProps) {
  const [skinExpanded, setSkinExpanded] = useState(true);
  const [faceExpanded, setFaceExpanded] = useState(true);
  const [eyesExpanded, setEyesExpanded] = useState(false);
  const [lipsExpanded, setLipsExpanded] = useState(false);
  const [hairExpanded, setHairExpanded] = useState(false);

  const updateBeautyPro = (
    key: keyof ImageState["beautyPro"],
    value: any
  ) => {
    onUpdate({
      beautyPro: {
        ...imageState.beautyPro,
        [key]: value,
      },
    });
    console.log(`Updating beautyPro.${key}:`, value);
  };

  const lipColors = [
    { name: "Không", value: null, gradient: "from-gray-200 to-gray-300" },
    { name: "Nude", value: "#E6B8A2", gradient: "from-amber-200 to-amber-300" },
    { name: "Hồng đất", value: "#D4A5A5", gradient: "from-pink-200 to-pink-300" },
    { name: "Đỏ", value: "#DC143C", gradient: "from-red-400 to-red-500" },
    { name: "Cam", value: "#FF6B6B", gradient: "from-orange-400 to-orange-500" },
    { name: "Rượu vang", value: "#8B2A4E", gradient: "from-rose-700 to-rose-800" },
  ];

  const hairColors = [
    { name: "Gốc", value: null, gradient: "from-gray-200 to-gray-300" },
    { name: "Nâu lạnh", value: "#6F5850", gradient: "from-stone-600 to-stone-700" },
    { name: "Hạt dẻ", value: "#8B4513", gradient: "from-amber-700 to-amber-800" },
    { name: "Rượu vang", value: "#722F37", gradient: "from-rose-900 to-red-900" },
    { name: "Khói xám", value: "#9CA3AF", gradient: "from-gray-400 to-gray-500" },
    { name: "Vàng", value: "#DAA520", gradient: "from-yellow-600 to-yellow-700" },
  ];

  const lensColors = [
    { name: "Không", value: null },
    { name: "Xám", value: "#9CA3AF" },
    { name: "Nâu", value: "#8B6B47" },
    { name: "Xanh", value: "#6B9BD1" },
    { name: "Xanh lá", value: "#82A67D" },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-600" />
          <span className="text-sm font-semibold text-pink-900">
            Beauty Pro - Làm đẹp chuyên sâu
          </span>
        </div>
      </div>

      {/* 1. DA (SKIN) */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setSkinExpanded(!skinExpanded)}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-gray-800">Da</span>
          </div>
          <span className="text-xs text-gray-500">
            {skinExpanded ? "▼" : "▶"}
          </span>
        </button>

        {skinExpanded && (
          <div className="p-4 pt-0 space-y-3 border-t border-gray-100">
            {/* Smooth Mode */}
            <div className="flex gap-2 mb-2">
              <Button
                variant={
                  imageState.beautyPro.skinSmoothMode === "natural"
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="flex-1 h-7 text-xs"
                onClick={() => updateBeautyPro("skinSmoothMode", "natural")}
                disabled={!hasImage}
              >
                Tự nhiên
              </Button>
              <Button
                variant={
                  imageState.beautyPro.skinSmoothMode === "strong"
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="flex-1 h-7 text-xs"
                onClick={() => updateBeautyPro("skinSmoothMode", "strong")}
                disabled={!hasImage}
              >
                Mạnh
              </Button>
            </div>

            <SliderControl
              label="Mịn da"
              value={imageState.beautyPro.skinSmooth}
              onChange={(v) => updateBeautyPro("skinSmooth", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Trắng da"
              value={imageState.beautyPro.skinWhiten}
              onChange={(v) => updateBeautyPro("skinWhiten", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Xóa mụn AI"
              value={imageState.beautyPro.acneRemoval}
              onChange={(v) => updateBeautyPro("acneRemoval", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Da bóng Hàn Quốc"
              value={imageState.beautyPro.dewySkin}
              onChange={(v) => updateBeautyPro("dewySkin", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Giữ kết cấu da"
              value={imageState.beautyPro.skinTexture}
              onChange={(v) => updateBeautyPro("skinTexture", v)}
              disabled={!hasImage}
            />
          </div>
        )}
      </div>

      {/* 2. KHUÔN MẶT (FACE RESHAPE) */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setFaceExpanded(!faceExpanded)}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-800">
              Khuôn mặt AI
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {faceExpanded ? "▼" : "▶"}
          </span>
        </button>

        {faceExpanded && (
          <div className="p-4 pt-0 space-y-3 border-t border-gray-100">
            {/* Reshape Mode */}
            <div className="flex gap-2 mb-2">
              <Button
                variant={
                  imageState.beautyPro.faceReshapeMode === "natural"
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="flex-1 h-7 text-xs"
                onClick={() => updateBeautyPro("faceReshapeMode", "natural")}
                disabled={!hasImage}
              >
                Tự nhiên
              </Button>
              <Button
                variant={
                  imageState.beautyPro.faceReshapeMode === "doll"
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="flex-1 h-7 text-xs"
                onClick={() => updateBeautyPro("faceReshapeMode", "doll")}
                disabled={!hasImage}
              >
                Búp bê
              </Button>
            </div>

            <SliderControl
              label="Gọt mặt"
              value={imageState.beautyPro.slimFace}
              onChange={(v) => updateBeautyPro("slimFace", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="V-line"
              value={imageState.beautyPro.vLine}
              onChange={(v) => updateBeautyPro("vLine", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Nâng gò má"
              value={imageState.beautyPro.cheekboneLift}
              onChange={(v) => updateBeautyPro("cheekboneLift", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Cằm"
              value={imageState.beautyPro.jawline}
              onChange={(v) => updateBeautyPro("jawline", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Thu nhỏ cằm"
              value={imageState.beautyPro.chinSize}
              onChange={(v) => updateBeautyPro("chinSize", v)}
              min={-50}
              max={50}
              disabled={!hasImage}
            />
            <SliderControl
              label="Điều chỉnh trán"
              value={imageState.beautyPro.foreheadAdjust}
              onChange={(v) => updateBeautyPro("foreheadAdjust", v)}
              min={-50}
              max={50}
              disabled={!hasImage}
            />
            <SliderControl
              label="Sống mũi"
              value={imageState.beautyPro.noseBridge}
              onChange={(v) => updateBeautyPro("noseBridge", v)}
              min={-50}
              max={50}
              disabled={!hasImage}
            />
            <SliderControl
              label="Nâng cơ mặt"
              value={imageState.beautyPro.faceLifting}
              onChange={(v) => updateBeautyPro("faceLifting", v)}
              disabled={!hasImage}
            />
          </div>
        )}
      </div>

      {/* 3. MẮT (EYES) */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setEyesExpanded(!eyesExpanded)}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-800">Mắt</span>
          </div>
          <span className="text-xs text-gray-500">
            {eyesExpanded ? "▼" : "▶"}
          </span>
        </button>

        {eyesExpanded && (
          <div className="p-4 pt-0 space-y-3 border-t border-gray-100">
            <SliderControl
              label="To mắt"
              value={imageState.beautyPro.eyeSize}
              onChange={(v) => updateBeautyPro("eyeSize", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Sáng mắt"
              value={imageState.beautyPro.eyeBrighten}
              onChange={(v) => updateBeautyPro("eyeBrighten", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Xóa thâm mắt"
              value={imageState.beautyPro.darkCircles}
              onChange={(v) => updateBeautyPro("darkCircles", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Xóa bọng mắt"
              value={imageState.beautyPro.eyebagRemoval}
              onChange={(v) => updateBeautyPro("eyebagRemoval", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Tăng đường mí"
              value={imageState.beautyPro.eyelidEnhance}
              onChange={(v) => updateBeautyPro("eyelidEnhance", v)}
              disabled={!hasImage}
            />

            {/* Eyeliner */}
            <div className="flex items-center justify-between pt-2">
              <Label className="text-xs text-gray-600">Kẻ mắt AI</Label>
              <input
                type="checkbox"
                checked={imageState.beautyPro.eyeliner}
                onChange={(e) => updateBeautyPro("eyeliner", e.target.checked)}
                disabled={!hasImage}
                className="w-4 h-4"
              />
            </div>

            {/* Lens Color */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-600">Màu lens</Label>
              <div className="flex gap-2">
                {lensColors.map((lens) => (
                  <button
                    key={lens.name}
                    onClick={() => updateBeautyPro("lensColor", lens.value)}
                    disabled={!hasImage}
                    className={`flex-1 h-8 rounded border-2 transition-all ${
                      imageState.beautyPro.lensColor === lens.value
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{
                      backgroundColor: lens.value || "#F3F4F6",
                    }}
                    title={lens.name}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. MIỆNG (LIPS) */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setLipsExpanded(!lipsExpanded)}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Smile className="w-4 h-4 text-rose-600" />
            <span className="text-sm font-medium text-gray-800">Miệng</span>
          </div>
          <span className="text-xs text-gray-500">
            {lipsExpanded ? "▼" : "▶"}
          </span>
        </button>

        {lipsExpanded && (
          <div className="p-4 pt-0 space-y-3 border-t border-gray-100">
            <SliderControl
              label="Trắng răng"
              value={imageState.beautyPro.teethWhiten}
              onChange={(v) => updateBeautyPro("teethWhiten", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Môi trái tim"
              value={imageState.beautyPro.lipShape}
              onChange={(v) => updateBeautyPro("lipShape", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Môi đầy"
              value={imageState.beautyPro.lipPlump}
              onChange={(v) => updateBeautyPro("lipPlump", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Nụ cười"
              value={imageState.beautyPro.smile}
              onChange={(v) => updateBeautyPro("smile", v)}
              disabled={!hasImage}
            />

            {/* Lip Color */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-600">Son AI</Label>
              <div className="grid grid-cols-3 gap-2">
                {lipColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => updateBeautyPro("lipColor", color.value)}
                    disabled={!hasImage}
                    className={`h-10 rounded-lg border-2 transition-all bg-gradient-to-br ${
                      color.gradient
                    } ${
                      imageState.beautyPro.lipColor === color.value
                        ? "border-pink-500 ring-2 ring-pink-200"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    title={color.name}
                  >
                    <span className="text-[10px] text-white drop-shadow">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {imageState.beautyPro.lipColor && (
              <SliderControl
                label="Độ đậm son"
                value={imageState.beautyPro.lipIntensity}
                onChange={(v) => updateBeautyPro("lipIntensity", v)}
                disabled={!hasImage}
              />
            )}
          </div>
        )}
      </div>

      {/* 5. TÓC (HAIR) */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setHairExpanded(!hairExpanded)}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-gray-800">Tóc</span>
          </div>
          <span className="text-xs text-gray-500">
            {hairExpanded ? "▼" : "▶"}
          </span>
        </button>

        {hairExpanded && (
          <div className="p-4 pt-0 space-y-3 border-t border-gray-100">
            <SliderControl
              label="Mượt tóc"
              value={imageState.beautyPro.hairSmooth}
              onChange={(v) => updateBeautyPro("hairSmooth", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Độ phồng"
              value={imageState.beautyPro.hairVolume}
              onChange={(v) => updateBeautyPro("hairVolume", v)}
              disabled={!hasImage}
            />
            <SliderControl
              label="Xóa tóc con"
              value={imageState.beautyPro.flyawayRemoval}
              onChange={(v) => updateBeautyPro("flyawayRemoval", v)}
              disabled={!hasImage}
            />

            {/* Hair Color */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-600">Màu tóc AI</Label>
              <div className="grid grid-cols-3 gap-2">
                {hairColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => updateBeautyPro("hairColor", color.value)}
                    disabled={!hasImage}
                    className={`h-10 rounded-lg border-2 transition-all bg-gradient-to-br ${
                      color.gradient
                    } ${
                      imageState.beautyPro.hairColor === color.value
                        ? "border-amber-500 ring-2 ring-amber-200"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    title={color.name}
                  >
                    <span className="text-[10px] text-white drop-shadow">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {imageState.beautyPro.hairColor && (
              <SliderControl
                label="Độ đậm màu"
                value={imageState.beautyPro.hairColorIntensity}
                onChange={(v) => updateBeautyPro("hairColorIntensity", v)}
                disabled={!hasImage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper component for sliders
function SliderControl({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <Label className="text-xs text-gray-600">{label}</Label>
        <span className="text-xs text-gray-500 font-mono">
          {value > 0 && min >= 0 ? "+" : ""}
          {value}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        min={min}
        max={max}
        step={1}
        disabled={disabled}
      />
    </div>
  );
}
