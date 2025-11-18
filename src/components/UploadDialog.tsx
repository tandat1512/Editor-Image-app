import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadDialog({
  open,
  onOpenChange,
  onImageUpload,
}: UploadDialogProps) {
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
        "dialog-file-input"
      ) as HTMLInputElement;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        fileInput.files = dataTransfer.files;

        const event = {
          target: fileInput,
          currentTarget: fileInput,
        } as React.ChangeEvent<HTMLInputElement>;
        onImageUpload(event);
        onOpenChange(false);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageUpload(e);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Tải ảnh lên</DialogTitle>
          <DialogDescription>
            Chọn ảnh từ thiết bị để bắt đầu chỉnh sửa.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-xl p-12 
              transition-all duration-200 cursor-pointer
              flex flex-col items-center justify-center gap-4
              ${
                isDragging
                  ? "border-[#2563EB] bg-blue-50"
                  : "border-[#E5E7EB] hover:border-gray-400 hover:bg-gray-50"
              }
            `}
            onClick={() => document.getElementById("dialog-file-input")?.click()}
          >
            <div
              className={`
              p-4 rounded-full transition-colors
              ${
                isDragging
                  ? "bg-blue-100"
                  : "bg-gray-100"
              }
            `}
            >
              <Upload
                className={`w-8 h-8 ${
                  isDragging ? "text-[#2563EB]" : "text-gray-500"
                }`}
              />
            </div>

            <div className="text-center">
              <p className="text-gray-700 mb-1">
                Nhấn hoặc kéo ảnh vào đây
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF lên đến 10MB
              </p>
            </div>

            <input
              id="dialog-file-input"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        <DialogFooter className="flex-row gap-3 sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-[#E5E7EB]"
          >
            Huỷ
          </Button>
          <Button
            className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
            onClick={() => document.getElementById("dialog-file-input")?.click()}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Tải ảnh
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
