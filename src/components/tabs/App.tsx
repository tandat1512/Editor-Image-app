import { useState } from "react";
import { ImageState } from "./types";
import { EditorCanvas } from "./components/EditorCanvas";
import { ControlPanel } from "./components/ControlPanel";
import { Header } from "./components/Header";

function App() {
  const [imageState, setImageState] = useState<ImageState | null>(null);
  const [history, setHistory] = useState<(ImageState | null)[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const hasImage = imageState !== null;

  const updateState = (updates: Partial<ImageState>) => {
    const newState = {
      ...(imageState || {
        adjustments: {},
        transform: {},
        filters: [],
      }),
      ...updates,
    };

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setImageState(newState);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const initialState: ImageState = {
        imageUrl: e.target?.result as string,
        adjustments: {},
        transform: {},
        filters: [],
      };
      setImageState(initialState);
      setHistory([initialState]);
      setHistoryIndex(0);
    };
    reader.readAsDataURL(file);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setImageState(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setImageState(history[newIndex]);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Header onUndo={handleUndo} onRedo={handleRedo} canUndo={historyIndex > 0} canRedo={historyIndex < history.length - 1} />
      <main className="flex-1 flex flex-row overflow-hidden">
        {/* Cột Trái: Vùng Canvas */}
        <div className="flex-1 flex items-center justify-center bg-checkerboard overflow-hidden p-4">
          <EditorCanvas imageState={imageState} onImageUpload={handleImageUpload} />
        </div>

        {/* Cột Phải: Bảng điều khiển */}
        <ControlPanel imageState={imageState} onUpdate={updateState} hasImage={hasImage} />
      </main>
    </div>
  );
}

export default App;