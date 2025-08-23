export type StickyNoteType = {
  id: string;
  position: { x: number; y: number };
  content: string;
  color: 'yellow' | 'pink' | 'blue' | 'green';
};

export type UserCursorType = {
  id: string;
  name: string;
  position: { x: number; y: number };
  color: string;
};

export type Tool = 'pen' | 'eraser' | 'sticky-note' | 'text' | 'shape';
