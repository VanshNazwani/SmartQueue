'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized token call notifications.
 *
 * - generateTokenMessage - A function that generates a personalized notification message for a user when their token is about to be called.
 * - GenerateTokenMessageInput - The input type for the generateTokenMessage function.
 * - GenerateTokenMessageOutput - The return type for the generateTokenMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTokenMessageInputSchema = z.object({
  tokenNumber: z.string().describe('The token number of the user.'),
  estimatedWaitTime: z.string().describe('The estimated wait time for the user.'),
});
export type GenerateTokenMessageInput = z.infer<typeof GenerateTokenMessageInputSchema>;

const GenerateTokenMessageOutputSchema = z.object({
  message: z.string().describe('The personalized notification message.'),
});
export type GenerateTokenMessageOutput = z.infer<typeof GenerateTokenMessageOutputSchema>;

export async function generateTokenMessage(input: GenerateTokenMessageInput): Promise<GenerateTokenMessageOutput> {
  return generateTokenMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTokenMessagePrompt',
  input: {schema: GenerateTokenMessageInputSchema},
  output: {schema: GenerateTokenMessageOutputSchema},
  prompt: `You are a notification system for a queue. Generate a friendly, concise, and professional message for the user whose token is next. Let them know it's almost their turn.
  
  Example: "Your turn is next! Please get ready. Token: {{{tokenNumber}}}. Estimated wait: {{{estimatedWaitTime}}}."
  
  Token Number: {{{tokenNumber}}}
  Estimated Wait Time: {{{estimatedWaitTime}}}
  
  Message:`,
});

const generateTokenMessageFlow = ai.defineFlow(
  {
    name: 'generateTokenMessageFlow',
    inputSchema: GenerateTokenMessageInputSchema,
    outputSchema: GenerateTokenMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
