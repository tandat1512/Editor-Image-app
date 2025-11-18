import { useState } from "react";
import { ImageState } from "../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Histogram } from "./Histogram";
import { BasicTab } from "./tabs/BasicTab";
import { BeautyTab } from "./tabs/BeautyTab";
import { FilterTab } from "./tabs/FilterTab";
import { AITab } from "./tabs/AITab";
import { Wand2, ChevronUp, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface ControlPanelProps {
  imageState: ImageState;
  onUpdate: (updates: Partial<ImageState>) => void;
  hasImage: boolean;
  image: string | null;
  onAutoAdjust: () => void;
}

export function ControlPanel({
  imageState,
  onUpdate,
  hasImage,
  image,
  onAutoAdjust,
}: ControlPanelProps) {
  const [basicOpen, setBasicOpen] = useState(true);
  const [toneCurveOpen, setToneCurveOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [effectsOpen, setEffectsOpen] = useState(false);

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header with Auto Adjust */}
      <div className="p-4 border-b border-gray-200">
        <Button
          onClick={onAutoAdjust}
          disabled={!hasImage}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
        >
          <Wand2 className="w-4 h-4 mr-2" />
          Điều chỉnh tự động
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Histogram */}
          <Histogram image={image} />

          {/* Collapsible Sections */}
          <div className="space-y-1">
            {/* CƠ BẢN */}
            <Collapsible open={basicOpen} onOpenChange={setBasicOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-xs font-semibold text-gray-600 tracking-wider">
                  CƠ BẢN
                </span>
                {basicOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 px-3 pb-4">
                <BasicTab
                  imageState={imageState}
                  onUpdate={onUpdate}
                  hasImage={hasImage}
                />
              </CollapsibleContent>
            </Collapsible>

            {/* ĐƯỜNG CONG TÔNG */}
            <Collapsible open={toneCurveOpen} onOpenChange={setToneCurveOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-xs font-semibold text-gray-600 tracking-wider">
                  ĐƯỜNG CONG TÔNG
                </span>
                {toneCurveOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 px-3 pb-4">
                <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                  <span className="text-xs text-gray-400">
                    Công cụ đường cong RGB
                  </span>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* LÀM ĐẸP */}
            <Collapsible open={colorOpen} onOpenChange={setColorOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-xs font-semibold text-gray-600 tracking-wider">
                  LÀM ĐẸP
                </span>
                {colorOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 px-3 pb-4">
                <BeautyTab
                  imageState={imageState}
                  onUpdate={onUpdate}
                  hasImage={hasImage}
                />
              </CollapsibleContent>
            </Collapsible>

            {/* BỘ LỌC */}
            <Collapsible open={detailOpen} onOpenChange={setDetailOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-xs font-semibold text-gray-600 tracking-wider">
                  BỘ LỌC
                </span>
                {detailOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 px-3 pb-4">
                <FilterTab
                  imageState={imageState}
                  onUpdate={onUpdate}
                  hasImage={hasImage}
                />
              </CollapsibleContent>
            </Collapsible>

            {/* HIỆU ỨNG & AI */}
            <Collapsible open={effectsOpen} onOpenChange={setEffectsOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-xs font-semibold text-gray-600 tracking-wider">
                  HIỆU ỨNG & AI
                </span>
                {effectsOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 px-3 pb-4">
                <AITab
                  imageState={imageState}
                  onUpdate={onUpdate}
                  hasImage={hasImage}
                />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  );
}
