'use client';

import { useState, useEffect, useCallback, type MouseEvent } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Toolbar } from './toolbar';
import { Canvas } from './canvas';
import { type StickyNoteType, type UserCursorType } from './types';

const initialNotes: StickyNoteType[] = [
  {
    id: 'note-1',
    position: { x: 200, y: 150 },
    content: 'Brainstorm new marketing strategies for Q3.',
    color: 'yellow',
  },
  {
    id: 'note-2',
    position: { x: 450, y: 250 },
    content: 'Review user feedback from the last survey.',
    color: 'pink',
  },
  {
    id: 'note-3',
    position: { x: 300, y: 400 },
    content: 'Develop a prototype for the new mobile app feature.',
    color: 'blue',
  },
];

const initialCursors: UserCursorType[] = [
    { id: 'user-2', name: 'Alex', position: { x: 500, y: 300 }, color: '#34A853' },
    { id: 'user-3', name: 'Sam', position: { x: 800, y: 600 }, color: '#FBBC05' },
    { id: 'user-4', name: 'Casey', position: { x: 100, y: 500 }, color: '#EA4335' },
];

export function SynapDrawPage() {
  const [stickyNotes, setStickyNotes] = useState<StickyNoteType[]>(initialNotes);
  const [cursors, setCursors] = useState<UserCursorType[]>(initialCursors);
  const [myCursorPosition, setMyCursorPosition] = useState({ x: 0, y: 0 });

  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const updateNoteContent = (id: string, content: string) => {
    setStickyNotes((notes) =>
      notes.map((note) => (note.id === id ? { ...note, content } : note))
    );
  };
  
  const addStickyNote = () => {
    const newNote: StickyNoteType = {
      id: `note-${Date.now()}`,
      position: { x: 100, y: 100 },
      content: 'New Note',
      color: 'yellow',
    };
    setStickyNotes((notes) => [...notes, newNote]);
  };

  const handleNoteMouseDown = useCallback((id: string, e: MouseEvent) => {
    const note = stickyNotes.find((n) => n.id === id);
    if (note) {
      setDraggingNoteId(id);
      setDragOffset({
        x: e.clientX - note.position.x,
        y: e.clientY - note.position.y,
      });
    }
  }, [stickyNotes]);

  const handleCanvasMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    setMyCursorPosition({ x: clientX, y: clientY });
    if (draggingNoteId) {
      setStickyNotes((notes) =>
        notes.map((n) =>
          n.id === draggingNoteId
            ? { ...n, position: { x: clientX - dragOffset.x, y: clientY - dragOffset.y } }
            : n
        )
      );
    }
  }, [draggingNoteId, dragOffset]);

  const handleCanvasMouseUp = useCallback(() => {
    setDraggingNoteId(null);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursors(prev => prev.map(c => {
        const newX = c.position.x + (Math.random() - 0.5) * 50;
        const newY = c.position.y + (Math.random() - 0.5) * 50;
        return {
          ...c,
          position: {
            x: Math.max(0, Math.min(window.innerWidth - 100, newX)),
            y: Math.max(0, Math.min(window.innerHeight - 100, newY)),
          }
        }
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SidebarProvider>
      <Toolbar addStickyNote={addStickyNote} stickyNotes={stickyNotes} />
      <SidebarInset>
        <Canvas
          stickyNotes={stickyNotes}
          cursors={[...cursors, {id: 'me', name: 'You', position: myCursorPosition, color: 'hsl(var(--primary))'}]}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onNoteMouseDown={handleNoteMouseDown}
          onNoteChange={updateNoteContent}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
