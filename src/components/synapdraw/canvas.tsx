'use client';

import { type MouseEvent } from 'react';
import { StickyNote } from './sticky-note';
import { Cursor } from './cursor';
import { type StickyNoteType, type UserCursorType } from './types';
import { cn } from '@/lib/utils';

interface CanvasProps {
  stickyNotes: StickyNoteType[];
  cursors: UserCursorType[];
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
  onNoteMouseDown: (id: string, e: MouseEvent) => void;
  onNoteChange: (id: string, content: string) => void;
}

export function Canvas({
  stickyNotes,
  cursors,
  onMouseMove,
  onMouseUp,
  onNoteMouseDown,
  onNoteChange,
}: CanvasProps) {
  return (
    <div
      className="relative h-screen w-full overflow-hidden cursor-none"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)',
        backgroundSize: '2rem 2rem',
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {/* This is a placeholder for the actual drawing canvas element */}
      <canvas className="absolute inset-0 pointer-events-none" />

      {stickyNotes.map((note) => (
        <StickyNote
          key={note.id}
          note={note}
          onMouseDown={(e) => onNoteMouseDown(note.id, e)}
          onChange={(content) => onNoteChange(note.id, content)}
        />
      ))}

      {cursors.map((cursor) => (
        <Cursor key={cursor.id} cursor={cursor} />
      ))}
    </div>
  );
}
