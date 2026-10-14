import { Fragment, useEffect, useRef, useState } from 'react';
import { BISMILLAH_TEXT, JUZ_NAMES, SURAH_NAMES, loadQuran, removeBismillah } from '../services/quranApi';

// Para (Juz) mode: show the surah name whenever a new surah begins
function SurahBanner({ ayah, withBismillah, isContinued }) {
  return (
    <div className="w-full text-center my-6 border-y border-gold-500/30 py-4">
      {ayah.surahAr && <div className="text-2xl text-gold-600 font-bold">{ayah.surahAr}</div>}
      <div className="text-xs font-sans text-gray-500 mt-1">
        {ayah.surahEn + (isContinued ? ' (continued)' : '')}
      </div>
      {withBismillah && <div className="text-2xl text-gold-500 mt-4">{BISMILLAH_TEXT}</div>}
    </div>
  );
}

export default function QuranReader() {
  const [juz, setJuz] = useState('');
  const [surah, setSurah] = useState('');
  // null = slider untouched. (Original behaviour: the slider shows 32 but the text keeps the
  // default size until the slider is moved.)
  const [fontSize, setFontSize] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const [result, setResult] = useState(null); // { title, ayahs, isJuz }
  const [errorDetail, setErrorDetail] = useState('');

  const lastRequest = useRef(0);
  const lastLoad = useRef(null); // remembers what to retry
  const boxRef = useRef(null);

  function startLoad(kind, num) {
    const token = ++lastRequest.current;
    lastLoad.current = { kind, num };
    setStatus('loading');

    loadQuran(kind, num)
      .then((data) => {
        if (token !== lastRequest.current) return; // user already picked something else
        setResult({ ...data, isJuz: kind === 'juz' });
        setStatus('ready');
      })
      .catch((err) => {
        if (token !== lastRequest.current) return;
        setErrorDetail(
          'Please check your internet connection and try again. (' +
            (err && err.message ? err.message : 'unknown error') +
            ')'
        );
        setStatus('error');
      });
  }

  function handleJuz(value) {
    setJuz(value);
    if (!value) return;
    setSurah(''); // clear other selector
    startLoad('juz', Number(value));
  }

  function handleSurah(value) {
    setSurah(value);
    if (!value) return;
    setJuz(''); // clear other selector
    startLoad('surah', Number(value));
  }

  function retryLastLoad() {
    if (lastLoad.current) startLoad(lastLoad.current.kind, lastLoad.current.num);
  }

  // bring the result into view (helpful on phones)
  useEffect(() => {
    if (status === 'ready' && boxRef.current) {
      boxRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [status, result]);

  // Single-surah mode: Bismillah shown once at the top (not for Fatihah / Tawbah)
  const firstSurahNo = result && result.ayahs.length ? result.ayahs[0].surahNo : 0;
  const showTopBismillah = !!result && !result.isJuz && firstSurahNo !== 1 && firstSurahNo !== 9;

  const verses = result
    ? result.ayahs.map((ayah, idx) => {
        const startsSurah = ayah.n === 1;
        // The API puts the Bismillah inside ayah 1 of every surah except Al-Fatihah and At-Tawbah
        const hasBismillah = startsSurah && ayah.surahNo !== 1 && ayah.surahNo !== 9;
        const text = hasBismillah ? removeBismillah(ayah.text) : ayah.text;

        return (
          <Fragment key={`${ayah.surahNo}:${ayah.n}`}>
            {result.isJuz && startsSurah && (
              <SurahBanner ayah={ayah} withBismillah={hasBismillah} isContinued={false} />
            )}
            {result.isJuz && !startsSurah && idx === 0 && (
              <SurahBanner ayah={ayah} withBismillah={false} isContinued />
            )}
            <span className="inline-block mb-3">
              {text + ' '}
              <span className="text-gold-500 font-sans font-bold text-xs border border-gold-500/40 rounded-full px-2 py-0.5 mx-1 inline-block select-none">
                {ayah.n}
              </span>
            </span>
          </Fragment>
        );
      })
    : null;

  return (
    <section className="py-8 sm:py-12 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
      <div
        className="bg-white shadow-2xl shadow-black/5 border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-6"
      >
        {/* Controls Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center border-b border-gray-200 pb-6">
          {/* Select Para */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Choose Para (Juz):</label>
            <select
              id="juzSelect"
              value={juz}
              onChange={(event) => handleJuz(event.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-xl p-3 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 cursor-pointer transition-all"
            >
              <option value="">-- Select Para --</option>
              {JUZ_NAMES.map((name, i) => (
                  <option key={i} value={i + 1}>
                    {`Para ${i + 1} - ${name}`}
                  </option>
                ))}
            </select>
          </div>
          {/* Select Surah */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Choose Surah:</label>
            <select
              id="surahSelect"
              value={surah}
              onChange={(event) => handleSurah(event.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-xl p-3 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 cursor-pointer transition-all"
            >
              <option value="">-- Select Surah --</option>
              {SURAH_NAMES.map((name, i) => (
                  <option key={i} value={i + 1}>
                    {`${i + 1}. ${name}`}
                  </option>
                ))}
            </select>
          </div>
          {/* Text Size Adjuster */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Adjust Font Size:</label>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500 font-bold">A</span>
              <input
                type="range"
                id="fontSizeSlider"
                min="20"
                max="50"
                value={fontSize ?? 32}
                onChange={(event) => setFontSize(Number(event.target.value))}
                className="w-full accent-gold-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-lg text-gold-500 font-bold">A</span>
            </div>
          </div>
        </div>
        {/* Loading Spinner */}
        <div id="loading" className={`${status === 'loading' ? '' : 'hidden'} text-center py-20 space-y-3`}>
          <i className="fa-solid fa-spinner fa-spin text-3xl text-gold-500" />
          <p className="text-xs text-gray-600 font-semibold">Fetching verses from Quran API...</p>
        </div>
        {/* Quran Text Render Box */}
        <div
          id="quranDisplayBox"
          translate="no"
          ref={boxRef}
          className={`notranslate min-h-[350px] sm:min-h-[400px] bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-10 border border-gray-200 ${status === 'ready' ? '' : 'hidden'} text-center text-gray-900`}
        >
          <div id="readerHeader" className="mb-6 sm:mb-8 border-b border-gray-200 pb-4">
            <h2 id="readerTitle" className="text-lg sm:text-xl font-serif font-bold text-gray-800">
              {result ? result.title : 'Please Select an option above'}
            </h2>
          </div>
          {/* Bismillah Al-Rahman Al-Rahim (Optional Display) */}
          <div id="bismillah" className={`text-2xl sm:text-3xl text-gold-500 font-quran mb-6 sm:mb-8 ${showTopBismillah ? '' : 'hidden'}`}>
            بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
          </div>
          {/* Verses Area */}
          <div
            id="versesContainer"
            style={fontSize ? { fontSize: `${fontSize}px` } : undefined}
            dir="rtl"
            className="font-quran leading-loose tracking-wide text-right flex flex-wrap justify-center gap-y-4 sm:gap-y-6 gap-x-2 sm:gap-x-4 select-none text-black break-words max-w-full"
          >
            {verses}
          </div>
        </div>
        {/* Empty State */}
        <div id="emptyState" className={`${status === 'idle' ? '' : 'hidden'} text-center py-24 space-y-4`}>
          <div className="text-gray-300 text-5xl">
            <i className="fa-solid fa-book-quran" />
          </div>
          <h3 className="text-lg font-serif font-bold text-gray-700">No Para or Surah Selected</h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            Please choose a Para (Juz) or Surah from the dropdown controls above to start reading.
          </p>
        </div>
        {/* Error State (shown if the Quran text could not be loaded) */}
        <div id="errorState" className={`${status === 'error' ? '' : 'hidden'} text-center py-24 space-y-4`}>
          <div className="text-red-400 text-5xl">
            <i className="fa-solid fa-triangle-exclamation" />
          </div>
          <h3 className="text-lg font-serif font-bold text-gray-700">Could not load the Quran text</h3>
          <p id="errorDetail" className="text-xs text-gray-500 max-w-md mx-auto">
              {errorDetail}
            </p>
          <button
            type="button"
            onClick={retryLastLoad}
            className="bg-gold-500 hover:bg-gold-600 text-black font-semibold text-sm px-6 py-2 rounded-full transition-colors"
          >
            <i className="fa-solid fa-rotate-right mr-1" />
            {' '}
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
}
