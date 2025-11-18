import { ImageState } from "../../types";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Sparkles, User, Eye, Smile } from "lucide-react";

interface BeautyTabProps {
  imageState: ImageState;
  onUpdate: (updates: Partial<ImageState>) => void;
  hasImage: boolean;
}

export function BeautyTab({ imageState, onUpdate, hasImage }: BeautyTabProps) {
  const updateBeauty = (key: keyof ImageState["beauty"], value: number | string | null) => {
    onUpdate({
      beauty: {
        ...imageState.beauty,
        [key]: value,
      },
    });
    console.log(`Updating beauty.${key}:`, value);
  };

  const lipColors = [
    { name: "Không", value: null },
    { name: "Hồng nhẹ", value: "#FFB6C1" },
    { name: "Đỏ tươi", value: "#DC143C" },
    { name: "Cam đào", value: "#FF6B6B" },
    { name: "Nâu", value: "#8B4513" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-gray-700">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">Làm đẹp chân dung</span>
      </div>

      {/* Da (Skin) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">Da</h3>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Mịn da</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.beauty.skinSmooth}
              </span>
            </div>
            <Slider
              value={[imageState.beauty.skinSmooth]}
              onValueChange={(v) => updateBeauty("skinSmooth", v[0])}
              min={0}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Trắng da</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.beauty.skinWhiten}
              </span>
            </div>
            <Slider
              value={[imageState.beauty.skinWhiten]}
              onValueChange={(v) => updateBeauty("skinWhiten", v[0])}
              min={0}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Tông da</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.beauty.skinTone > 0 ? "+" : ""}
                {imageState.beauty.skinTone}
              </span>
            </div>
            <Slider
              value={[imageState.beauty.skinTone]}
              onValueChange={(v) => updateBeauty("skinTone", v[0])}
              min={-50}
              max={50}
              step={1}
              disabled={!hasImage}
            />
            <div className="flex justify-between text-[10px] text-gray-400 px-1">
              <span>Lạnh</span>
              <span>Hồng</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Khuôn mặt (Face Reshape) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">Khuôn mặt</h3>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Gọn mặt</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.beauty.slimFace}
              </span>
            </div>
            <Slider
              value={[imageState.beauty.slimFace]}
              onValueChange={(v) => updateBeauty("slimFace", v[0])}
              min={0}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Cằm V-line</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.beauty.jawline}
              </span>
            </div>
            <Slider
              value={[imageState.beauty.jawline]}
              onValueChange={(v) => updateBeauty("jawline", v[0])}
              min={0}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Trán</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.beauty.forehead > 0 ? "+" : ""}
                {imageState.beauty.forehead}
              </span>
            </div>
            <Slider
              value={[imageState.beauty.forehead]}
              onValueChange={(v) => updateBeauty("forehead", v[0])}
              min={-50}
              max={50}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Gò má</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.beauty.cheekbone > 0 ? "+" : ""}
                {imageState.beauty.cheekbone}
              </span>
            </div>
            <Slider
              value={[imageState.beauty.cheekbone]}
              onValueChange={(v) => updateBeauty("cheekbone", v[0])}
              min={-50}
              max={50}
              step={1}
              disabled={!hasImage}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Mắt & Miệng (Eyes & Mouth) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">Mắt</h3>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">To mắt</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.beauty.eyeSize}
              </span>
            </div>
            <Slider
              value={[imageState.beauty.eyeSize]}
              onValueChange={(v) => updateBeauty("eyeSize", v[0])}
              min={0}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Sáng mắt</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.beauty.eyeBrighten}
              </span>
            </div>
            <Slider
              value={[imageState.beauty.eyeBrighten]}
              onValueChange={(v) => updateBeauty("eyeBrighten", v[0])}
              min={0}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Xóa thâm mắt</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.beauty.darkCircles}
              </span>
            </div>
            <Slider
              value={[imageState.beauty.darkCircles]}
              onValueChange={(v) => updateBeauty("darkCircles", v[0])}
              min={0}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Miệng */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Smile className="w-3.5 h-3.5 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">Miệng</h3>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Trắng răng</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.beauty.teethWhiten}
              </span>
            </div>
            <Slider
              value={[imageState.beauty.teethWhiten]}
              onValueChange={(v) => updateBeauty("teethWhiten", v[0])}
              min={0}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-600">Nụ cười</Label>
              <span className="text-xs text-gray-500 font-mono">
                {imageState.beauty.smile}
              </span>
            </div>
            <Slider
              value={[imageState.beauty.smile]}
              onValueChange={(v) => updateBeauty("smile", v[0])}
              min={0}
              max={100}
              step={1}
              disabled={!hasImage}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Trang điểm ảo */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Trang điểm ảo</h3>

        <div className="space-y-3">
          {/* Lip Color */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-600">Màu môi</Label>
            <div className="flex gap-2">
              {lipColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => updateBeauty("lipColor", color.value)}
                  disabled={!hasImage}
                  className={`flex-1 h-8 rounded border-2 transition-all ${
                    imageState.beauty.lipColor === color.value
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-300 hover:border-gray-400"
                  } ${!hasImage ? "opacity-50 cursor-not-allowed" : ""}`}
                  style={{
                    backgroundColor: color.value || "#F3F4F6",
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {imageState.beauty.lipColor && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-xs text-gray-600">Độ đậm môi</Label>
                <span className="text-xs text-gray-500 font-mono">
                  {imageState.beauty.lipIntensity}
                </span>
              </div>
              <Slider
                value={[imageState.beauty.lipIntensity]}
                onValueChange={(v) => updateBeauty("lipIntensity", v[0])}
                min={0}
                max={100}
                step={1}
                disabled={!hasImage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
