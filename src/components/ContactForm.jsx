import { useState } from 'react';
import { WHATSAPP_NUMBER } from '../data/site';

export default function ContactForm() {
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setResult('Submitting your message...');

    const form = event.target;
    const formData = new FormData(form);
    formData.append('access_key', '46b8b557-3f32-4105-97a7-12365d847048');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setResult('Success! Jazakallah Khair. Your message has been received. Our team will get back to you shortly.');
        form.reset();
      } else {
        setStatus('error');
        setResult(data.message || 'Error sending message. Please try again or contact us via WhatsApp.');
      }
    } catch (err) {
      setStatus('error');
      setResult('Connection error. Please try again or message us directly on WhatsApp.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
            <i className="fa-solid fa-user text-gold-400 text-[11px]" />
            <span>Full Name <span className="text-gold-400">*</span></span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Ahmed Ali"
            disabled={status === 'loading'}
            className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 text-sm text-white rounded-xl p-3 outline-none transition-all placeholder:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
            <i className="fa-solid fa-envelope text-gold-400 text-[11px]" />
            <span>Email Address <span className="text-gold-400">*</span></span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="e.g. ahmed@gmail.com"
            disabled={status === 'loading'}
            className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 text-sm text-white rounded-xl p-3 outline-none transition-all placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Phone / WhatsApp and Course */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
            <i className="fa-brands fa-whatsapp text-green-400 text-[12px]" />
            <span>WhatsApp / Phone</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+92 300 1234567"
            disabled={status === 'loading'}
            className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 text-sm text-white rounded-xl p-3 outline-none transition-all placeholder:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
            <i className="fa-solid fa-book-quran text-gold-400 text-[11px]" />
            <span>Course of Interest</span>
          </label>
          <select
            name="course"
            disabled={status === 'loading'}
            className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 text-sm text-gray-200 rounded-xl p-3 outline-none transition-all"
          >
            <option value="Noorani / Madni Qaida">Noorani / Madni Qaida Course</option>
            <option value="Tajweed-ul-Quran Rules">Tajweed-ul-Quran Rules</option>
            <option value="Nazra Quran with Tajweed">Nazra Quran with Tajweed</option>
            <option value="Quran Memorization (Hifz)">Quran Memorization (Hifz)</option>
            <option value="Hadith, Daily Duas & Salah">Hadith, Daily Duas & Salah</option>
            <option value="Tarjuma & Tafseer">Tarjuma & Tafseer</option>
            <option value="General Inquiry">General Academy Inquiry</option>
          </select>
        </div>
      </div>

      {/* Message textarea */}
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
          <i className="fa-solid fa-comment-dots text-gold-400 text-[11px]" />
          <span>Your Message / Requirements <span className="text-gold-400">*</span></span>
        </label>
        <textarea
          name="message"
          rows="4"
          required
          placeholder="Tell us about the student's age, language preference (English/Urdu), or preferred class timings..."
          disabled={status === 'loading'}
          className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 text-sm text-white rounded-xl p-3 outline-none transition-all resize-none placeholder:text-gray-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black font-bold text-sm tracking-wide shadow-lg shadow-gold-500/20 hover:opacity-95 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <i className="fa-solid fa-circle-notch fa-spin text-black" />
            <span>Submitting Message...</span>
          </>
        ) : (
          <>
            <i className="fa-solid fa-paper-plane" />
            <span>Submit Message</span>
          </>
        )}
      </button>

      {/* Result Status Message */}
      {result && (
        <div
          role="status"
          aria-live="polite"
          className={`p-4 rounded-xl text-sm flex items-start gap-3 border transition-all ${
            status === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : status === 'error'
              ? 'bg-red-950/40 border-red-500/40 text-red-200'
              : 'bg-gold-500/10 border-gold-500/30 text-gold-300'
          }`}
        >
          <div className="mt-0.5 shrink-0 text-base">
            {status === 'success' && <i className="fa-solid fa-circle-check text-emerald-400" />}
            {status === 'error' && <i className="fa-solid fa-triangle-exclamation text-red-400" />}
            {status === 'loading' && <i className="fa-solid fa-spinner fa-spin text-gold-400" />}
          </div>
          <div className="flex-1">
            <p className="font-medium">{result}</p>
            {status === 'error' && (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Assalam-o-Alaikum, I tried submitting the contact form on your website but encountered an issue. Can you please assist me?'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 underline font-semibold mt-2"
              >
                <i className="fa-brands fa-whatsapp text-green-400" />
                <span>Message us on WhatsApp instead</span>
              </a>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
