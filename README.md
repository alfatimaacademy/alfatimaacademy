# Al Fatima Academy – React (Vite) version

HTML site converted to React. Same design (Tailwind classes untouched), now with components and React Router.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview
```

`/api/chatbot` (Gemini) is a Vercel function – `npm run dev` does not run it. Use `npx vercel dev`
to test it locally, or just deploy. Env vars: see `.env.example` and `CHATBOT-SETUP.txt`.

## Deploy (Vercel)

Import the repo; framework = Vite (already set in `vercel.json`). Add `GEMINI_API_KEY` in
Project Settings -> Environment Variables.

## Structure

```
api/chatbot.mjs            Vercel serverless function (stays in project root)
public/                    served as-is: robots.txt, sitemap.xml, chatbot-widget.js, images/
src/pages/                 Home, About, Services, Packages, Quran, Contact, NotFound
src/components/            Header, Footer, Layout, LanguageSwitcher, QuranReader, ...
src/data/ src/services/    pricing + Quran API code
vercel.json                SPA rewrites, legacy .html redirects, cache headers
```

Before going live replace `YOUR-DOMAIN.com` in `public/robots.txt` and `public/sitemap.xml`.
