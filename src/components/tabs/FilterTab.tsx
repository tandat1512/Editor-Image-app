import { ImageState, FilterPreset } from "../../types";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { useState } from "react";

interface FilterTabProps {
  imageState: ImageState;
  onUpdate: (updates: Partial<ImageState>) => void;
  hasImage: boolean;
}

export function FilterTab({ imageState, onUpdate, hasImage }: FilterTabProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Trending");

  const categories = ["Trending", "Vintage", "Film", "Pastel", "B&W"];

  // Mock filter presets
  const filters: FilterPreset[] = [
    {
      id: "none",
      name: "Không",
      category: "Trending",
      thumbnail: "",
      adjustments: {},
    },
    {
      id: "vivid",
      name: "Rực rỡ",
      category: "Trending",
      thumbnail: "",
      adjustments: { saturation: 30, vibrance: 20, contrast: 10 },
    },
    {
      id: "warm",
      name: "Ấm áp",
      category: "Trending",
      thumbnail: "",
      adjustments: { temp: 25, tint: 5, saturation: 10 },
    },
    {
      id: "cool",
      name: "Lạnh lẽo",
      category: "Trending",
      thumbnail: "",
      adjustments: { temp: -20, tint: -10, saturation: -5 },
    },
    {
      id: "vintage_01",
      name: "Retro",
      category: "Vintage",
      thumbnail: "",
      adjustments: { saturation: -20, temp: 15, vignette: -30 },
    },
    {
      id: "vintage_02",
      name: "Cổ điển",
      category: "Vintage",
      thumbnail: "",
      adjustments: { saturation: -30, contrast: -10, exposure: -5 },
    },
    {
      id: "film_01",
      name: "Film Analog",
      category: "Film",
      thumbnail: "",
      adjustments: { contrast: 15, saturation: -10, vignette: -20 },
    },
    {
      id: "film_02",
      name: "Kodak",
      category: "Film",
      thumbnail: "",
      adjustments: { temp: 10, saturation: 20, contrast: 20 },
    },
    {
      id: "pastel_01",
      name: "Pastel Mềm",
      category: "Pastel",
      thumbnail: "",
      adjustments: { saturation: -20, exposure: 10, contrast: -15 },
    },
    {
      id: "pastel_02",
      name: "Pastel Hồng",
      category: "Pastel",
      thumbnail: "",
      adjustments: { tint: 15, saturation: -10, exposure: 5 },
    },
    {
      id: "bw_01",
      name: "Đen Trắng",
      category: "B&W",
      thumbnail: "",
      adjustments: { saturation: -100 },
    },
    {
      id: "bw_02",
      name: "Tương phản cao",
      category: "B&W",
      thumbnail: "",
      adjustments: { saturation: -100, contrast: 40 },
    },
  ];

  const filteredFilters = filters.filter(
    (f) => f.category === activeCategory
  );

  const handleFilterSelect = (filter: FilterPreset) => {
    onUpdate({
      filter: {
        name: filter.id,
        category: filter.category,
        intensity: 100,
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
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
              activeCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-3 gap-3">
        {filteredFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterSelect(filter)}
            disabled={!hasImage}
            className={`aspect-square rounded-lg border-2 transition-all overflow-hidden ${
              imageState.filter.name === filter.id
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-300"
            } ${!hasImage ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              {filter.id === "none" ? (
                <span className="text-2xl">∅</span>
              ) : filter.category === "B&W" ? (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-400" />
              ) : filter.category === "Vintage" ? (
                <div className="w-full h-full bg-gradient-to-br from-amber-700 to-yellow-200" />
              ) : filter.category === "Film" ? (
                <div className="w-full h-full bg-gradient-to-br from-orange-600 to-red-300" />
              ) : filter.category === "Pastel" ? (
                <div className="w-full h-full bg-gradient-to-br from-pink-200 to-blue-200" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500" />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] py-1 px-1.5 truncate">
                {filter.name}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Intensity Slider */}
      {imageState.filter.name && imageState.filter.name !== "none" && (
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-gray-600">Cường độ bộ lọc</Label>
            <span className="text-xs text-gray-500 font-mono">
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
          />
        </div>
      )}
    </div>
  );
}
