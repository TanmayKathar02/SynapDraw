// diagram-generation.ts
'use server';

/**
 * @fileOverview Diagram generation flow using Genkit and Gemini.
 *
 * This file defines a Genkit flow for generating diagram or flow ideas based on a text prompt.
 * It includes:
 * - diagramGeneration -  The function that triggers the diagram generation flow.
 * - DiagramGenerationInput - The input type for the diagramGeneration function.
 * - DiagramGenerationOutput - The output type for the diagramGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagramGenerationInputSchema = z.string().describe('A text prompt describing the desired diagram or flow idea.');
export type DiagramGenerationInput = z.infer<typeof DiagramGenerationInputSchema>;

const DiagramGenerationOutputSchema = z.string().describe('Suggested diagram or flow ideas based on the input prompt.');
export type DiagramGenerationOutput = z.infer<typeof DiagramGenerationOutputSchema>;

export async function diagramGeneration(input: DiagramGenerationInput): Promise<DiagramGenerationOutput> {
  return diagramGenerationFlow(input);
}

const diagramGenerationPrompt = ai.definePrompt({
  name: 'diagramGenerationPrompt',
  input: {schema: DiagramGenerationInputSchema},
  output: {schema: DiagramGenerationOutputSchema},
  prompt: `You are an AI assistant specialized in generating diagram and flow ideas based on user prompts.

  Based on the following prompt, suggest diagram or flow ideas that the user can use as a starting point for visualizing complex projects. Be concise and provide clear, actionable suggestions.

  Prompt: {{{$input}}}
  `,
});

const diagramGenerationFlow = ai.defineFlow(
  {
    name: 'diagramGenerationFlow',
    inputSchema: DiagramGenerationInputSchema,
    outputSchema: DiagramGenerationOutputSchema,
  },
  async input => {
    const {output} = await diagramGenerationPrompt(input);
    return output!;
  }
);
