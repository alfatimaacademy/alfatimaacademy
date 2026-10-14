import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import ApplyForm from '../components/home/ApplyForm';

export default function Home() {
  usePageMeta('Al Fatima Academy - A Project of Al Quran International');

  return (
    <>
      {/* ================= HERO SECTION (WITH APPLY FORM) ================= */}
      <section
        id="home"
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(10, 10, 10, 0.92), rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.95)), url('/images/them-1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Agar aap background mein overlapping double theme layers chahte hain ya grid effect: */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: "url('/images/them-2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Animated Left Side Text */}
            <div className="lg:col-span-7 space-y-6 animated-hero">
              <span
                className="inline-block px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-semibold tracking-wider uppercase"
              >
                Start Your Quran Journey Today
              </span>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-100 leading-tight"
              >
                Learn Quran Online
                <br />
                With
                {' '}
                <span className="text-gold-gradient">Tajweed Rules</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
                Connect with qualified and certified Quran tutors from the comfort of your home. We
                offer personalized one-on-one sessions for children and adults of all ages, tailored
                to your flexible timing.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <i className="fa-solid fa-circle-check text-gold-500" />
                  <span>1-on-1 Classes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <i className="fa-solid fa-circle-check text-gold-500" />
                  <span>Male & Female Tutors</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <i className="fa-solid fa-circle-check text-gold-500" />
                  <span>Flexible Timings</span>
                </div>
              </div>
            </div>
            {/* Right Side: Apply Form */}
            <div className="lg:col-span-5">
              <div
                className="bg-neutral-900/80 border border-gold-500/20 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-md relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl" />
                <h3 className="text-xl font-bold text-gold-400 mb-2 font-serif">Apply for 3 Days Free Trial</h3>
                <p className="text-gray-400 text-xs mb-6">
                  Fill the form and our representative will contact you within 24 hours.
                </p>
                <ApplyForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="py-16 bg-neutral-950 border-b border-gold-500/10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-gold-gradient mb-4">Who We Are</h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
            Welcome to
            {' '}
            <strong className="text-gold-400">Al Fatima Academy</strong>
            {' '}
            (A project of Al Quran International). We are a leading global Islamic learning platform
            offering premium digital Quran studies and Tajweed courses. Our mission is to make
            learning the Quran accessible, correct, and interactive for Muslims worldwide, using the
            latest classroom technology.
          </p>
        </div>
      </section>
      {/* ================= PREMIUM SERVICES GRID SECTION ================= */}
      <section className="py-16 bg-neutral-950 text-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold tracking-widest text-xs uppercase">
              Our Premium Programs
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-white">Our Quranic Courses</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
          </div>
          {/* Services Grid (4 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Course 1: Madni Qaida */}
            <div
              className="bg-neutral-900/50 border border-gold-500/10 rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Zoom effect */}
                <div className="relative h-48 overflow-hidden bg-black">
                  <img
                    src="/images/madni-qaida.jpg"
                    alt="Noorani Madni Qaida Course"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-60"
                  />
                </div>
                {/* Details */}
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-gold-400 mb-2">Noorani / Madni Qaida</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Perfect foundation course for beginners and kids. Learn correct Arabic
                    pronunciation (Makharij) and basic rules of reading Quran from scratch.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  to="/services#noorani-qaida"
                  className="block text-center w-full bg-gold-500/10 hover:bg-gold-500 border border-gold-500/30 hover:border-gold-500 text-gold-400 hover:text-black font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
            {/* Course 2: Tajweed-ul-Quran */}
            <div
              className="bg-neutral-900/50 border border-gold-500/10 rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-black">
                  <img
                    src="/images/tajweed-quran.jpg"
                    alt="Tajweed ul Quran Course"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-60"
                  />
                </div>
                {/* Details */}
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-gold-400 mb-2">Tajweed-ul-Quran</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Learn the beautiful art of Quran recitation. Master all rules of Tajweed,
                    beautiful tone, and avoid hidden pronunciation mistakes.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  to="/services#tajweed-quran"
                  className="block text-center w-full bg-gold-500/10 hover:bg-gold-500 border border-gold-500/30 hover:border-gold-500 text-gold-400 hover:text-black font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
            {/* Course 3: Nazra & Quran Memorization (Hifz) */}
            <div
              className="bg-neutral-900/50 border border-gold-500/10 rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-black">
                  <img
                    src="/images/nazra-hifz-quran.jpg"
                    alt="Nazra and Hifz Quran Course"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-60"
                  />
                </div>
                {/* Details */}
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-gold-400 mb-2">Nazra & Hifz Quran</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Complete Quran reading with flow, or memorize selected Surahs/the entire Quran
                    under the supervision of certified Huffaz teachers.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  to="/services#hifz-quran"
                  className="block text-center w-full bg-gold-500/10 hover:bg-gold-500 border border-gold-500/30 hover:border-gold-500 text-gold-400 hover:text-black font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
            {/* Course 4: Islamic Supplications */}
            <div
              className="bg-neutral-900/50 border border-gold-500/10 rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-black">
                  <img
                    src="/images/islamic-supplications.jpg"
                    alt="Islamic Supplications Course"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-60"
                  />
                </div>
                {/* Details */}
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-gold-400 mb-2">Islamic Supplications</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Learn daily Duas, Sunnah manners, 6 Kalimas, method of Salah (Prayers), and
                    fundamental Islamic values to structure a perfect Islamic lifestyle.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  to="/services#islamic-duas"
                  className="block text-center w-full bg-gold-500/10 hover:bg-gold-500 border border-gold-500/30 hover:border-gold-500 text-gold-400 hover:text-black font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= ONLINE CLASSES (ZOOM & GOOGLE MEET) ================= */}
      <div className="max-w-4xl mx-auto px-4 mt-16 mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
          Join Your
          {' '}
          <span className="text-gold-500">Live Classes</span>
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          Access your interactive online sessions directly through our supported platforms.
        </p>
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {/* Zoom Card */}
          <a
            href="https://app.zoom.us/wc"
            target="_blank"
            className="relative group rounded-2xl overflow-hidden bg-neutral-900/60 border border-blue-500/20 p-6 flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] backdrop-blur-sm"
          >
            {/* Background glow */}
            <div
              className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-blue-500/20"
            />
            <div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center text-blue-400 text-3xl mb-4 group-hover:scale-110 transition-transform duration-500 ring-1 ring-blue-500/30 group-hover:ring-blue-500/60"
            >
              <i className="fa-solid fa-video" />
            </div>
            <h4
              className="font-bold text-white text-lg tracking-wide mb-1 group-hover:text-blue-400 transition-colors"
            >
              Zoom Classroom
            </h4>
            <p className="text-xs text-gray-400 mb-4">High-quality video sessions</p>
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"
            >
              Launch App
              {' '}
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </span>
          </a>
          {/* Google Meet Card */}
          <a
            href="https://meet.google.com/"
            target="_blank"
            className="relative group rounded-2xl overflow-hidden bg-neutral-900/60 border border-emerald-500/20 p-6 flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] backdrop-blur-sm"
          >
            {/* Background glow */}
            <div
              className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-emerald-500/20"
            />
            <div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center text-emerald-400 text-3xl mb-4 group-hover:scale-110 transition-transform duration-500 ring-1 ring-emerald-500/30 group-hover:ring-emerald-500/60"
            >
              <i className="fa-solid fa-users" />
            </div>
            <h4
              className="font-bold text-white text-lg tracking-wide mb-1 group-hover:text-emerald-400 transition-colors"
            >
              Google Meet
            </h4>
            <p className="text-xs text-gray-400 mb-4">Seamless browser-based classes</p>
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300"
            >
              Join Meet
              {' '}
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </span>
          </a>
        </div>
      </div>
      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="py-16 bg-neutral-950 border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Info Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-gold-gradient">Get In Touch</h2>
              <p className="text-gray-400 text-sm">
                Have any queries or need assistance regarding schedules or fee packages? Feel free
                to contact us anytime.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500"
                  >
                    <i className="fa-solid fa-phone" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">Call / WhatsApp</span>
                    <a
                      href="tel:+923075329240"
                      className="text-sm font-semibold text-gray-200 hover:text-gold-500 transition-colors"
                    >
                      +923075329240
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500"
                  >
                    <i className="fa-solid fa-location-dot" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">Location</span>
                    <span className="text-sm text-gray-200 font-semibold">
                      Lahore, Punjab, Pakistan (Serving Globally)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Google Map Embed Placeholder */}
            <div className="rounded-2xl border border-gold-500/20 overflow-hidden h-64 shadow-xl">
              <iframe
                className="w-full h-full grayscale opacity-80"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108849.56942060697!2d74.22589531558223!3d31.514722883395995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904ced4e32d3c%3A0xc4aa0e3a6fa34739!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      {/* ================= FOOTER (Dynamic Component) ================= */}
    </>
  );
}
