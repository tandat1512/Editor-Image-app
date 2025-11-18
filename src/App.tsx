import { useState } from "react";
import { ImageState } from "./types";
import { NewImagePreview } from "./components/NewImagePreview";
import { NewTopMenuBar } from "./components/NewTopMenuBar";
import { ProControlPanel } from "./components/ProControlPanel";

// Initialize default image state
const getDefaultImageState = (): ImageState => ({
  transform: {
    rotate: 0,
    flipX: false,
    flipY: false,
    crop: null,
  },
  adjustments: {
    exposure: 0,
    brightness: 0,
    contrast: 0,
    highlights: 0,
    shadows: 0,
    whites: 0,
    blacks: 0,
  },
  color: {
    temp: 0,
    tint: 0,
    vibrance: 0,
    saturation: 0,
    hueShift: 0,
  },
  hsl: {
    red: { hue: 0, saturation: 0, luminance: 0 },
    orange: { hue: 0, saturation: 0, luminance: 0 },
    yellow: { hue: 0, saturation: 0, luminance: 0 },
    green: { hue: 0, saturation: 0, luminance: 0 },
    aqua: { hue: 0, saturation: 0, luminance: 0 },
    blue: { hue: 0, saturation: 0, luminance: 0 },
    purple: { hue: 0, saturation: 0, luminance: 0 },
    magenta: { hue: 0, saturation: 0, luminance: 0 },
  },
  beautyPro: {
    skinSmooth: 0,
    skinSmoothMode: "natural",
    skinWhiten: 0,
    acneRemoval: 0,
    dewySkin: 0,
    skinTexture: 100,
    faceReshapeMode: "natural",
    slimFace: 0,
    vLine: 0,
    cheekboneLift: 0,
    jawline: 0,
    chinSize: 0,
    foreheadAdjust: 0,
    noseBridge: 0,
    faceLifting: 0,
    eyeSize: 0,
    eyeBrighten: 0,
    darkCircles: 0,
    eyebagRemoval: 0,
    eyelidEnhance: 0,
    eyeliner: false,
    lensColor: null,
    teethWhiten: 0,
    lipShape: 0,
    lipPlump: 0,
    lipColor: null,
    lipIntensity: 0,
    smile: 0,
    hairSmooth: 0,
    hairVolume: 0,
    flyawayRemoval: 0,
    hairColor: null,
    hairColorIntensity: 0,
  },
  body: {
    waistSlim: 0,
    hipEnhance: 0,
    armSlim: 0,
    legLengthen: 0,
    postureCorrection: 0,
  },
  filter: {
    category: "Korean",
    name: null,
    intensity: 100,
    preset: null,
  },
  effects: {
    bokeh: 0,
    bokehShape: "circular",
    sparkle: 0,
    lightLeak: 0,
    filmDust: 0,
    lensFlare: 0,
    neonGlow: 0,
    backgroundSoft: 0,
    grain: 0,
    vignette: 0,
  },
  aiPro: {
    autoEnhance: false,
    removeBackground: false,
    backgroundType: "none",
    backgroundColor: null,
    backgroundGradient: null,
    removeObject: {
      active: false,
      regions: [],
    },
    styleTransfer: {
      active: false,
      style: null,
    },
    faceSwap: {
      active: false,
      emotion: null,
    },
  },
  details: {
    sharpen: 0,
    clarity: 0,
    dehaze: 0,
    textureEnhance: 0,
  },
  toneCurve: {
    rgb: [],
    red: [],
    green: [],
    blue: [],
  },
  splitToning: {
    highlightColor: "#FFFFFF",
    highlightIntensity: 0,
    shadowColor: "#000000",
    shadowIntensity: 0,
    balance: 0,
  },
});

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>("beauty-edit-01.jpg");
  const [zoom, setZoom] = useState<number>(100);
  const [imageState, setImageState] = useState<ImageState>(
    getDefaultImageState()
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStateUpdate = (updates: Partial<ImageState>) => {
    setImageState((prev) => {
      const newState = { ...prev };

      // Deep merge for nested objects
      Object.keys(updates).forEach((key) => {
        const typedKey = key as keyof ImageState;
        if (typeof updates[typedKey] === "object" && updates[typedKey] !== null) {
          newState[typedKey] = {
            ...prev[typedKey],
            ...updates[typedKey],
          } as any;
        } else {
          newState[typedKey] = updates[typedKey] as any;
        }
      });

      return newState;
    });
  };

  const handleAutoEnhance = () => {
    console.log("AI Auto Enhance: Analyzing and improving image...");
    
    // Simulate AI auto enhancement
    handleStateUpdate({
      adjustments: {
        ...imageState.adjustments,
        exposure: 8,
        contrast: 12,
        highlights: -10,
        shadows: 15,
      },
      color: {
        ...imageState.color,
        vibrance: 20,
        saturation: 10,
      },
      details: {
        ...imageState.details,
        sharpen: 25,
        clarity: 15,
      },
      beautyPro: {
        ...imageState.beautyPro,
        skinSmooth: 30,
        skinWhiten: 15,
        eyeBrighten: 20,
      },
    });

    alert("✨ AI đã tự động cải thiện ảnh của bạn!\n\nĐã áp dụng: Cân bằng sáng tối, tăng độ rực rỡ, làm mịn da và sáng mắt.");
  };

  const handleExport = () => {
    console.log("Exporting image with full state:", imageState);
    alert(
      "💾 Chức năng Export đang được phát triển!\n\n" +
      "Sẽ hỗ trợ:\n" +
      "• JPG, PNG, WEBP\n" +
      "• HD, 2K, 4K\n" +
      "• Tối ưu cho Instagram, Facebook, TikTok\n\n" +
      "Trạng thái hiện tại đã được log ra console."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50 flex flex-col">
      {/* Top Menu Bar */}
      <NewTopMenuBar
        filename={filename}
        zoom={zoom}
        onZoomChange={setZoom}
        onExport={handleExport}
        hasImage={!!image}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Center - Image Preview */}
        <NewImagePreview
          image={image}
          imageState={imageState}
          onReplaceImage={handleImageUpload}
          zoom={zoom}
        />

        {/* Right Sidebar - Pro Control Panel */}
        <ProControlPanel
          imageState={imageState}
          onUpdate={handleStateUpdate}
          hasImage={!!image}
          image={image}
          onAutoEnhance={handleAutoEnhance}
        />
      </div>
    </div>
  );
}
