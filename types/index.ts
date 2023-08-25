export type WidgetType = {
  id: string;
  content: string;
  col: number;
  row: number;
  width: number;
  height: number;
};

export interface DragItem {
  type: string;
  id: string;
  col: number;
  row: number;
}
