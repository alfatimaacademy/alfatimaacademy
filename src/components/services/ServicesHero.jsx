// NOTE: the original services.html hid this section with JavaScript on page load,
// so it was never visible. It is kept here (unused) in case you want it back.
export default function ServicesHero() {
  return (
    <section
      id="services-hero"
      className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Background Image Container with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <img
          src="/images/services-page-them.jpg"
          alt="Quran Background"
          className="w-full h-full object-cover object-center opacity-40"
        />
        {/* Dark Gradients to blend with dark page theme and ensure text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/70 to-neutral-950"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-neutral-950/90" />
      </div>
      {/* Content Area (Z-Index ensures it stays on top of background) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Explore Badge */}
        <div className="inline-block mb-4">
          <span
            className="border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
          >
            Explore Our Courses
          </span>
        </div>
        {/* Main Title */}
        <h1
          className="font-serif text-4xl md:text-6xl font-bold text-white tracking-wide leading-tight drop-shadow-md"
        >
          Our
          {' '}
          <span className="text-gold-500">Islamic</span>
          {' '}
          Services
        </h1>
        {/* Small Gold Divider Line */}
        <div className="w-20 h-1 bg-gold-500 mx-auto my-6 rounded-full" />
        {/* Description Text */}
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow">
          Choose from our structured learning pathways. Whether you are a beginner starting from
          scratch or looking to refine your Tajweed, we have custom classes for you.
        </p>
      </div>
    </section>
  );
}
