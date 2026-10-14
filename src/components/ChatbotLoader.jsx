import { useEffect } from 'react';

// The support chatbot is a self-contained script (public/chatbot-widget.js) that injects its own
// UI. It is loaded once for the whole site, exactly like the old components-loader.js did.
export default function ChatbotLoader() {
  useEffect(() => {
    if (document.getElementById('afa-chatbot-script')) return;
    const script = document.createElement('script');
    script.id = 'afa-chatbot-script';
    script.src = '/chatbot-widget.js';
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
