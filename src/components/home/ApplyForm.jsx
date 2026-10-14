import { useState } from 'react';

export default function ApplyForm() {
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [form, setForm] = useState({
    student_name: '',
    student_email: '',
    student_whatsapp: '',
    student_course: 'Madni Qaida',
    student_message: '',
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setResult('Submitting your application...');

    const formData = new FormData();
    formData.append('access_key', '46b8b557-3f32-4105-97a7-12365d847048');
    formData.append('subject', `New 3-Day Free Trial Application: ${form.student_course} - ${form.student_name}`);
    formData.append('from_name', 'Al Fatima Academy Free Trial');
    formData.append('name', form.student_name);
    formData.append('email', form.student_email);
    formData.append('phone', form.student_whatsapp);
    formData.append('course', form.student_course);
    formData.append('message', form.student_message || 'No special requirements provided.');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setResult('Success! Jazakallah Khair. Your application has been received. Our representative will contact you within 24 hours.');
        setForm({
          student_name: '',
          student_email: '',
          student_whatsapp: '',
          student_course: 'Madni Qaida',
          student_message: '',
        });
      } else {
        setStatus('error');
        setResult(data.message || 'Error submitting application. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setResult('Connection error. Please check your internet connection and try again.');
    }
  };

  return (
    <form id="applyForm" className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-semibold">Your Name *</label>
          <input
            type="text"
            id="student_name"
            name="name"
            value={form.student_name}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full bg-black/50 border border-neutral-700 focus:border-gold-500 rounded-lg py-2 px-3 text-sm text-white outline-none transition-all disabled:opacity-50"
            placeholder="Ahmed"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-semibold">Email / Gmail Address *</label>
          <input
            type="email"
            id="student_email"
            name="email"
            value={form.student_email}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full bg-black/50 border border-neutral-700 focus:border-gold-500 rounded-lg py-2 px-3 text-sm text-white outline-none transition-all disabled:opacity-50"
            placeholder="ahmed@gmail.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-semibold">WhatsApp Number *</label>
          <input
            type="tel"
            id="student_whatsapp"
            name="phone"
            value={form.student_whatsapp}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full bg-black/50 border border-neutral-700 focus:border-gold-500 rounded-lg py-2 px-3 text-sm text-white outline-none transition-all disabled:opacity-50"
            placeholder="+123456789"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-semibold">Select Course</label>
          <select
            id="student_course"
            name="course"
            value={form.student_course}
            onChange={handleChange}
            disabled={status === 'loading'}
            className="w-full bg-black/50 border border-neutral-700 focus:border-gold-500 rounded-lg py-2 px-3 text-sm text-gray-300 outline-none transition-all disabled:opacity-50"
          >
            <option value="Madni Qaida">Madni Qaida</option>
            <option value="Tajweed-ul-Quran">Tajweed Course</option>
            <option value="Quran Nazra">Nazra Quran</option>
            <option value="Basic Islamic/Dua">Basic Islam/Duas</option>
            <option value="Nimaz">Nimaz</option>
            <option value="Hadis">Hadis</option>
            <option value="Tarjuma Quran">Tarjuma Quran</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1 font-semibold">Message / Preferred Class Timing</label>
        <textarea
          id="student_message"
          name="message"
          value={form.student_message}
          onChange={handleChange}
          rows="2"
          disabled={status === 'loading'}
          className="w-full bg-black/50 border border-neutral-700 focus:border-gold-500 rounded-lg py-2 px-3 text-sm text-white outline-none transition-all disabled:opacity-50 resize-none"
          placeholder="e.g., Prefers classes on weekends..."
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full gold-gradient text-black font-bold py-2.5 rounded-lg text-sm transition-all transform hover:scale-[1.02] active:scale-[0.99] shadow-lg shadow-gold-500/20 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <i className="fa-solid fa-circle-notch fa-spin text-black" />
            <span>Submitting Application...</span>
          </>
        ) : (
          <>
            <span>Submit Application</span>
            <i className="fa-solid fa-paper-plane" />
          </>
        )}
      </button>

      {/* Result feedback */}
      {result && (
        <div
          role="status"
          aria-live="polite"
          className={`p-3 rounded-lg text-xs flex items-start gap-2.5 border transition-all ${
            status === 'success'
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
              : status === 'error'
              ? 'bg-red-950/60 border-red-500/40 text-red-200'
              : 'bg-gold-500/10 border-gold-500/30 text-gold-300'
          }`}
        >
          <div className="mt-0.5 shrink-0 text-sm">
            {status === 'success' && <i className="fa-solid fa-circle-check text-emerald-400" />}
            {status === 'error' && <i className="fa-solid fa-triangle-exclamation text-red-400" />}
            {status === 'loading' && <i className="fa-solid fa-spinner fa-spin text-gold-400" />}
          </div>
          <div className="flex-1 font-medium leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </form>
  );
}
