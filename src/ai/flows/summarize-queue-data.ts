'use server';

/**
 * @fileOverview Summarizes the current queue status for admins.
 *
 * - summarizeQueueData - A function that provides a summary of the queue data.
 * - SummarizeQueueDataInput - The input type for the summarizeQueueData function.
 * - SummarizeQueueDataOutput - The return type for the summarizeQueueData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeQueueDataInputSchema = z.object({
  queueData: z
    .string()
    .describe('The current queue data, including token numbers, wait times, and other relevant information.'),
});
export type SummarizeQueueDataInput = z.infer<typeof SummarizeQueueDataInputSchema>;

const SummarizeQueueDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the current queue status.'),
});
export type SummarizeQueueDataOutput = z.infer<typeof SummarizeQueueDataOutputSchema>;

export async function summarizeQueueData(input: SummarizeQueueDataInput): Promise<SummarizeQueueDataOutput> {
  return summarizeQueueDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeQueueDataPrompt',
  input: {schema: SummarizeQueueDataInputSchema},
  output: {schema: SummarizeQueueDataOutputSchema},
  prompt: `You are an AI assistant helping an admin understand the current queue status.

  Provide a concise summary of the queue data provided below:

  Queue Data: {{{queueData}}}
  `,
});

const summarizeQueueDataFlow = ai.defineFlow(
  {
    name: 'summarizeQueueDataFlow',
    inputSchema: SummarizeQueueDataInputSchema,
    outputSchema: SummarizeQueueDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
