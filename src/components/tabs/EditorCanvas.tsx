import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { ImageState } from "../types";
import { UploadCloud } from "lucide-react";
import { Button } from "./ui/button";

interface EditorCanvasProps {
  imageState: ImageState | null;
  onImageUpload: (file: File) => void;
}

export function EditorCanvas({ imageState, onImageUpload }: EditorCanvasProps) {
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
    if (fileRejections.length > 0) {
      // Optional: Handle rejected files, e.g., show a toast notification
      console.error("File type not accepted");
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".gif", ".jpeg", ".jpg", ".webp"] },
    noClick: true, // Vô hiệu hóa mở cửa sổ file khi click vào dropzone
  });

  // Mở cửa sổ chọn file theo cách thủ công
  const openFileDialog = () => {
    const input = document.getElementById('file-input');
    if (input) {
      input.click();
    }
  };

  if (!imageState) {
    return (
      // Container cha: Xử lý drop và căn giữa
      <div {...getRootProps()} className="w-full h-full flex items-center justify-center">
        <input {...getInputProps()} id="file-input" />
        
        {/* Container con: Card hiển thị */}
        <div
          className={`
            flex flex-col items-center justify-center gap-4
            w-96 h-80 rounded-2xl
            border-2 border-dashed transition-all duration-300
            ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}
            bg-gray-50/50 dark:bg-gray-800/20
          `}
        >
          <UploadCloud className={`w-16 h-16 transition-colors ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
          <div className="text-center">
            <p className="font-medium text-gray-700 dark:text-gray-300">Kéo và thả ảnh vào đây</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">hoặc</p>
          </div>
          <Button onClick={openFileDialog} size="lg">Chọn ảnh</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={imageState.imageUrl}
        alt="Preview"
        className="max-w-full max-h-full object-contain"
        style={{
          transform: `rotate(${imageState.transform?.rotate ?? 0}deg) scaleX(${imageState.transform?.flipX ? -1 : 1}) scaleY(${imageState.transform?.flipY ? -1 : 1})`,
        }}
      />
    </div>
  );
}