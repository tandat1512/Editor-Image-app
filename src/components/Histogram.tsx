import { useEffect, useRef } from "react";
import { HistogramData } from "../types";

interface HistogramProps {
  image: string | null;
  onHistogramCalculated?: (data: HistogramData) => void;
}

export function Histogram({ image, onHistogramCalculated }: HistogramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!image || !canvasRef.current) {
      // Draw empty histogram
      drawEmptyHistogram();
      return;
    }

    calculateHistogram(image);
  }, [image]);

  const drawEmptyHistogram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#F3F4F6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#E5E7EB";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const y = (canvas.height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  const calculateHistogram = (imageSrc: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Scale down for performance
      const scale = Math.min(1, 200 / Math.max(img.width, img.height));
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Initialize histogram arrays
      const red = new Array(256).fill(0);
      const green = new Array(256).fill(0);
      const blue = new Array(256).fill(0);
      const luminance = new Array(256).fill(0);

      // Calculate histogram
      for (let i = 0; i < data.length; i += 4) {
        red[data[i]]++;
        green[data[i + 1]]++;
        blue[data[i + 2]]++;
        
        // Calculate luminance using standard formula
        const lum = Math.round(
          0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
        );
        luminance[lum]++;
      }

      const histogramData: HistogramData = { red, green, blue, luminance };
      
      if (onHistogramCalculated) {
        onHistogramCalculated(histogramData);
      }

      drawHistogram(histogramData);
    };
    img.src = imageSrc;
  };

  const drawHistogram = (data: HistogramData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = "#F9FAFB";
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = "#E5E7EB";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Find max value for scaling
    const maxRed = Math.max(...data.red);
    const maxGreen = Math.max(...data.green);
    const maxBlue = Math.max(...data.blue);
    const maxValue = Math.max(maxRed, maxGreen, maxBlue);

    if (maxValue === 0) return;

    // Helper function to draw channel
    const drawChannel = (
      channelData: number[],
      color: string,
      globalAlpha: number
    ) => {
      ctx.globalAlpha = globalAlpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, height);

      const barWidth = width / 256;
      
      for (let i = 0; i < 256; i++) {
        const x = i * barWidth;
        const barHeight = (channelData[i] / maxValue) * height;
        const y = height - barHeight;
        
        if (i === 0) {
          ctx.lineTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
    };

    // Draw RGB channels with transparency for blend effect
    drawChannel(data.red, "#EF4444", 0.5);
    drawChannel(data.green, "#10B981", 0.5);
    drawChannel(data.blue, "#3B82F6", 0.5);

    ctx.globalAlpha = 1;
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-3">
      <canvas
        ref={canvasRef}
        width={280}
        height={80}
        className="w-full h-20"
      />
    </div>
  );
}
