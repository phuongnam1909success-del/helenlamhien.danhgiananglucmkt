export interface AssessmentPayload {
  customer_thinking: number;
  execution: number;
  data_literacy: number;
  ai_literacy: number;
  learning_agility: number;
  total_score: number;
  level_title: string;
  user_agent: string;
}

const GAS_URL = import.meta.env.VITE_GAS_WEBAPP_URL as string | undefined;

export async function submitAssessmentToGAS(payload: AssessmentPayload): Promise<boolean> {
  if (!GAS_URL || GAS_URL.includes('YOUR_DEPLOYMENT_ID')) {
    return false;
  }

  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      redirect: 'follow',
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
