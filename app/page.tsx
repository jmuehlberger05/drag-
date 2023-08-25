"use client";

import { useState } from "react";
import DragAndDropProvider from "../components/DragAndDropProvider";
import Grid from "../components/Grid";
import { WidgetType } from "../types";

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(false);

  // Toggle the edit mode
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const [widgets, setWidgets] = useState<WidgetType[]>([
    { id: "1", content: "Widget 1", col: 1, row: 1, width: 2, height: 2 },
    { id: "2", content: "Widget 2", col: 3, row: 1, width: 1, height: 3 },
    { id: "3", content: "Widget 3", col: 4, row: 1, width: 3, height: 2 },
  ]);

  const handleMoveWidget = (id: string, col: number, row: number) => {
    const newWidgets = widgets.map((widget) =>
      widget.id === id ? { ...widget, col, row } : widget
    );
    setWidgets(newWidgets);
  };

  return (
    <>
      <button onClick={() => toggleEditMode()}>
        {isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
      </button>

      <DragAndDropProvider>
        <Grid
          widgets={widgets}
          moveWidget={handleMoveWidget}
          isEditMode={isEditMode}
        />
      </DragAndDropProvider>
    </>
  );
}
