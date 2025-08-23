'use server';

/**
 * @fileOverview Summarizes whiteboard content into concise bullet points.
 *
 * - summarizeWhiteboardContent - A function that handles the content summarization process.
 * - SummarizeWhiteboardContentInput - The input type for the summarizeWhiteboardContent function.
 * - SummarizeWhiteboardContentOutput - The return type for the summarizeWhiteboardContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeWhiteboardContentInputSchema = z.object({
  whiteboardContent: z
    .string()
    .describe('The content of the whiteboard to be summarized.'),
});
export type SummarizeWhiteboardContentInput = z.infer<
  typeof SummarizeWhiteboardContentInputSchema
>;

const SummarizeWhiteboardContentOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise bullet-point summary of the whiteboard content.'),
});
export type SummarizeWhiteboardContentOutput = z.infer<
  typeof SummarizeWhiteboardContentOutputSchema
>;

export async function summarizeWhiteboardContent(
  input: SummarizeWhiteboardContentInput
): Promise<SummarizeWhiteboardContentOutput> {
  return summarizeWhiteboardContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeWhiteboardContentPrompt',
  input: {schema: SummarizeWhiteboardContentInputSchema},
  output: {schema: SummarizeWhiteboardContentOutputSchema},
  prompt: `You are an expert summarizer, skilled at condensing information into concise bullet points.

  Please summarize the following whiteboard content into bullet points:

  {{{whiteboardContent}}}

  Summary:`,
});

const summarizeWhiteboardContentFlow = ai.defineFlow(
  {
    name: 'summarizeWhiteboardContentFlow',
    inputSchema: SummarizeWhiteboardContentInputSchema,
    outputSchema: SummarizeWhiteboardContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
