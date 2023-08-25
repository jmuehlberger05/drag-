import { useRef } from "react";
import { useDrag } from "react-dnd";
import { DragItem } from "../types";
import { WidgetType } from "../types";

interface WidgetProps {
  widget: WidgetType;
  moveWidget: (id: string, col: number, row: number) => void;
  isEditMode: boolean; // New prop to check if edit mode is active
}

const Widget: React.FC<WidgetProps> = ({ widget, moveWidget, isEditMode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: "WIDGET",
    item: {
      id: widget.id,
      col: widget.col,
      row: widget.row,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEditMode, // Enable dragging only if edit mode is active
  });

  dragRef(ref);

  return (
    <div
      ref={ref}
      className="widget"
      style={{
        opacity: isDragging ? 0 : 1,
        gridColumn: `${widget.col} / span ${widget.width}`,
        gridRow: `${widget.row} / span ${widget.height}`,
        userSelect: isEditMode ? "none" : "auto", // Disable text selection only if edit mode is active
      }}
    >
      {widget.content}
    </div>
  );
};

export default Widget;
