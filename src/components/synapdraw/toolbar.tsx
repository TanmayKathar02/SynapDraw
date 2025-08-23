'use client';

import { useState } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Pen,
  Eraser,
  Square,
  StickyNote,
  Type,
} from 'lucide-react';
import { AiActions } from './ai-actions';
import { type StickyNoteType, type Tool } from './types';

interface ToolbarProps {
  addStickyNote: () => void;
  stickyNotes: StickyNoteType[];
}

export function Toolbar({ addStickyNote, stickyNotes }: ToolbarProps) {
  const [activeTool, setActiveTool] = useState<Tool>('pen');

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
            >
                <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="currentColor"
                />
                <path
                d="M12 6C8.69 6 6 8.69 6 12H8C8 9.79 9.79 8 12 8V6Z"
                fill="currentColor"
                />
            </svg>
            <h1 className="text-xl font-semibold">AI Whiteboard</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Pen"
              onClick={() => setActiveTool('pen')}
              isActive={activeTool === 'pen'}
            >
              <Pen />
              <span>Pen</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Eraser"
              onClick={() => setActiveTool('eraser')}
              isActive={activeTool === 'eraser'}
            >
              <Eraser />
              <span>Eraser</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Shapes"
              onClick={() => setActiveTool('shape')}
              isActive={activeTool === 'shape'}
            >
              <Square />
              <span>Shapes</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sticky Note"
              onClick={() => {
                setActiveTool('sticky-note');
                addStickyNote();
              }}
              isActive={activeTool === 'sticky-note'}
            >
              <StickyNote />
              <span>Sticky Note</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Text"
              onClick={() => setActiveTool('text')}
              isActive={activeTool === 'text'}
            >
              <Type />
              <span>Text</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
        <AiActions stickyNotes={stickyNotes} />
      </SidebarContent>
    </Sidebar>
  );
}
