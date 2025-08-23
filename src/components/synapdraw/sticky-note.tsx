'use client';

import { type MouseEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { type StickyNoteType } from './types';

interface StickyNoteProps {
  note: StickyNoteType;
  onMouseDown: (e: MouseEvent) => void;
  onChange: (content: string) => void;
}

const colorClasses = {
  yellow: 'bg-yellow-200 border-yellow-300 text-yellow-800',
  pink: 'bg-pink-200 border-pink-300 text-pink-800',
  blue: 'bg-blue-200 border-blue-300 text-blue-800',
  green: 'bg-green-200 border-green-300 text-green-800',
};

export function StickyNote({ note, onMouseDown, onChange }: StickyNoteProps) {
  return (
    <div
      className={cn(
        'absolute w-64 h-64 p-2 shadow-lg rounded-lg flex flex-col cursor-move transition-all duration-150 ease-in-out',
        colorClasses[note.color]
      )}
      style={{
        left: `${note.position.x}px`,
        top: `${note.position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseDown={onMouseDown}
    >
      <div className="w-full h-2 bg-white/30 rounded-t-sm mb-2" />
      <Textarea
        className="w-full flex-grow bg-transparent border-0 focus-visible:ring-0 resize-none text-base"
        value={note.content}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.stopPropagation()} // Prevent drag when clicking textarea
      />
    </div>
  );
}
