'use client';

import { MousePointer2 } from 'lucide-react';
import { type UserCursorType } from './types';
import { cn } from '@/lib/utils';

interface CursorProps {
  cursor: UserCursorType;
}

export function Cursor({ cursor }: CursorProps) {
  return (
    <div
      className="absolute flex items-center gap-2 pointer-events-none transition-all duration-100 ease-linear"
      style={{
        left: `${cursor.position.x}px`,
        top: `${cursor.position.y}px`,
        color: cursor.color,
      }}
    >
      <MousePointer2 className="w-6 h-6" style={{ transform: 'rotate(-15deg)' }} />
      <span className="px-2 py-1 text-sm text-white rounded-full" style={{ backgroundColor: cursor.color }}>
        {cursor.name}
      </span>
    </div>
  );
}
