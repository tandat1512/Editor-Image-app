import { ImageEdits } from "../App";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { ChevronDown, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface AdvancedSidebarProps {
  edits: ImageEdits;
  setEdits: React.Dispatch<React.SetStateAction<ImageEdits>>;
  hasImage: boolean;
  onReset: () => void;
}

interface ExtendedEdits extends ImageEdits {
  exposure: number;
  highlights: number;
  shadows: number;
  whites: number;
  blacks: number;
  temperature: number;
  tint: number;
  vibrance: number;
  saturation: number;
  sharpness: number;
  clarity: number;
  vignette: number;
}

export function AdvancedSidebar({
  edits,
  setEdits,
  hasImage,
  onReset,
}: AdvancedSidebarProps) {
  const [basicOpen, setBasicOpen] = useState(true);
  const [toneCurveOpen, setToneCurveOpen] = useState(false);
  const [colorGradingOpen, setColorGradingOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [effectsOpen, setEffectsOpen] = useState(false);

  const extendedEdits = edits as ExtendedEdits;

  const updateEdit = (key: keyof ExtendedEdits, value: number | boolean) => {
    setEdits((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-80 bg-[#1E1E1E] border-l border-[#2D2D2D] overflow-y-auto">
      <div className="p-4 space-y-1">
        {/* Histogram Placeholder */}
        <div className="mb-6">
          <div className="h-24 bg-[#2D2D2D] rounded-lg flex items-center justify-center">
            <span className="text-xs text-gray-500">Histogram</span>
          </div>
        </div>

        {/* BASIC Section */}
        <Collapsible open={basicOpen} onOpenChange={setBasicOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-[#2D2D2D] px-2 rounded">
            <span className="text-xs text-gray-400 tracking-wider">BASIC</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                basicOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-3 px-2">
            {/* Exposure */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Exposure</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.exposure > 0 ? "+" : ""}
                  {extendedEdits.exposure?.toFixed(1) || "+0.0"}
                </span>
              </div>
              <Slider
                value={[extendedEdits.exposure || 0]}
                onValueChange={(value) => updateEdit("exposure", value[0])}
                min={-100}
                max={100}
                step={1}
                disabled={!hasImage}
                className="w-full"
              />
            </div>

            {/* Contrast */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Contrast</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.contrast > 100 ? "+" : ""}
                  {extendedEdits.contrast - 100 || "0"}
                </span>
              </div>
              <Slider
                value={[extendedEdits.contrast]}
                onValueChange={(value) => updateEdit("contrast", value[0])}
                min={0}
                max={200}
                step={1}
                disabled={!hasImage}
                className="w-full"
              />
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Highlights</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.highlights || "0"}
                </span>
              </div>
              <Slider
                value={[extendedEdits.highlights || 0]}
                onValueChange={(value) => updateEdit("highlights", value[0])}
                min={-100}
                max={100}
                step={1}
                disabled={!hasImage}
                className="w-full"
              />
            </div>

            {/* Shadows */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Shadows</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.shadows || "0"}
                </span>
              </div>
              <Slider
                value={[extendedEdits.shadows || 0]}
                onValueChange={(value) => updateEdit("shadows", value[0])}
                min={-100}
                max={100}
                step={1}
                disabled={!hasImage}
                className="w-full"
              />
            </div>

            {/* Brightness */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Brightness</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.brightness - 100 || "0"}
                </span>
              </div>
              <Slider
                value={[extendedEdits.brightness]}
                onValueChange={(value) => updateEdit("brightness", value[0])}
                min={0}
                max={200}
                step={1}
                disabled={!hasImage}
                className="w-full"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* TONE CURVE Section */}
        <Collapsible open={toneCurveOpen} onOpenChange={setToneCurveOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-[#2D2D2D] px-2 rounded">
            <span className="text-xs text-gray-400 tracking-wider">
              TONE CURVE
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                toneCurveOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-3 px-2">
            <div className="h-32 bg-[#2D2D2D] rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">Tone Curve Editor</span>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* COLOR GRADING Section */}
        <Collapsible open={colorGradingOpen} onOpenChange={setColorGradingOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-[#2D2D2D] px-2 rounded">
            <span className="text-xs text-gray-400 tracking-wider">
              COLOR GRADING
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                colorGradingOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-3 px-2">
            {/* Temperature */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Temperature</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.temperature || "0"}
                </span>
              </div>
              <Slider
                value={[extendedEdits.temperature || 0]}
                onValueChange={(value) => updateEdit("temperature", value[0])}
                min={-100}
                max={100}
                step={1}
                disabled={!hasImage}
                className="w-full"
              />
            </div>

            {/* Tint */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Tint</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.tint || "0"}
                </span>
              </div>
              <Slider
                value={[extendedEdits.tint || 0]}
                onValueChange={(value) => updateEdit("tint", value[0])}
                min={-100}
                max={100}
                step={1}
                disabled={!hasImage}
                className="w-full"
              />
            </div>

            {/* Saturation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Saturation</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.saturation || "0"}
                </span>
              </div>
              <Slider
                value={[extendedEdits.saturation || 0]}
                onValueChange={(value) => updateEdit("saturation", value[0])}
                min={-100}
                max={100}
                step={1}
                disabled={!hasImage}
                className="w-full"
              />
            </div>

            {/* Vibrance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Vibrance</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.vibrance || "0"}
                </span>
              </div>
              <Slider
                value={[extendedEdits.vibrance || 0]}
                onValueChange={(value) => updateEdit("vibrance", value[0])}
                min={-100}
                max={100}
                step={1}
                disabled={!hasImage}
                className="w-full"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* DETAILS Section */}
        <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-[#2D2D2D] px-2 rounded">
            <span className="text-xs text-gray-400 tracking-wider">DETAILS</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                detailsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-3 px-2">
            {/* Sharpness */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Sharpness</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.sharpness || "0"}
                </span>
              </div>
              <Slider
                value={[extendedEdits.sharpness || 0]}
                onValueChange={(value) => updateEdit("sharpness", value[0])}
                min={0}
                max={100}
                step={1}
                disabled={!hasImage}
                className="w-full"
              />
            </div>

            {/* Clarity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Clarity</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.clarity || "0"}
                </span>
              </div>
              <Slider
                value={[extendedEdits.clarity || 0]}
                onValueChange={(value) => updateEdit("clarity", value[0])}
                min={-100}
                max={100}
                step={1}
                disabled={!hasImage}
                className="w-full"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* EFFECTS Section */}
        <Collapsible open={effectsOpen} onOpenChange={setEffectsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-[#2D2D2D] px-2 rounded">
            <span className="text-xs text-gray-400 tracking-wider">EFFECTS</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                effectsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-3 px-2">
            {/* Blur */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Blur</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.blur}px
                </span>
              </div>
              <Slider
                value={[extendedEdits.blur]}
                onValueChange={(value) => updateEdit("blur", value[0])}
                min={0}
                max={10}
                step={0.5}
                disabled={!hasImage}
                className="w-full"
              />
            </div>

            {/* Vignette */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Vignette</Label>
                <span className="text-xs text-gray-400">
                  {extendedEdits.vignette || "0"}
                </span>
              </div>
              <Slider
                value={[extendedEdits.vignette || 0]}
                onValueChange={(value) => updateEdit("vignette", value[0])}
                min={-100}
                max={100}
                step={1}
                disabled={!hasImage}
                className="w-full"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Reset Button */}
        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full border-[#2D2D2D] text-gray-400 hover:text-white hover:bg-[#2D2D2D]"
            onClick={onReset}
            disabled={!hasImage}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
}
