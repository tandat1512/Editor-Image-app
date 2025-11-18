// types.ts - Cấu trúc dữ liệu nâng cao cho Beauty Photo Editor Pro

export interface ImageState {
  // 1. Biến đổi hình học
  transform: {
    rotate: number; // 0, 90, 180, 270
    flipX: boolean;
    flipY: boolean;
    crop: {
      aspectRatio: string; // "Original", "1:1", "4:5", "9:16", "16:9"
      x: number;
      y: number;
      width: number;
      height: number;
    } | null;
  };

  // 2. Chỉnh sửa cơ bản
  adjustments: {
    exposure: number; // -100 to 100
    brightness: number; // -100 to 100
    contrast: number; // -100 to 100
    highlights: number; // -100 to 100
    shadows: number; // -100 to 100
    whites: number; // -100 to 100
    blacks: number; // -100 to 100
  };

  // 3. Màu sắc nâng cao
  color: {
    temp: number; // -100 to 100 (Nhiệt độ màu)
    tint: number; // -100 to 100 (Tông màu)
    vibrance: number; // -100 to 100 (Rực rỡ)
    saturation: number; // -100 to 100 (Bão hòa)
    hueShift: number; // -180 to 180 (Xoay màu)
  };

  // 4. HSL (Hue, Saturation, Luminance)
  hsl: {
    red: { hue: number; saturation: number; luminance: number };
    orange: { hue: number; saturation: number; luminance: number };
    yellow: { hue: number; saturation: number; luminance: number };
    green: { hue: number; saturation: number; luminance: number };
    aqua: { hue: number; saturation: number; luminance: number };
    blue: { hue: number; saturation: number; luminance: number };
    purple: { hue: number; saturation: number; luminance: number };
    magenta: { hue: number; saturation: number; luminance: number };
  };

  // 5. Làm đẹp PRO (Beauty Pro)
  beautyPro: {
    // Da (Skin)
    skinSmooth: number; // 0 to 100 (Mịn da)
    skinSmoothMode: 'natural' | 'strong'; // Chế độ mịn da
    skinWhiten: number; // 0 to 100 (Trắng da)
    acneRemoval: number; // 0 to 100 (Xóa mụn)
    dewySkin: number; // 0 to 100 (Da bóng Hàn Quốc)
    skinTexture: number; // 0 to 100 (Giữ kết cấu da)
    
    // Khuôn mặt (Face Reshape AI)
    faceReshapeMode: 'natural' | 'doll';
    slimFace: number; // 0 to 100 (Gọt mặt)
    vLine: number; // 0 to 100 (V-line)
    cheekboneLift: number; // 0 to 100 (Nâng gò má)
    jawline: number; // 0 to 100 (Cằm)
    chinSize: number; // -50 to 50 (Thu nhỏ cằm)
    foreheadAdjust: number; // -50 to 50 (Điều chỉnh trán)
    noseBridge: number; // -50 to 50 (Sống mũi)
    faceLifting: number; // 0 to 100 (Nâng cơ mặt)
    
    // Mắt (Eyes)
    eyeSize: number; // 0 to 100 (To mắt)
    eyeBrighten: number; // 0 to 100 (Sáng mắt)
    darkCircles: number; // 0 to 100 (Xóa thâm)
    eyebagRemoval: number; // 0 to 100 (Xóa bọng mắt)
    eyelidEnhance: number; // 0 to 100 (Tăng đường mí)
    eyeliner: boolean; // Kẻ mắt AI
    lensColor: string | null; // Màu lens (xám, nâu, xanh)
    
    // Miệng (Lips & Mouth)
    teethWhiten: number; // 0 to 100 (Trắng răng)
    lipShape: number; // 0 to 100 (Môi trái tim)
    lipPlump: number; // 0 to 100 (Môi đầy)
    lipColor: string | null; // Màu son AI
    lipIntensity: number; // 0 to 100
    smile: number; // 0 to 100 (Nụ cười)
    
    // Tóc (Hair)
    hairSmooth: number; // 0 to 100 (Mượt tóc)
    hairVolume: number; // 0 to 100 (Độ phồng)
    flyawayRemoval: number; // 0 to 100 (Xóa tóc con)
    hairColor: string | null; // Màu tóc
    hairColorIntensity: number; // 0 to 100
  };

  // 6. Cơ thể (Body)
  body: {
    waistSlim: number; // 0 to 100 (Thu eo)
    hipEnhance: number; // 0 to 100 (Nâng mông)
    armSlim: number; // 0 to 100 (Thu tay)
    legLengthen: number; // 0 to 100 (Dài chân)
    postureCorrection: number; // 0 to 100 (Chỉnh dáng)
  };

  // 7. Bộ lọc cao cấp
  filter: {
    category: string; // Korean, Japanese, Luxury, TikTok, Fantasy
    name: string | null;
    intensity: number; // 0 to 100
    preset: any; // Các giá trị preset
  };

  // 8. Hiệu ứng nghệ thuật
  effects: {
    bokeh: number; // 0 to 100 (Làm mờ nền)
    bokehShape: 'circular' | 'hexagonal'; // Hình dạng bokeh
    sparkle: number; // 0 to 100 (Lấp lánh)
    lightLeak: number; // 0 to 100 (Rò sáng film)
    filmDust: number; // 0 to 100 (Bụi film)
    lensFlare: number; // 0 to 100 (Chói sáng)
    neonGlow: number; // 0 to 100 (Ánh sáng neon)
    backgroundSoft: number; // 0 to 100 (Làm mềm nền)
    grain: number; // 0 to 100 (Hạt nhiễu)
    vignette: number; // -100 to 100 (Tối góc)
  };

  // 9. AI Pro
  aiPro: {
    autoEnhance: boolean;
    removeBackground: boolean;
    backgroundType: 'none' | 'solid' | 'gradient' | 'blur';
    backgroundColor: string | null;
    backgroundGradient: { from: string; to: string } | null;
    removeObject: {
      active: boolean;
      regions: Array<{ x: number; y: number; radius: number }>;
    };
    styleTransfer: {
      active: boolean;
      style: 'korean' | 'studio' | 'film' | 'beauty' | null;
    };
    faceSwap: {
      active: boolean;
      emotion: 'neutral' | 'smile' | 'laugh' | null;
    };
  };

  // 10. Chi tiết & Sharpness
  details: {
    sharpen: number; // 0 to 100
    clarity: number; // -100 to 100
    dehaze: number; // -100 to 100
    textureEnhance: number; // 0 to 100
  };

  // 11. Đường cong tông (Tone Curve)
  toneCurve: {
    rgb: Array<{ x: number; y: number }>;
    red: Array<{ x: number; y: number }>;
    green: Array<{ x: number; y: number }>;
    blue: Array<{ x: number; y: number }>;
  };

  // 12. Split Toning
  splitToning: {
    highlightColor: string;
    highlightIntensity: number;
    shadowColor: string;
    shadowIntensity: number;
    balance: number; // -100 to 100
  };
}

export interface FilterPreset {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  gradient: string; // For preview
  adjustments: Partial<ImageState>;
}

export interface HistogramData {
  red: number[];
  green: number[];
  blue: number[];
  luminance: number[];
}

export interface ExportSettings {
  format: 'jpg' | 'png' | 'webp';
  quality: number; // 1-100
  resolution: 'original' | 'hd' | '2k' | '4k';
  optimizeFor: 'web' | 'instagram' | 'facebook' | 'tiktok' | 'print';
  watermark: boolean;
  watermarkText?: string;
}

export interface LipColorOption {
  name: string;
  value: string;
  gradient: string;
}

export interface HairColorOption {
  name: string;
  value: string;
  gradient: string;
}
