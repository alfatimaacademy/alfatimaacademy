import usePageMeta from '../hooks/usePageMeta';

export default function About() {
  usePageMeta('About Us - Al Fatima Academy');

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      {/* ================= LIBRARY & ENVIRONMENT SECTION ================= */}
      {/* Is section ka main background 'them 1.jpg' hai aur split grid layout use kiya hai */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-gold-500/10 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0.90), rgba(10, 10, 10, 0.95)), url('/images/them-1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Background soft light effect */}
        <div
          className="absolute top-0 left-1/4 w-72 h-72 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span
              className="inline-block px-3 py-1 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-400 text-[10px] font-semibold tracking-widest uppercase mb-3"
            >
              Spiritual Atmosphere
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold-gradient">
              Our Dedicated Learning Environment
            </h2>
            <div
              className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-3"
            />
          </div>
          {/* Split Content Grid: Left Text, Right Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side: Informative Text (Takes 7 columns on large screens) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-gold-400">
                A Sanctuary of Knowledge & Authentic Resources
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                Online classes ke sath sath, humari academy ek nihayat pur-sukoon aur roohani mahool
                faraham karti hai. Humare paas mutabadil Islamic kutub, classical Tafaseer, aur
                Tajweed ke behtareen resources mojood hain jinse humare asaatiza har waqt mustafeed
                hote hain taake aapko aur aapke bachon ko sabse sahi aur mustanad taleem di ja sake.
              </p>
              {/* Bullet Highlights with Gold Checkmarks */}
              <ul className="space-y-3.5 text-xs md:text-sm text-gray-400">
                <li className="flex items-start space-x-3">
                  <span className="text-gold-500 mt-1">
                    <i className="fa-solid fa-circle-check" />
                  </span>
                  <span>
                    <strong>Authentic Islamic Library:</strong>
                    {' '}
                    Guided reference materials for advanced Tajweed and Tafseer studies.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gold-500 mt-1">
                    <i className="fa-solid fa-circle-check" />
                  </span>
                  <span>
                    <strong>Quiet & Spiritual Space:</strong>
                    {' '}
                    Tutors deliver online lectures from a serene, highly-focused academy setup.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gold-500 mt-1">
                    <i className="fa-solid fa-circle-check" />
                  </span>
                  <span>
                    <strong>Continuous Monitoring:</strong>
                    {' '}
                    Admin supervised environment ensuring unmatched educational standards.
                  </span>
                </li>
              </ul>
            </div>
            {/* Right Side: Library Image (Takes 5 columns on large screens) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm sm:max-w-md w-full">
                {/* Golden Decorative Border Behind Image */}
                <div
                  className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-gold-600 to-transparent opacity-40 blur-sm group-hover:opacity-75 transition-opacity duration-500"
                />
                {/* Actual Image */}
                <div
                  className="relative rounded-2xl overflow-hidden border border-gold-500/30 bg-black shadow-2xl"
                >
                  <img
                    src="/images/madrisah-library.jpg"
                    alt="Al Fatima Academy Spiritual Library"
                    className="w-full h-64 sm:h-80 object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Soft overlay gradient on top of image */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Instructor / Founder Profile Section */}
      <section
        className="py-16 px-4 text-slate-100 border-t border-slate-800/50"
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)' }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side: Text Grid */}
          <div className="space-y-5">
            <div
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold text-xs tracking-wider uppercase"
            >
              <i className="fa-solid fa-star text-amber-400 text-xs" />
              <span>Founder & Senior Quran Teacher</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-amber-400 tracking-wide">
              Qari Muhammad Shafiq Raza
            </h2>
            <p className="text-slate-200 font-medium text-base md:text-lg">
              15+ Years of Dedicated Online & Offline Quranic Teaching Experience
            </p>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              Qari Muhammad Shafiq Raza has been passionately teaching the Holy Quran for over 15
              years, helping thousands of kids and adults master Tajweed, Makharij, and Fluent Quran
              Recitation. His structured teaching methodology ensures every student learns with
              proper pronunciation, patience, and deep spiritual connection.
            </p>
            {/* Highlights List */}
            <ul className="space-y-2.5 text-slate-300 text-sm pt-1">
              <li className="flex items-center space-x-3">
                <i className="fa-solid fa-circle-check text-amber-400" />
                <span>Expert in Tajweed & Proper Quranic Pronunciation</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fa-solid fa-circle-check text-amber-400" />
                <span>15+ Years Experience with Global Online Students</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fa-solid fa-circle-check text-amber-400" />
                <span>Patient, Student-Friendly & Interactive Environment</span>
              </li>
            </ul>
            {/* Custom Quote Tag */}
            <div className="pt-3">
              <div
                className="inline-flex items-center space-x-3 px-5 py-3 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-amber-300 shadow-xl"
              >
                <i className="fa-solid fa-quote-left text-xl text-amber-400 opacity-80" />
                <span className="text-sm font-medium italic text-slate-200">
                  "Teaching with Excellence, Guidance with Devotion"
                </span>
              </div>
            </div>
          </div>
          {/* Right Side: Image Grid */}
          <div className="relative flex justify-center items-center">
            {/* Glow Background */}
            <div
              className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-yellow-600/20 rounded-3xl blur-xl opacity-70"
            />
            {/* Image Frame */}
            <div
              className="relative w-full max-w-md bg-slate-900/90 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl p-2"
            >
              <div
                className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center"
              >
                {/* Image Position Centered Properly */}
                <img
                  src="/images/qari-sb.jpeg"
                  alt="Qari Muhammad Shafiq Raza"
                  className="w-full h-full object-cover object-[center_20%] hover:scale-105 transition duration-500"
                />
              </div>
              {/* Bottom Experience Badge Overlay */}
              <div
                className="absolute bottom-5 right-5 bg-slate-950/90 border border-amber-500/40 backdrop-blur-md rounded-xl px-4 py-2 shadow-2xl flex items-center space-x-3"
              >
                <i className="fa-solid fa-award text-amber-400 text-xl" />
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Experience</div>
                  <div className="text-sm font-extrabold text-slate-100">15+ Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= CONTENT SECTION ================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Column */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400">Our Noble Mission</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              At
              {' '}
              <strong>Al Fatima Academy</strong>
              {' '}
              (A proud project of
              {' '}
              <strong>Al Quran International</strong>
              ), we aim to provide an easy, interactive, and highly professional environment for
              kids and adults alike to learn the Holy Quran from the comfort of their homes.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              We understand that correct Quranic recitation with proper Tajweed rules is crucial for
              every Muslim. Under the umbrella of Al Quran International, we use cutting-edge online
              platforms like Zoom and Google Meet to offer 1-on-1 personalized attention, ensuring
              every student progresses at their own comfortable pace.
            </p>
            {/* Key Highlights Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border border-gold-500/10 p-4 rounded-xl bg-neutral-900/50">
                <h4 className="text-gold-500 font-bold text-xl">100%</h4>
                <p className="text-xs text-gray-400">Certified Tutors</p>
              </div>
              <div className="border border-gold-500/10 p-4 rounded-xl bg-neutral-900/50">
                <h4 className="text-gold-500 font-bold text-xl">1-on-1</h4>
                <p className="text-xs text-gray-400">Private Sessions</p>
              </div>
            </div>
          </div>
          {/* Right Features Card Grid */}
          <div className="space-y-4">
            {/* Card 1 */}
            <div
              className="bg-neutral-900 border border-gold-500/10 p-6 rounded-2xl flex items-start space-x-4"
            >
              <div className="text-gold-500 text-2xl mt-1">
                <i className="fa-solid fa-graduation-cap" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Experienced Educators</h3>
                <p className="text-xs text-gray-400">
                  Our teachers are certified Huffaz and Qaris with years of experience teaching
                  Arabic phonetics and Quranic recitation online.
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div
              className="bg-neutral-900 border border-gold-500/10 p-6 rounded-2xl flex items-start space-x-4"
            >
              <div className="text-gold-500 text-2xl mt-1">
                <i className="fa-solid fa-clock" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Flexible Scheduling</h3>
                <p className="text-xs text-gray-400">
                  Classes are scheduled strictly according to your convenience. We offer multiple
                  slots operating 24 hours a day, 7 days a week.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div
              className="bg-neutral-900 border border-gold-500/10 p-6 rounded-2xl flex items-start space-x-4"
            >
              <div className="text-gold-500 text-2xl mt-1">
                <i className="fa-solid fa-venus-mars" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Female Tutors Available</h3>
                <p className="text-xs text-gray-400">
                  We respect cultural and personal preferences, providing highly trained female
                  teachers for sisters and young girls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dynamic Translation Gateway */}
      <div className="bg-neutral-900/40 border-t border-neutral-800 py-6 text-center w-full">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-3">
          <span className="text-xs text-gray-400 font-medium tracking-wide">
            <i className="fa-solid fa-language text-gold-400 mr-1 text-sm" />
            {' '}
            Translate Website:
          </span>
        </div>
      </div>
      {/* Dynamic Router Script */}
      {/* ================= FOOTER (Dynamic Component) ================= */}
    </>
  );
}
