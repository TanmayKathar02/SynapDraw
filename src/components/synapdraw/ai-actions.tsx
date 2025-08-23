'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  BrainCircuit,
  FileText,
  LayoutTemplate,
  Loader2,
} from 'lucide-react';
import { getBrainstormingIdeas } from '@/ai/flows/brainstorming-ideas';
import { summarizeWhiteboardContent } from '@/ai/flows/content-summarization';
import { diagramGeneration } from '@/ai/flows/diagram-generation';
import { useToast } from '@/hooks/use-toast';
import { type StickyNoteType } from './types';

interface AiActionsProps {
  stickyNotes: StickyNoteType[];
}

export function AiActions({ stickyNotes }: AiActionsProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const [brainstormResult, setBrainstormResult] = useState<string[]>([]);
  const [summaryResult, setSummaryResult] = useState<string>('');
  const [diagramResult, setDiagramResult] = useState<string>('');
  const [diagramPrompt, setDiagramPrompt] = useState('');

  const handleBrainstorm = async () => {
    setLoading('brainstorm');
    setBrainstormResult([]);
    try {
      const content = stickyNotes.map((note) => note.content).join('\n\n');
      if (!content.trim()) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'There is no content on the sticky notes to brainstorm from.',
        });
        return;
      }
      const result = await getBrainstormingIdeas({ stickyNotesContent: content });
      setBrainstormResult(result.ideas);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate brainstorming ideas.',
      });
    } finally {
      setLoading(null);
    }
  };

  const handleSummarize = async () => {
    setLoading('summarize');
    setSummaryResult('');
    try {
      const content = stickyNotes.map((note) => note.content).join('\n\n');
      if (!content.trim()) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'There is no content on the whiteboard to summarize.',
        });
        return;
      }
      const result = await summarizeWhiteboardContent({ whiteboardContent: content });
      setSummaryResult(result.summary);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate summary.',
      });
    } finally {
      setLoading(null);
    }
  };

  const handleGenerateDiagram = async () => {
    if (!diagramPrompt.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a prompt for the diagram.',
      });
      return;
    }
    setLoading('diagram');
    setDiagramResult('');
    try {
      const result = await diagramGeneration(diagramPrompt);
      setDiagramResult(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate diagram ideas.',
      });
    } finally {
      setLoading(null);
    }
  };
  
  return (
    <SidebarMenu>
      {/* Brainstorming Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Brainstorm Ideas" className="bg-accent/20 text-accent-foreground hover:bg-accent/30">
              <BrainCircuit className="text-accent" />
              <span>Brainstorm Ideas</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Brainstorming Assistant</DialogTitle>
            <DialogDescription>
              Generate new ideas based on the content of your sticky notes.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {loading === 'brainstorm' ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <ul className="space-y-2 list-disc list-inside bg-muted p-4 rounded-md min-h-40 max-h-64 overflow-y-auto">
                {brainstormResult.length > 0 ? (
                  brainstormResult.map((idea, index) => <li key={index}>{idea}</li>)
                ) : (
                  <p className="text-muted-foreground text-center">Click "Generate" to see AI-powered ideas here.</p>
                )}
              </ul>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleBrainstorm} disabled={loading === 'brainstorm'} className="bg-accent hover:bg-accent/90">
              {loading === 'brainstorm' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Summarization Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Summarize Content" className="bg-accent/20 text-accent-foreground hover:bg-accent/30">
              <FileText className="text-accent" />
              <span>Summarize Content</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Content Summarization</DialogTitle>
            <DialogDescription>
              Get a concise bullet-point summary of your whiteboard content.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
             {loading === 'summarize' ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
                <div className="space-y-2 bg-muted p-4 rounded-md min-h-40 max-h-64 overflow-y-auto">
                  {summaryResult ? (
                    <p className="whitespace-pre-wrap">{summaryResult}</p>
                  ) : (
                    <p className="text-muted-foreground text-center">Click "Generate" to get a summary of your board.</p>
                  )}
                </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleSummarize} disabled={loading === 'summarize'} className="bg-accent hover:bg-accent/90">
              {loading === 'summarize' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diagram Generation Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Generate Diagram" className="bg-accent/20 text-accent-foreground hover:bg-accent/30">
              <LayoutTemplate className="text-accent" />
              <span>Generate Diagram</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Diagram Generation</DialogTitle>
            <DialogDescription>
              Describe the diagram or flow you want, and the AI will suggest ideas.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <Textarea 
              placeholder="e.g., A user authentication flow for a web app"
              value={diagramPrompt}
              onChange={(e) => setDiagramPrompt(e.target.value)}
            />
             {loading === 'diagram' ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-2 bg-muted p-4 rounded-md min-h-40 max-h-64 overflow-y-auto">
                {diagramResult ? (
                  <p className="whitespace-pre-wrap">{diagramResult}</p>
                ) : (
                  <p className="text-muted-foreground text-center">Enter a prompt and click "Generate" to see diagram ideas.</p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleGenerateDiagram} disabled={loading === 'diagram'} className="bg-accent hover:bg-accent/90">
              {loading === 'diagram' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarMenu>
  );
}
