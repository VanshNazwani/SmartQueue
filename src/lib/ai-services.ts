import { WaitTimePrediction, AbandonmentPrediction, StaffRecommendation } from '@/types';

/**
 * AI Services for SmartQueue
 * Handles predictions, sentiment analysis, and recommendations
 */

export const aiServices = {
  /**
   * Predict wait time for a token
   */
  async predictWaitTime(
    queueSize: number,
    activeStaff: number,
    historicalAverage: number,
    isPeakHour: boolean
  ): Promise<WaitTimePrediction> {
    try {
      // Calculate predicted wait time based on factors
      let predictedTime = historicalAverage;

      // Queue size impact
      predictedTime += (queueSize * 2);

      // Staff availability impact
      if (activeStaff > 0) {
        const ratio = queueSize / activeStaff;
        predictedTime = Math.max(historicalAverage, ratio * historicalAverage * 0.8);
      }

      // Peak hour multiplier
      if (isPeakHour) {
        predictedTime *= 1.5;
      }

      // Calculate confidence (higher with more data points)
      const confidence = Math.min(95, 50 + (activeStaff * 5) + (Math.min(queueSize, 20) * 2));

      return {
        tokenId: '',
        estimatedWaitMinutes: Math.round(predictedTime),
        confidence: Math.round(confidence),
        factors: {
          historicalAverage,
          currentQueueLength: queueSize,
          activeStaffCount: activeStaff,
          peakHourFactor: isPeakHour ? 1.5 : 1,
        },
      };
    } catch (error) {
      console.error('Error predicting wait time:', error);
      throw error;
    }
  },

  /**
   * Predict customer abandonment risk
   */
  async predictAbandonmentRisk(
    tokenId: string,
    waitTime: number,
    priority: string,
    customerHistory: any
  ): Promise<AbandonmentPrediction> {
    try {
      let riskScore = 0;

      // Wait time impact (higher wait = higher risk)
      if (waitTime > 30) riskScore += 40;
      else if (waitTime > 20) riskScore += 25;
      else if (waitTime > 10) riskScore += 10;

      // Priority impact (lower priority = higher risk)
      if (priority === 'normal') riskScore += 20;
      else if (priority === 'senior' || priority === 'vip') riskScore -= 15;

      // Historical data impact
      if (customerHistory?.noShowRate > 0.3) riskScore += 25;
      if (customerHistory?.loyaltyDays > 365) riskScore -= 20;

      // Clamp to 0-100
      riskScore = Math.max(0, Math.min(100, riskScore));

      // Determine risk level
      let riskLevel = 'low';
      if (riskScore > 65) riskLevel = 'high';
      else if (riskScore > 35) riskLevel = 'medium';

      // Recommendation
      let recommendedAction = '';
      if (riskLevel === 'high') {
        recommendedAction = 'Send priority reminder and offer service at next slot';
      } else if (riskLevel === 'medium') {
        recommendedAction = 'Send friendly reminder notification';
      } else {
        recommendedAction = 'Standard notification';
      }

      return {
        tokenId,
        riskLevel: riskLevel as 'low' | 'medium' | 'high',
        probability: riskScore,
        recommendedAction,
      };
    } catch (error) {
      console.error('Error predicting abandonment:', error);
      throw error;
    }
  },

  /**
   * Get staff recommendations
   */
  async getStaffRecommendations(
    currentStaffCount: number,
    queueSize: number,
    totalCounters: number
  ): Promise<StaffRecommendation> {
    try {
      // Ideal ratio: 1 staff per 5-10 customers in queue
      const minStaffNeeded = Math.ceil(queueSize / 10);
      const optimalStaffCount = Math.ceil(queueSize / 7);

      // Utilization rate
      const utilizationRate = currentStaffCount > 0
        ? Math.round((queueSize / (currentStaffCount * 10)) * 100)
        : 0;

      const suggestions = [];

      if (currentStaffCount < minStaffNeeded) {
        suggestions.push(`Add ${minStaffNeeded - currentStaffCount} more staff member(s) to handle queue`);
      }

      if (utilizationRate > 90) {
        suggestions.push('Staff are overloaded. Recommend queuing next customer or adding staff.');
      }

      if (utilizationRate < 30 && currentStaffCount > 1) {
        suggestions.push(`Consider reducing staff. Current utilization is ${utilizationRate}%`);
      }

      if (queueSize === 0 && currentStaffCount > 1) {
        suggestions.push('Queue is empty. Consider reducing active counters.');
      }

      return {
        recommendedCount: optimalStaffCount,
        currentCount: currentStaffCount,
        utilizationRate,
        suggestions,
      };
    } catch (error) {
      console.error('Error getting staff recommendations:', error);
      throw error;
    }
  },

  /**
   * Analyze sentiment from feedback text
   */
  async analyzeSentiment(text: string): Promise<{
    sentiment: 'positive' | 'neutral' | 'negative';
    score: number;
  }> {
    try {
      // Simple sentiment analysis (would use Genkit/Gemini in production)
      const positiveWords = ['good', 'great', 'excellent', 'happy', 'satisfied', 'fast', 'helpful', 'nice', 'friendly'];
      const negativeWords = ['bad', 'poor', 'slow', 'wait', 'long', 'rude', 'unhappy', 'disappointed', 'worst'];

      const lowerText = text.toLowerCase();

      let positiveCount = 0;
      let negativeCount = 0;

      positiveWords.forEach(word => {
        if (lowerText.includes(word)) positiveCount++;
      });

      negativeWords.forEach(word => {
        if (lowerText.includes(word)) negativeCount++;
      });

      let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
      let score = 0.5;

      if (positiveCount > negativeCount) {
        sentiment = 'positive';
        score = Math.min(1, 0.5 + (positiveCount * 0.15));
      } else if (negativeCount > positiveCount) {
        sentiment = 'negative';
        score = Math.max(0, 0.5 - (negativeCount * 0.15));
      }

      return {
        sentiment,
        score: Math.round(score * 100) / 100,
      };
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      throw error;
    }
  },

  /**
   * Get optimization suggestions
   */
  async getOptimizationSuggestions(metrics: {
    avgWaitTime: number;
    noShowRate: number;
    satisfactionScore: number;
    staffUtilization: number;
  }): Promise<string[]> {
    const suggestions = [];

    if (metrics.avgWaitTime > 20) {
      suggestions.push('Consider adding more service counters or staff to reduce wait time.');
    }

    if (metrics.noShowRate > 0.1) {
      suggestions.push('High no-show rate. Try implementing reminder notifications or reservation deposits.');
    }

    if (metrics.satisfactionScore < 4) {
      suggestions.push('Customer satisfaction is low. Review service quality and staff training.');
    }

    if (metrics.staffUtilization > 85) {
      suggestions.push('Staff are working at high capacity. Consider hiring more staff or optimizing processes.');
    } else if (metrics.staffUtilization < 40) {
      suggestions.push('Staff utilization is low. Consider reallocating resources or reducing staff.');
    }

    return suggestions;
  },
};
