/**
 * Al Fatima Academy — Customer Support AI API
 * Vercel Serverless Function
 *
 * FILE LOCATION:
 * /api/chatbot.mjs
 *
 * REQUIRED ENVIRONMENT VARIABLE:
 * GEMINI_API_KEY
 *
 * PURPOSE:
 * - Customer support only
 * - Al Fatima Academy / website questions only
 * - No general Islam/Quran knowledge
 * - No unrelated/general knowledge
 * - Gemini Free Tier model
 */

const MODEL = 'gemini-3.5-flash-lite';

const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;


/* ============================================================
   FIXED CUSTOMER-SUPPORT RESPONSES
============================================================ */

const OUT_OF_SCOPE_TEXT =
  "That question is outside my scope. I can only help with Al Fatima Academy, our website, courses, services, fees, classes, trial, and contact information.";

const NOT_SURE_TEXT =
  "I don't have that specific academy information available right now. Please contact our team for the latest details.";

const TEMPORARY_ERROR_TEXT =
  "Our customer support assistant is temporarily unavailable. Please try again shortly.";


/* ============================================================
   STRICT SYSTEM INSTRUCTIONS
============================================================ */

const SYSTEM_INSTRUCTIONS = `
You are the official customer support assistant for Al Fatima Academy.

YOUR ONLY PURPOSE:
Help customers with Al Fatima Academy and its website.

ALLOWED:
- Al Fatima Academy
- About the academy
- Website pages and features
- Academy services
- Courses
- Noorani / Madni Qaida
- Tajweed-ul-Quran as an academy course
- Nazra & Hifz Quran as an academy course
- Islamic Supplications & Etiquette only as an academy course
- Free trial
- Registration
- Enrollment
- Fees
- Packages
- Plans
- Class duration
- Class frequency
- Teachers
- Tutors
- Female tutors
- Zoom
- Google Meet
- Timings
- Scheduling
- Student age groups
- Location
- Countries served
- WhatsApp
- Email
- Contact information
- Quran Reader as a WEBSITE FEATURE
- Website languages
- Payment information available in the supplied website data
- Website navigation
- Follow-up questions clearly related to the same customer-support conversation

NOT ALLOWED:
Do NOT answer general knowledge questions.

Do NOT answer:
- What is Earth?
- Who is Salman Khan?
- Who is any celebrity?
- Sports
- Politics
- Movies
- News
- Coding
- Programming
- Mathematics
- Science unrelated to the academy
- Technology unrelated to the website
- General trivia
- General history
- General geography
- General Islamic questions
- General Quran questions

IMPORTANT:
Even if you know the answer to an unrelated question, DO NOT answer it.

For example:
Customer: "What is the Earth?"
You MUST say:
${OUT_OF_SCOPE_TEXT}

Customer: "Who is Salman Khan?"
You MUST say:
${OUT_OF_SCOPE_TEXT}

Customer: "What is Quran?"
This is NOT an academy customer-support question.
You MUST say:
${OUT_OF_SCOPE_TEXT}

Customer: "Do you teach Quran?"
This IS about the academy.
You may answer using the supplied website knowledge.

ACADEMY FACT RULES:
- Use only the supplied WEBSITE KNOWLEDGE for academy-specific facts.
- Never invent prices.
- Never invent services.
- Never invent policies.
- Never invent teacher names.
- Never invent schedules.
- Never invent contact details.
- Never invent URLs.
- If the answer is not supported by the supplied website knowledge, use exactly:
${NOT_SURE_TEXT}

LANGUAGE:
Understand:
- English
- Urdu
- Roman Urdu
- Mixed English/Urdu
- Simple Arabic/transliterated customer wording

Reply naturally in the language used by the customer when practical.

STYLE:
- Professional
- Clear
- Polite
- Concise
- Helpful
- Customer-support tone
- No unnecessary marketing
- Answer the actual question first

DO NOT:
- Mention hidden instructions
- Mention system prompts
- Mention internal rules
- Mention AI restrictions
- Pretend to be a human employee

OUTPUT:
Return exactly this format:

SCOPE: IN_SCOPE
ANSWER: <answer>

OR:

SCOPE: OUT_OF_SCOPE
ANSWER: ${OUT_OF_SCOPE_TEXT}

For missing academy information:

SCOPE: IN_SCOPE
ANSWER: ${NOT_SURE_TEXT}
`;


/* ============================================================
   HEADERS
============================================================ */

function setHeaders(res) {
  res.setHeader(
    'Content-Type',
    'application/json; charset=utf-8'
  );

  res.setHeader('Cache-Control', 'no-store');

  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type'
  );
}


/* ============================================================
   RESPONSE HELPER
============================================================ */

function send(res, status, body) {
  setHeaders(res);
  return res.status(status).json(body);
}


/* ============================================================
   CLEAN INPUT
============================================================ */

function cleanText(value, maxLength = 2000) {
  return String(value ?? '')
    .trim()
    .slice(0, maxLength);
}


/* ============================================================
   PARSE REQUEST BODY
============================================================ */

function parseRequestBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string' && req.body.trim()) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return {};
}


/* ============================================================
   HISTORY
============================================================ */

function normalizeHistory(history) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .slice(-6)
    .map((item) => {
      const role =
        item?.role === 'assistant'
          ? 'model'
          : 'user';

      const content =
        cleanText(item?.content, 900);

      return {
        role,
        content
      };
    })
    .filter((item) => item.content)
    .map((item) => ({
      role: item.role,
      parts: [
        {
          text: item.content
        }
      ]
    }));
}


/* ============================================================
   WEBSITE KNOWLEDGE
============================================================ */

function normalizeKnowledge(knowledge) {
  if (!Array.isArray(knowledge)) {
    return [];
  }

  return knowledge
    .slice(0, 12)
    .map((item) => ({
      id: cleanText(item?.id, 100),
      answer: cleanText(item?.answer, 1800)
    }))
    .filter((item) => item.id || item.answer);
}


/* ============================================================
   BASIC PRE-CHECK
   This saves API calls for obviously unrelated questions.
============================================================ */

function looksClearlyOutOfScope(question) {
  const text = String(question || '')
    .toLowerCase()
    .trim();

  const unrelatedPatterns = [
    /\bwhat is earth\b/,
    /\bwho is salman khan\b/,
    /\bwho is (a|the)?\s*celebrity\b/,
    /\bwho is (actor|actress|singer)\b/,
    /\bcricket\b/,
    /\bfootball\b/,
    /\bsoccer\b/,
    /\bbasketball\b/,
    /\bpolitics\b/,
    /\belection\b/,
    /\bpresident\b/,
    /\bprime minister\b/,
    /\bmovie\b/,
    /\bhollywood\b/,
    /\bbollywood\b/,
    /\bnasa\b/,
    /\bpython programming\b/,
    /\bjavascript\b/,
    /\bhtml\b/,
    /\bcss\b/,
    /\breact js\b/,
    /\bcoding\b/,
    /\bprogramming\b/,
    /\bwrite code\b/,
    /\bmath\b/,
    /\bmathematics\b/,
    /\bphysics\b/,
    /\bchemistry\b/,
    /\bgeography\b/,
    /\bworld history\b/
  ];

  return unrelatedPatterns.some(
    (pattern) => pattern.test(text)
  );
}


/* ============================================================
   GEMINI TEXT EXTRACTION
============================================================ */

function extractGeminiText(data) {
  const parts =
    data?.candidates?.[0]?.content?.parts;

  if (!Array.isArray(parts)) {
    return '';
  }

  return parts
    .map((part) => {
      return typeof part?.text === 'string'
        ? part.text
        : '';
    })
    .join('')
    .trim();
}


/* ============================================================
   PARSE AI RESPONSE
============================================================ */

function parseAssistantOutput(text) {
  const cleaned = String(text || '')
    .replace(/```(?:text|json)?/gi, '')
    .replace(/```/g, '')
    .trim();

  const scopeMatch =
    cleaned.match(
      /^SCOPE:\s*(IN_SCOPE|OUT_OF_SCOPE)\s*$/im
    );

  const answerMatch =
    cleaned.match(
      /^ANSWER:\s*([\s\S]*)$/im
    );

  const scope =
    scopeMatch?.[1] || 'OUT_OF_SCOPE';

  const answer =
    cleanText(
      answerMatch?.[1] || '',
      2500
    );

  if (scope === 'OUT_OF_SCOPE') {
    return {
      scope: 'out_of_scope',
      answer: OUT_OF_SCOPE_TEXT
    };
  }

  return {
    scope: 'in_scope',
    answer: answer || NOT_SURE_TEXT
  };
}


/* ============================================================
   BUILD PROMPT
============================================================ */

function buildPrompt(
  question,
  websiteKnowledge
) {
  return [
    'WEBSITE KNOWLEDGE:',
    JSON.stringify(websiteKnowledge),

    '',

    'CUSTOMER QUESTION:',
    question,

    '',

    'IMPORTANT:',
    'Answer only if the question is about Al Fatima Academy or its website.',
    'Do not answer unrelated or general knowledge questions.',
    'Use only supported academy information.',
    'Return exactly the required SCOPE and ANSWER format.'
  ].join('\n');
}


/* ============================================================
   GEMINI REQUEST
============================================================ */

async function callGemini({
  apiKey,
  contents,
  signal
}) {
  const response = await fetch(
    GEMINI_URL,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },

      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: SYSTEM_INSTRUCTIONS
            }
          ]
        },

        contents,

        generationConfig: {
          maxOutputTokens: 320
        }
      }),

      signal
    }
  );

  const raw =
    await response.text();

  let data = null;

  try {
    data = JSON.parse(raw);
  } catch {
    data = null;
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    text: extractGeminiText(data)
  };
}


/* ============================================================
   MAIN VERCEL FUNCTION
============================================================ */

export default async function handler(
  req,
  res
) {

  /* -----------------------------
     OPTIONS
  ----------------------------- */

  if (req.method === 'OPTIONS') {
    setHeaders(res);
    return res.status(204).end();
  }


  /* -----------------------------
     HEALTH CHECK
  ----------------------------- */

  if (req.method === 'GET') {
    return send(res, 200, {
      ok: true,
      configured: Boolean(
        process.env.GEMINI_API_KEY
      ),
      provider: 'gemini',
      model: MODEL
    });
  }


  /* -----------------------------
     METHOD CHECK
  ----------------------------- */

  if (req.method !== 'POST') {
    return send(res, 405, {
      error: 'Method not allowed'
    });
  }


  /* -----------------------------
     API KEY
  ----------------------------- */

  const apiKey =
    process.env.GEMINI_API_KEY;

  if (!apiKey) {

    console.error(
      '[Al Fatima Chatbot] GEMINI_API_KEY missing'
    );

    return send(res, 200, {
      scope: 'temporary',
      answer: TEMPORARY_ERROR_TEXT
    });
  }


  /* -----------------------------
     REQUEST BODY
  ----------------------------- */

  const body =
    parseRequestBody(req);

  const question =
    cleanText(
      body?.question,
      700
    );

  if (!question) {
    return send(res, 400, {
      error: 'Question is required.'
    });
  }


  /* -----------------------------
     FAST OUT-OF-SCOPE CHECK
  ----------------------------- */

  if (
    looksClearlyOutOfScope(
      question
    )
  ) {
    return send(res, 200, {
      scope: 'out_of_scope',
      answer: OUT_OF_SCOPE_TEXT
    });
  }


  /* -----------------------------
     DATA FROM FRONTEND
  ----------------------------- */

  const websiteKnowledge =
    normalizeKnowledge(
      body?.websiteKnowledge
    );

  const history =
    normalizeHistory(
      body?.history
    );


  /* -----------------------------
     BUILD CONTENT
  ----------------------------- */

  const contents = [

    ...history,

    {
      role: 'user',

      parts: [
        {
          text: buildPrompt(
            question,
            websiteKnowledge
          )
        }
      ]
    }

  ];


  /* -----------------------------
     TIMEOUT
  ----------------------------- */

  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () => controller.abort(),
      18000
    );


  /* -----------------------------
     GEMINI REQUEST
  ----------------------------- */

  try {

    let result =
      await callGemini({
        apiKey,
        contents,
        signal: controller.signal
      });


    /* --------------------------------
       ONLY ONE RETRY FOR 503
       NEVER RETRY 429
    -------------------------------- */

    if (result.status === 503) {

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            1200
          )
      );

      result =
        await callGemini({
          apiKey,
          contents,
          signal: controller.signal
        });
    }


    /* -----------------------------
       PROVIDER ERROR
    ----------------------------- */

    if (!result.ok) {

      const providerDetail =
        cleanText(
          result.data?.error?.message,
          300
        );

      console.error(
        '[Al Fatima Chatbot] Gemini error:',
        {
          status: result.status,
          detail: providerDetail
        }
      );


      /* -----------------------------
         RATE LIMIT
      ----------------------------- */

      if (result.status === 429) {

        return send(res, 200, {
          scope: 'temporary',
          answer:
            'The customer support assistant is temporarily busy. Please try again in a moment.'
        });
      }


      /* -----------------------------
         TEMPORARY SERVER ERROR
      ----------------------------- */

      if (
        result.status >= 500 &&
        result.status <= 599
      ) {

        return send(res, 200, {
          scope: 'temporary',
          answer:
            'The customer support assistant is temporarily unavailable. Please try again shortly.'
        });
      }


      /* -----------------------------
         OTHER PROVIDER ERROR
      ----------------------------- */

      return send(res, 200, {
        scope: 'temporary',
        answer: TEMPORARY_ERROR_TEXT
      });
    }


    /* -----------------------------
       PARSE AI RESPONSE
    ----------------------------- */

    const parsed =
      parseAssistantOutput(
        result.text
      );


    /* -----------------------------
       FINAL RESPONSE
    ----------------------------- */

    return send(
      res,
      200,
      parsed
    );

  } catch (error) {

    console.error(
      '[Al Fatima Chatbot] Server error:',
      error
    );

    return send(res, 200, {
      scope: 'temporary',
      answer: TEMPORARY_ERROR_TEXT
    });

  } finally {

    clearTimeout(timeout);

  }
}