import { ImageState } from "../types";
import { Upload } from "lucide-react";
import { useState } from "react";

interface NewImagePreviewProps {
  image: string | null;
  imageState: ImageState;
  onReplaceImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  zoom: number;
}

export function NewImagePreview({
  image,
  imageState,
  onReplaceImage,
  zoom,
}: NewImagePreviewProps) {
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
      const fileInput = document.getElementById(
        "main-file-input"
      ) as HTMLInputElement;
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
    const filters = [];

    // Basic adjustments
    if (imageState.adjustments.exposure !== 0) {
      const brightness = 100 + imageState.adjustments.exposure;
      filters.push(`brightness(${brightness}%)`);
    }
    if (imageState.adjustments.contrast !== 0) {
      const contrast = 100 + imageState.adjustments.contrast;
      filters.push(`contrast(${contrast}%)`);
    }
    if (imageState.adjustments.saturation !== 0) {
      const saturation = 100 + imageState.adjustments.saturation;
      filters.push(`saturate(${saturation}%)`);
    }

    return {
      filter: filters.length > 0 ? filters.join(" ") : "none",
      transform: `rotate(${imageState.transform.rotate}deg) scaleX(${
        imageState.transform.flipX ? -1 : 1
      }) scaleY(${imageState.transform.flipY ? -1 : 1}) scale(${zoom / 100})`,
    };
  };

  return (
    <div
      className="flex-1 bg-gray-100 flex items-center justify-center relative overflow-hidden"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="w-full h-full flex items-center justify-center checkboard-bg">
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="max-w-full max-h-full object-contain transition-all duration-200"
            style={getImageStyle()}
          />
        ) : (
          <div
            className={`flex flex-col items-center justify-center text-gray-400 transition-all ${
              isDragging ? "scale-105" : ""
            }`}
          >
            <div
              className={`
                flex flex-col items-center justify-center gap-4
                w-96 h-80 rounded-2xl
                border-2 border-dashed transition-all duration-300
                ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}
                bg-gray-50/50 dark:bg-gray-800/20
              `}
              onClick={() => document.getElementById("main-file-input")?.click()}
            >
              <Upload className={`w-16 h-16 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
              <div className="text-center">
                <p className="font-medium text-gray-700 dark:text-gray-300">Kéo và thả ảnh vào đây</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">hoặc nhấn để chọn file</p>
              </div>
            </div>
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
        .checkboard-bg {
          background-image: 
            linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
            linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
            linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          background-color: #fafafa;
        }
      `}</style>
    </div>
  );
}
