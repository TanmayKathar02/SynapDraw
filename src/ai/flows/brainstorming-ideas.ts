'use server';

/**
 * @fileOverview Brainstorming ideas AI agent.
 *
 * - getBrainstormingIdeas - A function that generates brainstorming ideas based on sticky notes content.
 * - BrainstormingIdeasInput - The input type for the getBrainstormingIdeas function.
 * - BrainstormingIdeasOutput - The return type for the getBrainstormingIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BrainstormingIdeasInputSchema = z.object({
  stickyNotesContent: z
    .string()
    .describe('The combined text content of all sticky notes on the whiteboard.'),
});
export type BrainstormingIdeasInput = z.infer<typeof BrainstormingIdeasInputSchema>;

const BrainstormingIdeasOutputSchema = z.object({
  ideas: z
    .array(z.string())
    .describe('An array of brainstorming ideas related to the sticky notes content.'),
});
export type BrainstormingIdeasOutput = z.infer<typeof BrainstormingIdeasOutputSchema>;

export async function getBrainstormingIdeas(input: BrainstormingIdeasInput): Promise<BrainstormingIdeasOutput> {
  return brainstormingIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'brainstormingIdeasPrompt',
  input: {schema: BrainstormingIdeasInputSchema},
  output: {schema: BrainstormingIdeasOutputSchema},
  prompt: `You are a brainstorming assistant. Analyze the following text content from sticky notes on a whiteboard and suggest related brainstorming ideas.

Sticky Notes Content: {{{stickyNotesContent}}}

Generate an array of brainstorming ideas that can help expand on these concepts. Each idea should be concise and actionable. Return the ideas as a JSON array of strings.`,
});

const brainstormingIdeasFlow = ai.defineFlow(
  {
    name: 'brainstormingIdeasFlow',
    inputSchema: BrainstormingIdeasInputSchema,
    outputSchema: BrainstormingIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
