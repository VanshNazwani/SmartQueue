'use server';

import {
  generateTokenMessage,
  type GenerateTokenMessageInput,
} from '@/ai/flows/generate-token-message';
import {
  summarizeQueueData,
  type SummarizeQueueDataInput,
} from '@/ai/flows/summarize-queue-data';

export async function generateNotificationAction(
  input: GenerateTokenMessageInput
) {
  try {
    const result = await generateTokenMessage(input);
    return result;
  } catch (error) {
    console.error('Error in generateNotificationAction:', error);
    return { message: 'Error generating notification.' };
  }
}

export async function summarizeQueueAction(input: SummarizeQueueDataInput) {
  try {
    const result = await summarizeQueueData(input);
    return result;
  } catch (error)
    console.error('Error in summarizeQueueAction:', error);
    return { summary: 'Error generating summary.' };
  }
}
