"use client";

import { useDrop } from "react-dnd";
import { DragItem, WidgetType } from "../types";
import Widget from "./Widget";
import { useEffect, useRef, useState } from "react";

interface GridProps {
  widgets: WidgetType[];
  moveWidget: (id: string, col: number, row: number) => void;
  isEditMode: boolean;
}

const Grid: React.FC<GridProps> = ({ widgets, moveWidget, isEditMode }) => {
  const [placeholderPos, setPlaceholderPos] = useState<{
    col: number;
    row: number;
  } | null>(null);
  const [draggedWidget, setDraggedWidget] = useState<WidgetType | null>(null);

  const [, dropRef] = useDrop({
    accept: "WIDGET",
    hover: (item: DragItem, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number;
        y: number;
      };
      const col = Math.round(delta.x / 100) + item.col;
      const row = Math.round(delta.y / 100) + item.row;
      setPlaceholderPos({ col, row });
      setDraggedWidget(widgets.find((w) => w.id === item.id) || null);
    },
    drop: (item: DragItem, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number;
        y: number;
      };
      const col = Math.round(delta.x / 100) + item.col;
      const row = Math.round(delta.y / 100) + item.row;
      moveWidget(item.id, col, row);
      setPlaceholderPos(null); // clear the placeholder after dropping
    },
  });

  const [gridColumns, setGridColumns] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (ref.current) {
        const gridWidth = ref.current.offsetWidth;
        const columns = Math.floor(gridWidth / 100);
        setGridColumns(columns);
        // console.log(columns);
      }
    };

    updateColumns();

    // Optionally, if you want to respond to window resizes:
    window.addEventListener("resize", updateColumns);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", updateColumns);
  }, [isEditMode]); // Empty dependency array means this effect runs once after the initial render

  const MAX_ROWS = 4; // Or any other number you want
  const totalCells = (gridColumns - 1) * MAX_ROWS;

  return (
    <div ref={dropRef} className="grid">
      {isEditMode && (
        <div ref={ref} className="edit-mode-grid">
          {Array.from({ length: totalCells }).map((_, idx) => (
            <div key={idx} className="edit-mode-grid-cell" />
          ))}
        </div>
      )}
      {isEditMode && placeholderPos && (
        <div
          className="placeholder"
          style={{
            gridColumnStart: placeholderPos.col,
            gridRowStart: placeholderPos.row,
            gridColumnEnd: `span ${draggedWidget?.width}`,
            gridRowEnd: `span ${draggedWidget?.height}`,
          }}
        />
      )}

      {widgets.map((widget) => (
        <Widget
          key={widget.id}
          widget={widget}
          moveWidget={moveWidget}
          isEditMode={isEditMode}
        />
      ))}
    </div>
  );
};

export default Grid;
