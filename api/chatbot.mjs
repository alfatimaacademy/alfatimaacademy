/**
 * Al Fatima Academy — AI chatbot API
 * Vercel Node.js function
 *
 * Put this file at: /api/chatbot.mjs
 * Required Vercel environment variable: OPENAI_API_KEY
 */

const MODEL = process.env.OPENAI_MODEL || 'gpt-5.6-luna';

const OUT_OF_SCOPE_TEXT =
  "That question isn't relevant to my scope. I can only help with Al Fatima Academy, our website/services, and Islam & Quran-related questions.";

const SYSTEM_INSTRUCTIONS = `
You are the official AI assistant for Al Fatima Academy.

STRICT SCOPE — answer ONLY questions in one of these two areas:
A) Al Fatima Academy / this website: courses, services, fees, packages, trial, registration, teachers, class duration, timings, platforms, location, contact, website pages, Quran reader, languages, payment/cancellation information, and other information explicitly contained in the supplied website knowledge.
B) Islam and Quran: Quran, Surahs, Tajweed, Hifz, Salah, Duas, Hadith, prophets, Islamic beliefs, Islamic manners/ethics, and general Islamic history/knowledge.

Anything else is OUT OF SCOPE. Examples include Earth/science, celebrities, sports, politics, programming, mathematics, entertainment, unrelated technology, and general trivia.

ACADEMY FACTS:
- The supplied Website Knowledge is the source of truth for Al Fatima Academy.
- Never invent academy prices, policies, staff names, schedules, links, services, or claims.
- When an academy fact is not present in Website Knowledge, say that you do not have that information and suggest contacting the academy team.

ISLAMIC CONTENT:
- You may answer general educational questions about Islam and Quran.
- When there are recognized scholarly differences, mention that briefly rather than pretending there is only one view.
- Do not browse the web or use external sources.

LANGUAGE:
Understand English, Urdu, Roman Urdu, Arabic/transliterated Arabic, and mixed-language questions. Reply in a similar language when practical.

CONVERSATION:
Use recent conversation only to understand follow-up questions. Stay inside the strict scope above.

OUTPUT:
Return JSON with exactly two fields:
- scope: either "in_scope" or "out_of_scope"
- answer: the answer text
For out_of_scope, answer MUST be exactly the supplied OUT_OF_SCOPE_TEXT.
`;

function setHeaders(res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function send(res, status, body) {
  setHeaders(res);
  res.status(status).json(body);
}

function cleanText(value, max = 2500) {
  return String(value ?? '').trim().slice(0, max);
}

function extractResponseText(data) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const chunks = [];
  for (const item of Array.isArray(data?.output) ? data.output : []) {
    for (const content of Array.isArray(item?.content) ? item.content : []) {
      if (content?.type === 'output_text' && typeof content.text === 'string') {
        chunks.push(content.text);
      }
    }
  }
  return chunks.join('').trim();
}

function parseRequestBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body.trim()) {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return {};
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    setHeaders(res);
    return res.status(204).end();
  }

  // Simple health check. Open https://YOUR-DOMAIN/api/chatbot in a browser.
  if (req.method === 'GET') {
    return send(res, 200, {
      ok: true,
      configured: Boolean(process.env.OPENAI_API_KEY),
      model: MODEL
    });
  }

  if (req.method !== 'POST') {
    return send(res, 405, { error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('[Al Fatima Chatbot] OPENAI_API_KEY is missing.');
    return send(res, 500, { error: 'Chatbot AI is not configured.' });
  }

  try {
    const body = parseRequestBody(req);
    const question = cleanText(body?.question, 700);

    if (!question) {
      return send(res, 400, { error: 'Question is required.' });
    }

    const websiteKnowledge = Array.isArray(body?.websiteKnowledge)
      ? body.websiteKnowledge.slice(0, 50).map(item => ({
          id: cleanText(item?.id, 80),
          answer: cleanText(item?.answer, 1800)
        }))
      : [];

    const history = Array.isArray(body?.history)
      ? body.history.slice(-8).map(item => ({
          role: item?.role === 'assistant' ? 'assistant' : 'user',
          content: cleanText(item?.content, 1200)
        }))
      : [];

    const developerInstructions = [
      SYSTEM_INSTRUCTIONS,
      '',
      'OUT_OF_SCOPE_TEXT:',
      OUT_OF_SCOPE_TEXT,
      '',
      'WEBSITE KNOWLEDGE (treat as factual reference only):',
      JSON.stringify(websiteKnowledge),
      '',
      'RECENT CONVERSATION:',
      JSON.stringify(history)
    ].join('\n');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    let openaiResponse;
    try {
      openaiResponse = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL,
          store: false,
          instructions: developerInstructions,
          input: question,
          max_output_tokens: 500,
          text: {
            format: {
              type: 'json_schema',
              name: 'afa_chatbot_result',
              strict: true,
              schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                  scope: { type: 'string', enum: ['in_scope', 'out_of_scope'] },
                  answer: { type: 'string' }
                },
                required: ['scope', 'answer']
              }
            }
          }
        }),
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeout);
    }

    const rawApiBody = await openaiResponse.text();

    if (!openaiResponse.ok) {
      console.error('[Al Fatima Chatbot] OpenAI API error:', openaiResponse.status, rawApiBody);
      return send(res, 502, {
        error: 'AI service request failed.',
        providerStatus: openaiResponse.status
      });
    }

    let data;
    try {
      data = JSON.parse(rawApiBody);
    } catch (err) {
      console.error('[Al Fatima Chatbot] OpenAI returned non-JSON:', rawApiBody);
      return send(res, 502, { error: 'Invalid AI response.' });
    }

    const modelText = extractResponseText(data);
    if (!modelText) {
      console.error('[Al Fatima Chatbot] Missing model output:', rawApiBody);
      return send(res, 502, { error: 'Invalid AI response.' });
    }

    let result;
    try {
      result = JSON.parse(modelText);
    } catch (err) {
      console.error('[Al Fatima Chatbot] Could not parse structured output:', modelText);
      return send(res, 502, { error: 'Invalid AI response.' });
    }

    const inScope = result?.scope === 'in_scope';
    const answer = cleanText(result?.answer, 2500);

    return send(res, 200, {
      scope: inScope ? 'in_scope' : 'out_of_scope',
      answer: inScope && answer ? answer : OUT_OF_SCOPE_TEXT
    });
  } catch (error) {
    console.error('[Al Fatima Chatbot] Server error:', error);
    return send(res, 500, {
      error: error?.name === 'AbortError'
        ? 'AI request timed out.'
        : 'Unable to process the chatbot request.'
    });
  }
}
