import { ImageState } from "../../types";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { User } from "lucide-react";

interface BodyTabProps {
  imageState: ImageState;
  onUpdate: (updates: Partial<ImageState>) => void;
  hasImage: boolean;
}

export function BodyTab({ imageState, onUpdate, hasImage }: BodyTabProps) {
  const updateBody = (key: keyof ImageState["body"], value: number) => {
    onUpdate({
      body: {
        ...imageState.body,
        [key]: value,
      },
    });
    console.log(`Updating body.${key}:`, value);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-semibold text-purple-900">
            Chỉnh sửa cơ thể
          </span>
        </div>
      </div>

      <div className="space-y-4 p-1">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">Thu eo</Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.body.waistSlim}
            </span>
          </div>
          <Slider
            value={[imageState.body.waistSlim]}
            onValueChange={(v) => updateBody("waistSlim", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <p className="text-[10px] text-gray-500">
            Làm thon gọn vùng eo một cách tự nhiên
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">Nâng mông</Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.body.hipEnhance}
            </span>
          </div>
          <Slider
            value={[imageState.body.hipEnhance]}
            onValueChange={(v) => updateBody("hipEnhance", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <p className="text-[10px] text-gray-500">
            Tăng độ cong vùng hông và mông
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">Thu nhỏ bắp tay</Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.body.armSlim}
            </span>
          </div>
          <Slider
            value={[imageState.body.armSlim]}
            onValueChange={(v) => updateBody("armSlim", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <p className="text-[10px] text-gray-500">
            Làm thon gọn vùng cánh tay
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">Dài chân</Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.body.legLengthen}
            </span>
          </div>
          <Slider
            value={[imageState.body.legLengthen]}
            onValueChange={(v) => updateBody("legLengthen", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <p className="text-[10px] text-gray-500">
            Kéo dài đôi chân một cách cân đối
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">
              Chỉnh dáng AI (Posture)
            </Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.body.postureCorrection}
            </span>
          </div>
          <Slider
            value={[imageState.body.postureCorrection]}
            onValueChange={(v) => updateBody("postureCorrection", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <p className="text-[10px] text-gray-500">
            Tự động điều chỉnh tư thế đứng/ngồi đẹp hơn
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 <strong>Lưu ý:</strong> Điều chỉnh với mức độ vừa phải để giữ tính
          tự nhiên của ảnh. Mức 30-50 thường cho kết quả đẹp nhất!
        </p>
      </div>
    </div>
  );
}
