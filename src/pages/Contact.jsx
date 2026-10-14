import usePageMeta from '../hooks/usePageMeta';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  usePageMeta('Contact Us - Al Fatima Academy');

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section
        className="py-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-neutral-950 text-center border-b border-gold-500/10"
      >
        <div className="max-w-4xl mx-auto px-4">
          <span
            className="inline-block px-3 py-1 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-400 text-[10px] font-semibold tracking-widest uppercase mb-3"
          >
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient mb-4">
            Contact Our Academy
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Have questions regarding registration, custom schedules, or fee structures? Drop us a
            message below or contact our support team instantly over WhatsApp.
          </p>
        </div>
      </section>
      {/* ================= CONTACT LAYOUT SECTION ================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1 & 2: Contact Form */}
          <div
            className="lg:col-span-2 bg-neutral-900/40 border border-gold-500/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-6"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-gold-400 mb-1">Send Us A Message</h2>
              <p className="text-xs text-gray-400">
                Fill out the details below and our academy team will respond to your email promptly.
              </p>
            </div>
            <ContactForm />
          </div>
          {/* Column 3: Contact details & Info */}
          <div className="space-y-6">
            {/* Box 1: Quick Access Info */}
            <div className="bg-neutral-900/60 border border-gold-500/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl space-y-4">
              <h3 className="text-lg font-serif font-bold text-white">Academy Information</h3>
              <div className="flex items-start space-x-3 text-xs">
                <div className="text-gold-500 mt-0.5">
                  <i className="fa-solid fa-envelope text-base" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-300">Email Address</h4>
                  <p className="text-gray-400">info@alquraninternational.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-xs">
                <div className="text-gold-500 mt-0.5">
                  <i className="fa-solid fa-phone text-base" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-300">Direct Support Hotline</h4>
                  <a href="tel:+923075329240" className="text-gold-400 hover:underline">+92 307 4277240</a>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-xs">
                <div className="text-gold-500 mt-0.5">
                  <i className="fa-solid fa-location-dot text-base" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-300">Head Office Location</h4>
                  <p className="text-gray-400">Lahore, Punjab, Pakistan (Operating globally online)</p>
                </div>
              </div>
            </div>
            {/* Box 2: Working Hours Details */}
            <div
              className="bg-neutral-900/60 border border-gold-500/10 p-6 rounded-3xl text-center space-y-2"
            >
              <div className="text-gold-500 text-xl">
                <i className="fa-solid fa-clock" />
              </div>
              <h4 className="text-sm font-bold text-white">24 Hours Service Operation</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Since our students reside across different countries (UK, USA, Canada, UAE, etc.),
                our professional tutors are available 24/7 to adjust to your custom timezone
                seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ================= FOOTER (Dynamic Component) ================= */}
    </>
  );
}
