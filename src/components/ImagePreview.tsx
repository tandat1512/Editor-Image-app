import { ImageEdits } from "../App";
import { Upload } from "lucide-react";
import { useState } from "react";

interface ImagePreviewProps {
  image: string | null;
  edits: ImageEdits;
  filename: string;
  onReplaceImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  zoom: number;
}

interface ExtendedEdits extends ImageEdits {
  exposure?: number;
  highlights?: number;
  shadows?: number;
  temperature?: number;
  tint?: number;
  vibrance?: number;
  saturation?: number;
  sharpness?: number;
  clarity?: number;
  vignette?: number;
}

export function ImagePreview({ image, edits, filename, onReplaceImage, zoom }: ImagePreviewProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const fileInput = document.getElementById("main-file-input") as HTMLInputElement;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        fileInput.files = dataTransfer.files;

        const event = {
          target: fileInput,
          currentTarget: fileInput,
        } as React.ChangeEvent<HTMLInputElement>;
        onReplaceImage(event);
      }
    }
  };

  const getImageStyle = () => {
    const extendedEdits = edits as ExtendedEdits;
    const filters = [];
    
    if (extendedEdits.blur > 0) {
      filters.push(`blur(${extendedEdits.blur}px)`);
    }
    if (extendedEdits.grayscale) {
      filters.push("grayscale(100%)");
    }
    if (extendedEdits.brightness !== 100) {
      filters.push(`brightness(${extendedEdits.brightness}%)`);
    }
    if (extendedEdits.contrast !== 100) {
      filters.push(`contrast(${extendedEdits.contrast}%)`);
    }
    if (extendedEdits.saturation) {
      filters.push(`saturate(${100 + extendedEdits.saturation}%)`);
    }

    return {
      filter: filters.length > 0 ? filters.join(" ") : "none",
      transform: `rotate(${extendedEdits.rotation}deg) scaleX(${extendedEdits.flipHorizontal ? -1 : 1}) scaleY(${extendedEdits.flipVertical ? -1 : 1}) scale(${zoom / 100})`,
    };
  };

  return (
    <div 
      className="flex-1 bg-[#2A2A2A] flex items-center justify-center relative"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="w-full h-full flex items-center justify-center checkboard-bg-dark">
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="max-w-full max-h-full object-contain transition-all duration-200"
            style={getImageStyle()}
          />
        ) : (
          <div 
            className={`flex flex-col items-center justify-center text-gray-500 cursor-pointer transition-all ${
              isDragging ? "scale-105" : ""
            }`}
            onClick={() => document.getElementById("main-file-input")?.click()}
          >
            <Upload className="w-16 h-16 mb-4 stroke-[1.5]" />
            <p className="text-base">Kéo và thả ảnh vào đây</p>
            <p className="text-xs mt-2 text-gray-600">hoặc nhấn để chọn file</p>
          </div>
        )}
      </div>

      <input
        id="main-file-input"
        type="file"
        accept="image/*"
        onChange={onReplaceImage}
        className="hidden"
      />

      <style>{`
        .checkboard-bg-dark {
          background-image: 
            linear-gradient(45deg, #1a1a1a 25%, transparent 25%),
            linear-gradient(-45deg, #1a1a1a 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #1a1a1a 75%),
            linear-gradient(-45deg, transparent 75%, #1a1a1a 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          background-color: #2A2A2A;
        }
      `}</style>
    </div>
  );
}