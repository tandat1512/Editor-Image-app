import { ImageState } from "../../types";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Sparkles, Circle } from "lucide-react";

interface EffectsTabProps {
  imageState: ImageState;
  onUpdate: (updates: Partial<ImageState>) => void;
  hasImage: boolean;
}

export function EffectsTab({
  imageState,
  onUpdate,
  hasImage,
}: EffectsTabProps) {
  const updateEffect = (key: keyof ImageState["effects"], value: any) => {
    onUpdate({
      effects: {
        ...imageState.effects,
        [key]: value,
      },
    });
    console.log(`Updating effects.${key}:`, value);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-semibold text-indigo-900">
            Hiệu ứng nghệ thuật
          </span>
        </div>
      </div>

      <div className="space-y-4 p-1">
        {/* Bokeh (Depth of Field) */}
        <div className="space-y-3 p-3 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-gray-700">
              Bokeh (Độ sâu trường ảnh)
            </Label>
            <span className="text-xs text-indigo-600 font-mono">
              {imageState.effects.bokeh}
            </span>
          </div>
          <Slider
            value={[imageState.effects.bokeh]}
            onValueChange={(v) => updateEffect("bokeh", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <div className="flex gap-2 mt-2">
            <Button
              variant={
                imageState.effects.bokehShape === "circular"
                  ? "default"
                  : "outline"
              }
              size="sm"
              className="flex-1 h-7 text-xs"
              onClick={() => updateEffect("bokehShape", "circular")}
              disabled={!hasImage}
            >
              <Circle className="w-3 h-3 mr-1" />
              Tròn
            </Button>
            <Button
              variant={
                imageState.effects.bokehShape === "hexagonal"
                  ? "default"
                  : "outline"
              }
              size="sm"
              className="flex-1 h-7 text-xs"
              onClick={() => updateEffect("bokehShape", "hexagonal")}
              disabled={!hasImage}
            >
              <span className="mr-1">⬡</span>
              Lục giác
            </Button>
          </div>
          <p className="text-[10px] text-gray-500">
            Làm mờ nền sau, tạo hiệu ứng máy ảnh chuyên nghiệp
          </p>
        </div>

        {/* Sparkle & Glow */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">
              ✨ Lấp lánh (Sparkle)
            </Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.effects.sparkle}
            </span>
          </div>
          <Slider
            value={[imageState.effects.sparkle]}
            onValueChange={(v) => updateEffect("sparkle", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <p className="text-[10px] text-gray-500">
            Thêm hiệu ứng lấp lánh lung linh
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Light Leak */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">
              💡 Rò sáng Film (Light Leak)
            </Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.effects.lightLeak}
            </span>
          </div>
          <Slider
            value={[imageState.effects.lightLeak]}
            onValueChange={(v) => updateEffect("lightLeak", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <p className="text-[10px] text-gray-500">
            Tạo vệt sáng màu như phim analog
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Film Dust */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">🎞️ Bụi phim (Dust)</Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.effects.filmDust}
            </span>
          </div>
          <Slider
            value={[imageState.effects.filmDust]}
            onValueChange={(v) => updateEffect("filmDust", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <p className="text-[10px] text-gray-500">
            Thêm hạt bụi vintage như phim cũ
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Lens Flare */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">
              ☀️ Chói sáng (Lens Flare)
            </Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.effects.lensFlare}
            </span>
          </div>
          <Slider
            value={[imageState.effects.lensFlare]}
            onValueChange={(v) => updateEffect("lensFlare", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <p className="text-[10px] text-gray-500">
            Hiệu ứng ánh sáng chói từ nguồn sáng
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Neon Glow */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">
              🌈 Ánh sáng Neon (Glow)
            </Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.effects.neonGlow}
            </span>
          </div>
          <Slider
            value={[imageState.effects.neonGlow]}
            onValueChange={(v) => updateEffect("neonGlow", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <p className="text-[10px] text-gray-500">
            Tạo viền sáng neon hiện đại
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Background Soft */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">
              🌫️ Làm mềm nền (Soft Focus)
            </Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.effects.backgroundSoft}
            </span>
          </div>
          <Slider
            value={[imageState.effects.backgroundSoft]}
            onValueChange={(v) => updateEffect("backgroundSoft", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <p className="text-[10px] text-gray-500">
            Làm mềm và mờ nền sau một cách tự nhiên
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Film Grain */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">
              🎬 Hạt nhiễu phim (Grain)
            </Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.effects.grain}
            </span>
          </div>
          <Slider
            value={[imageState.effects.grain]}
            onValueChange={(v) => updateEffect("grain", v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <p className="text-[10px] text-gray-500">
            Thêm độ hạt như phim 35mm
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Vignette */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">
              ⚫ Tối góc (Vignette)
            </Label>
            <span className="text-xs text-gray-500 font-mono">
              {imageState.effects.vignette > 0 ? "+" : ""}
              {imageState.effects.vignette}
            </span>
          </div>
          <Slider
            value={[imageState.effects.vignette]}
            onValueChange={(v) => updateEffect("vignette", v[0])}
            min={-100}
            max={100}
            step={1}
            disabled={!hasImage}
          />
          <div className="flex justify-between text-[10px] text-gray-500 px-1">
            <span>Sáng góc</span>
            <span>Tối góc</span>
          </div>
        </div>
      </div>

      {/* Creative Tips */}
      <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
        <p className="text-xs text-purple-900 mb-2">
          🎨 <strong>Gợi ý sáng tạo:</strong>
        </p>
        <ul className="text-[10px] text-purple-800 space-y-1 ml-4 list-disc">
          <li>Bokeh + Light Leak = Phong cách Film Analog</li>
          <li>Sparkle + Neon Glow = Aesthetic TikTok</li>
          <li>Film Dust + Grain + Vignette = Vintage 90s</li>
          <li>Background Soft + Lens Flare = Dreamy Portrait</li>
        </ul>
      </div>
    </div>
  );
}
