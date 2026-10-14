import { WHATSAPP_NUMBER } from '../../data/site';

// NOTE: the original services.html hid this section with JavaScript on page load,
// so it was never visible. It is kept here (unused) in case you want it back.
export default function RegistrationForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const f = event.currentTarget.elements;
    const name = f.regName.value;
    const phone = f.regPhone.value;
    const course = f.regCourse.value;
    const timezone = f.regTimezone.value;
    const message = f.regMessage.value || 'No special instructions.';

    const waText =
      `Assalamu Alaikum,\n\nI want to register for a 3-Day Free Trial class at Al Fatima Academy.\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *WhatsApp:* ${phone}\n` +
      `📚 *Course:* ${course}\n` +
      `🌍 *Country/Timezone:* ${timezone}\n` +
      `📝 *Message:* ${message}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <section id="registration-section" className="py-16 bg-neutral-900 border-t border-gold-500/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Header */}
        <div className="text-center mb-10">
          <span className="text-gold-500 font-semibold tracking-widest text-xs uppercase">
            Start Your Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-white">Book 3 Days Free Trial</h2>
          <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto">
            No credit card required. Fill out this quick form and our administrator will contact you
            within 24 hours to schedule your free classes.
          </p>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
        </div>
        {/* Registration Form Container */}
        <div className="bg-neutral-950/60 border border-gold-500/20 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl">
          <form id="registrationForm" className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gold-400 mb-2">Student or Parent Name *</label>
                <input
                  type="text"
                  id="regName"
                  required
                  placeholder="e.g., Ali Hamza"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-gray-100 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300"
                />
              </div>
              {/* WhatsApp Number */}
              <div>
                <label className="block text-sm font-medium text-gold-400 mb-2">WhatsApp Number *</label>
                <input
                  type="tel"
                  id="regPhone"
                  required
                  placeholder="e.g., +92 300 1234567"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-gray-100 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Choose Course */}
              <div>
                <label className="block text-sm font-medium text-gold-400 mb-2">Select Course *</label>
                <select
                  id="regCourse"
                  defaultValue=""
                  required
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-gray-300 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300"
                >
                  <option value="" disabled>Choose your desired course</option>
                  <option value="Noorani Qaida">Madni Qaida</option>
                  <option value="Tajweed-ul-Quran">Tajweed-ul-Quran Course</option>
                  <option value="Nazra & Hifz Quran">Nazra Quran Course</option>
                  <option value="Islamic Supplications & Etiquette">Basic Islam/Nimaz & Hadis</option>
                </select>
              </div>
              {/* Preferred Timezone / Country */}
              <div>
                <label className="block text-sm font-medium text-gold-400 mb-2">Your Country / Timezone *</label>
                <input
                  type="text"
                  id="regTimezone"
                  required
                  placeholder="e.g., London, UK (BST)"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-gray-100 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300"
                />
              </div>
            </div>
            {/* Custom Message/Note */}
            <div>
              <label className="block text-sm font-medium text-gold-400 mb-2">
                Any Special Instructions or Preferred Timings (Optional)
              </label>
              <textarea
                id="regMessage"
                rows="4"
                placeholder="Describe any preferred class timing, age of student, or specific requests..."
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-gray-100 rounded-xl p-4 text-sm outline-none transition-all duration-300 resize-none"
              />
            </div>
            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gold-500 hover:bg-gold-600 text-neutral-950 font-bold py-3.5 px-6 rounded-xl tracking-wide text-sm transition-all duration-300 shadow-lg shadow-gold-500/10"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
