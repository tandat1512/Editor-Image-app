import { ImageState, FilterPreset } from "../../types";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { useState } from "react";
import { Sparkles } from "lucide-react";

interface FilterProTabProps {
  imageState: ImageState;
  onUpdate: (updates: Partial<ImageState>) => void;
  hasImage: boolean;
}

export function FilterProTab({
  imageState,
  onUpdate,
  hasImage,
}: FilterProTabProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Korean");

  const categories = [
    { id: "Korean", name: "Korean Soft", emoji: "🌸" },
    { id: "Japanese", name: "Japan Film", emoji: "🌺" },
    { id: "Luxury", name: "Luxury", emoji: "✨" },
    { id: "TikTok", name: "TikTok", emoji: "🎀" },
    { id: "Fantasy", name: "Fantasy", emoji: "🦄" },
  ];

  // Mock filter presets with gradients
  const filters: FilterPreset[] = [
    // Korean Soft
    { id: "none", name: "Gốc", category: "Korean", thumbnail: "", gradient: "from-gray-100 to-gray-200", adjustments: {} },
    { id: "korean_pink", name: "Pink Soft", category: "Korean", thumbnail: "", gradient: "from-pink-200 via-rose-200 to-pink-300", adjustments: {} },
    { id: "korean_peach", name: "Peach Baby", category: "Korean", thumbnail: "", gradient: "from-orange-200 via-pink-200 to-rose-200", adjustments: {} },
    { id: "korean_cloud", name: "Cloud Dream", category: "Korean", thumbnail: "", gradient: "from-blue-100 via-pink-100 to-purple-100", adjustments: {} },
    { id: "korean_rose", name: "Rose Gold", category: "Korean", thumbnail: "", gradient: "from-rose-300 via-pink-300 to-amber-200", adjustments: {} },
    { id: "korean_milk", name: "Milk Tea", category: "Korean", thumbnail: "", gradient: "from-amber-100 via-orange-100 to-pink-100", adjustments: {} },
    
    // Japanese Film
    { id: "japan_sakura", name: "Sakura", category: "Japanese", thumbnail: "", gradient: "from-pink-300 via-rose-200 to-pink-200", adjustments: {} },
    { id: "japan_fuji", name: "Fuji Film", category: "Japanese", thumbnail: "", gradient: "from-blue-300 via-teal-200 to-emerald-200", adjustments: {} },
    { id: "japan_summer", name: "Summer Day", category: "Japanese", thumbnail: "", gradient: "from-yellow-200 via-orange-200 to-red-200", adjustments: {} },
    { id: "japan_tokyo", name: "Tokyo Night", category: "Japanese", thumbnail: "", gradient: "from-blue-400 via-purple-400 to-pink-400", adjustments: {} },
    { id: "japan_zen", name: "Zen Garden", category: "Japanese", thumbnail: "", gradient: "from-emerald-200 via-teal-200 to-cyan-200", adjustments: {} },
    
    // Luxury
    { id: "lux_golden", name: "Golden Hour", category: "Luxury", thumbnail: "", gradient: "from-amber-400 via-yellow-300 to-orange-400", adjustments: {} },
    { id: "lux_champagne", name: "Champagne", category: "Luxury", thumbnail: "", gradient: "from-yellow-200 via-amber-200 to-yellow-300", adjustments: {} },
    { id: "lux_diamond", name: "Diamond", category: "Luxury", thumbnail: "", gradient: "from-blue-200 via-purple-200 to-pink-200", adjustments: {} },
    { id: "lux_royal", name: "Royal Purple", category: "Luxury", thumbnail: "", gradient: "from-purple-500 via-purple-400 to-pink-400", adjustments: {} },
    { id: "lux_sunset", name: "Sunset Glow", category: "Luxury", thumbnail: "", gradient: "from-orange-500 via-red-400 to-pink-400", adjustments: {} },
    
    // TikTok Trending
    { id: "tiktok_glow", name: "Glow Up", category: "TikTok", thumbnail: "", gradient: "from-pink-400 via-fuchsia-400 to-purple-400", adjustments: {} },
    { id: "tiktok_spark", name: "Sparkle", category: "TikTok", thumbnail: "", gradient: "from-yellow-300 via-pink-300 to-purple-400", adjustments: {} },
    { id: "tiktok_neon", name: "Neon Pop", category: "TikTok", thumbnail: "", gradient: "from-cyan-400 via-fuchsia-400 to-yellow-400", adjustments: {} },
    { id: "tiktok_candy", name: "Candy Pop", category: "TikTok", thumbnail: "", gradient: "from-pink-500 via-purple-400 to-blue-400", adjustments: {} },
    { id: "tiktok_glitter", name: "Glitter", category: "TikTok", thumbnail: "", gradient: "from-fuchsia-400 via-pink-500 to-rose-400", adjustments: {} },
    
    // Fantasy
    { id: "fantasy_fairy", name: "Fairy Tale", category: "Fantasy", thumbnail: "", gradient: "from-purple-300 via-pink-300 to-blue-300", adjustments: {} },
    { id: "fantasy_unicorn", name: "Unicorn", category: "Fantasy", thumbnail: "", gradient: "from-pink-400 via-purple-400 to-blue-400", adjustments: {} },
    { id: "fantasy_mermaid", name: "Mermaid", category: "Fantasy", thumbnail: "", gradient: "from-teal-400 via-blue-400 to-purple-400", adjustments: {} },
    { id: "fantasy_angel", name: "Angel", category: "Fantasy", thumbnail: "", gradient: "from-white via-blue-100 to-pink-100", adjustments: {} },
    { id: "fantasy_dream", name: "Dreamy", category: "Fantasy", thumbnail: "", gradient: "from-purple-200 via-pink-200 to-yellow-200", adjustments: {} },
  ];

  const filteredFilters = filters.filter((f) => f.category === activeCategory);

  const handleFilterSelect = (filter: FilterPreset) => {
    onUpdate({
      filter: {
        name: filter.id,
        category: filter.category,
        intensity: 100,
        preset: filter.adjustments,
      },
    });
    console.log("Selected filter:", filter.name);
  };

  const updateIntensity = (value: number) => {
    onUpdate({
      filter: {
        ...imageState.filter,
        intensity: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-semibold text-purple-900">
            Bộ lọc cao cấp
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span className="mr-2">{category.emoji}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterSelect(filter)}
            disabled={!hasImage}
            className={`aspect-square rounded-xl border-2 transition-all overflow-hidden relative ${
              imageState.filter.name === filter.id
                ? "border-purple-500 ring-2 ring-purple-200 scale-95"
                : "border-gray-200 hover:border-gray-300 hover:scale-95"
            } ${!hasImage ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div
              className={`w-full h-full bg-gradient-to-br ${filter.gradient} flex items-center justify-center`}
            >
              {filter.id === "none" && (
                <span className="text-3xl text-gray-400">∅</span>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs py-2 px-2 font-medium">
              {filter.name}
            </div>
            {imageState.filter.name === filter.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Intensity Slider */}
      {imageState.filter.name && imageState.filter.name !== "none" && (
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">Cường độ bộ lọc</Label>
            <span className="text-xs text-purple-600 font-mono font-medium">
              {imageState.filter.intensity}%
            </span>
          </div>
          <Slider
            value={[imageState.filter.intensity]}
            onValueChange={(v) => updateIntensity(v[0])}
            min={0}
            max={100}
            step={1}
            disabled={!hasImage}
            className="[&_[role=slider]]:bg-purple-500"
          />
          <p className="text-[10px] text-gray-500">
            Kéo để điều chỉnh độ mạnh của bộ lọc
          </p>
        </div>
      )}

      {/* Tips */}
      <div className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg">
        <p className="text-xs text-pink-900">
          ✨ <strong>Tips:</strong> Bộ lọc đã được tối ưu cho ảnh chân dung. Hãy
          thử kết hợp với các công cụ làm đẹp để có kết quả tốt nhất!
        </p>
      </div>
    </div>
  );
}
