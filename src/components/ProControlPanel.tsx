import { useState } from "react";
import { ImageState } from "../types";
import { Button } from "./ui/button";
import { Histogram } from "./Histogram";
import { BasicTab } from "./tabs/BasicTab";
import { BeautyProTab } from "./tabs/BeautyProTab";
import { BodyTab } from "./tabs/BodyTab";
import { FilterProTab } from "./tabs/FilterProTab";
import { EffectsTab } from "./tabs/EffectsTab";
import { AIProTab } from "./tabs/AIProTab";
import {
  Wand2,
  Sun,
  Sparkles,
  User,
  Palette,
  Zap,
  Cpu,
  RotateCcw,
} from "lucide-react";

interface ProControlPanelProps {
  imageState: ImageState;
  onUpdate: (updates: Partial<ImageState>) => void;
  hasImage: boolean;
  image: string | null;
  onAutoEnhance: () => void;
}

export function ProControlPanel({
  imageState,
  onUpdate,
  hasImage,
  image,
  onAutoEnhance,
}: ProControlPanelProps) {
  const [activeTab, setActiveTab] = useState<string>("beauty");

  const tabs = [
    { id: "basic", name: "Cơ bản", icon: Sun, color: "blue" },
    { id: "beauty", name: "Làm đẹp", icon: Sparkles, color: "pink" },
    { id: "body", name: "Cơ thể", icon: User, color: "purple" },
    { id: "filter", name: "Bộ lọc", icon: Palette, color: "indigo" },
    { id: "effects", name: "Hiệu ứng", icon: Zap, color: "violet" },
    { id: "ai", name: "AI Pro", icon: Cpu, color: "cyan" },
  ];

  const handleReset = () => {
    if (
      window.confirm(
        "Bạn có chắc muốn đặt lại tất cả chỉnh sửa về mặc định?"
      )
    ) {
      // This would reset to default state
      console.log("Resetting all edits...");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <BasicTab
            imageState={imageState}
            onUpdate={onUpdate}
            hasImage={hasImage}
          />
        );
      case "beauty":
        return (
          <BeautyProTab
            imageState={imageState}
            onUpdate={onUpdate}
            hasImage={hasImage}
          />
        );
      case "body":
        return (
          <BodyTab
            imageState={imageState}
            onUpdate={onUpdate}
            hasImage={hasImage}
          />
        );
      case "filter":
        return (
          <FilterProTab
            imageState={imageState}
            onUpdate={onUpdate}
            hasImage={hasImage}
          />
        );
      case "effects":
        return (
          <EffectsTab
            imageState={imageState}
            onUpdate={onUpdate}
            hasImage={hasImage}
          />
        );
      case "ai":
        return (
          <AIProTab
            imageState={imageState}
            onUpdate={onUpdate}
            hasImage={hasImage}
            onAutoEnhance={onAutoEnhance}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col shadow-xl">
      {/* Header with Auto Enhance */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <Button
          onClick={onAutoEnhance}
          disabled={!hasImage}
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-lg"
        >
          <Wand2 className="w-4 h-4 mr-2" />
          ✨ Điều chỉnh tự động AI
        </Button>
      </div>

      {/* Histogram */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <Histogram image={image} />
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[80px] py-3 px-2 text-xs font-medium transition-all relative ${
                activeTab === tab.id
                  ? "text-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4 mx-auto mb-1" />
              <div>{tab.name}</div>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">{renderTabContent()}</div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
        <Button
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={handleReset}
          disabled={!hasImage}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Đặt lại tất cả
        </Button>

        <div className="flex items-center justify-center text-[10px] text-gray-500 pt-2">
          <Sparkles className="w-3 h-3 mr-1" />
          <span>Beauty Photo Editor Pro v1.0</span>
        </div>
      </div>
    </div>
  );
}
