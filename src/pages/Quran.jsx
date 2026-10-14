import usePageMeta from '../hooks/usePageMeta';
import QuranReader from '../components/QuranReader';

export default function Quran() {
  usePageMeta('Read Holy Quran - Al Fatima Academy');

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      {/* ================= HERO SECTION ================= */}
      {/* Humne yahan background image lagayi hai aur linear-gradient overlay de kar ise halka/dim kiya hai */}
      <section
        className="relative py-20 overflow-hidden text-center border-b border-gold-500/10"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(10, 10, 10, 0.94), rgba(10, 10, 10, 0.88), rgba(10, 10, 10, 0.96)), url('/images/read-quran-them.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Subtle Grid Pattern Overlay (Optional but looks very premium) */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span
            className="inline-block px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-[10px] font-bold tracking-widest uppercase mb-4 animate-pulse"
          >
            Interactive Quran Reader
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient mb-3">
            Read The Holy Quran
          </h1>
          <p className="text-gray-300 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Select your desired Para (Juz) or Surah below to start reading with clear Arabic
            scripts. Adjust the font size according to your comfort.
          </p>
        </div>
      </section>
      {/* ================= READER INTERFACE ================= */}
      <QuranReader />
      {/* ================= GLOBAL LANGUAGE TRANSLATOR ================= */}
      <div className="bg-neutral-900/40 border-t border-neutral-800 py-4 text-center w-full">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="text-xs text-gray-400 font-medium tracking-wide">
            <i className="fa-solid fa-language text-gold-400 mr-1 text-sm" />
            {' '}
            Select Your Language:
          </span>
          {/* Google Translate Dropdown Container */}
          <div
            id="google_element"
            className="inline-block overflow-hidden rounded-md border border-gold-500/20 bg-neutral-950 text-xs text-white"
          />
        </div>
      </div>
      {/* Google Translate Scripts (Put this right before the </body> tag if possible) */}
      {/* ================= FOOTER (Dynamic Component) ================= */}
    </>
  );
}
