import { useState } from 'react';
import { WHATSAPP_NUMBER } from '../../data/site';

// Same behaviour as the original handleApplyForm(): opens WhatsApp with the form details pre-filled.
export default function ApplyForm() {
  const [form, setForm] = useState({
    student_name: '',
    student_whatsapp: '',
    student_course: 'Madni Qaida',
    student_message: '',
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = `Assalam-o-Alaikum, I want to apply for a free trial.\n\n*Name:* ${form.student_name}\n*Phone:* ${form.student_whatsapp}\n*Course:* ${form.student_course}\n*Message:* ${form.student_message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <form id="applyForm" className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-xs text-gray-400 mb-1 font-semibold">Your Name *</label>
        <input
          type="text"
          id="student_name"
          value={form.student_name}
          onChange={handleChange}
          required
          className="w-full bg-black/50 border border-neutral-700 focus:border-gold-500 rounded-lg py-2 px-3 text-sm text-white outline-none transition-all"
          placeholder="Ahmed"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-semibold">WhatsApp Number *</label>
          <input
            type="tel"
            id="student_whatsapp"
            value={form.student_whatsapp}
            onChange={handleChange}
            required
            className="w-full bg-black/50 border border-neutral-700 focus:border-gold-500 rounded-lg py-2 px-3 text-sm text-white outline-none transition-all"
            placeholder="+123456789"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-semibold">Select Course</label>
          <select
            id="student_course"
            value={form.student_course}
            onChange={handleChange}
            className="w-full bg-black/50 border border-neutral-700 focus:border-gold-500 rounded-lg py-2 px-3 text-sm text-gray-300 outline-none transition-all"
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
          value={form.student_message}
          onChange={handleChange}
          rows="2"
          className="w-full bg-black/50 border border-neutral-700 focus:border-gold-500 rounded-lg py-2 px-3 text-sm text-white outline-none transition-all"
          placeholder="e.g., Prefers classes on weekends..."
        />
      </div>
      <button
        type="submit"
        className="w-full gold-gradient text-black font-bold py-2.5 rounded-lg text-sm transition-all transform hover:scale-[1.02] shadow-lg shadow-gold-500/20 flex items-center justify-center space-x-2"
      >
        <span>Submit Application</span>
        <i className="fa-solid fa-paper-plane" />
      </button>
    </form>
  );
}
