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
    .describe('A JSON string representing the current queue data, including token numbers, statuses, and estimated wait times.'),
});
export type SummarizeQueueDataInput = z.infer<typeof SummarizeQueueDataInputSchema>;

const SummarizeQueueDataOutputSchema = z.object({
  summary: z.string().describe('A concise, insightful summary of the current queue status for an admin.'),
});
export type SummarizeQueueDataOutput = z.infer<typeof SummarizeQueueDataOutputSchema>;

export async function summarizeQueueData(input: SummarizeQueueDataInput): Promise<SummarizeQueueDataOutput> {
  return summarizeQueueDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeQueueDataPrompt',
  input: {schema: SummarizeQueueDataInputSchema},
  output: {schema: SummarizeQueueDataOutputSchema},
  prompt: `You are an AI assistant for a queue management system. Analyze the following queue data and provide a brief, actionable summary for an administrator. Highlight key metrics like the number of people waiting and any potential bottlenecks or trends.

  Queue Data:
  \`\`\`json
  {{{queueData}}}
  \`\`\`
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
