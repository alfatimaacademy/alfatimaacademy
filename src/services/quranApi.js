// Quran text loading (functions copied from the original quran.html).
// Source 1: api.alquran.cloud   |   Backup: api.quran.com

export const JUZ_NAMES = [
  "Alif Laam Meem", "Sayaqool", "Tilkal Rusul", "Lan Tanaloo", "Wal Muhsanat",
  "La Yuhibbullah", "Wa Iza Samiu", "Wa Lau Annana", "Qalal Malao", "Wa A'lamu",
  "Yatazeroon", "Wa Mamin Dabbah", "Wa Ma Ubrioo", "Rubama", "Subhanallazi",
  "Qala Alam", "Iqtarabo", "Qadd Aflaha", "Wa Qalallazina", "A'man Khalaq",
  "Utlu Ma Oohi", "Wa Manyaqnut", "Wa Mali", "Faman Azlam", "Ilayhi Yuraddu",
  "Ha Meem", "Qala Fama Khatbukum", "Qadd Sami Allah", "Tabarakallazi", "Amma"
];

export const SURAH_NAMES = [
  "Al-Fatihah", "Al-Baqarah", "Ali 'Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am", "Al-A'raf", "Al-Anfal",
  "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf",
  "Maryam", "Ta-Ha", "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara",
  "An-Naml", "Al-Qasas", "Al-'Ankabut", "Ar-Rum", "Luqman", "As-Sajdah", "Al-Ahzab", "Saba", "Fatir",
  "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan",
  "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Adh-Dhariyat", "At-Tur",
  "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqi'ah", "Al-Hadid", "Al-Mujadila", "Al-Hashr", "Al-Mumtahanah",
  "As-Saff", "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam",
  "Al-Haqqah", "Al-Ma'arij", "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah", "Al-Insan",
  "Al-Mursalat", "An-Naba", "An-Nazi'at", "'Abasa", "At-Takwir", "Al-Infitar", "Al-Mutaffifin",
  "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad", "Ash-Shams",
  "Al-Layl", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-'Alaq", "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah",
  "Al-'Adiyat", "Al-Qari'ah", "At-Takathur", "Al-'Asr", "Al-Humazah", "Al-Fil", "Quraysh", "Al-Ma'un",
  "Al-Kawthar", "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
];

export const BISMILLAH_TEXT = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";

// fetch() with a timeout, so the page never hangs on a slow / blocked API
async function fetchJson(url, ms = 15000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// Every source is converted to the same simple shape:
// { title, ayahs: [ { surahNo, surahAr, surahEn, n, text } ] }
async function fromAlQuranCloud(kind, num) {
  const json = await fetchJson(`https://api.alquran.cloud/v1/${kind}/${num}/quran-uthmani`);
  if (json.code !== 200 || !json.data || !json.data.ayahs) throw new Error('alquran.cloud: bad response');
  const d = json.data;
  if (kind === 'juz') {
    return {
      title: `Para ${num} - ${JUZ_NAMES[num - 1]}`,
      ayahs: d.ayahs.map(a => ({
        surahNo: a.surah.number, surahAr: a.surah.name, surahEn: a.surah.englishName,
        n: a.numberInSurah, text: a.text
      }))
    };
  }
  return {
    title: `${d.englishName} (${d.name})`,
    ayahs: d.ayahs.map(a => ({
      surahNo: d.number, surahAr: d.name, surahEn: d.englishName,
      n: a.numberInSurah, text: a.text
    }))
  };
}

// Backup source, used automatically if the first one fails
async function fromQuranCom(kind, num) {
  const param = kind === 'juz' ? 'juz_number' : 'chapter_number';
  const json = await fetchJson(`https://api.quran.com/api/v4/quran/verses/uthmani?${param}=${num}`);
  if (!json.verses || !json.verses.length) throw new Error('quran.com: bad response');
  const ayahs = json.verses.map(v => {
    const [sNo, aNo] = v.verse_key.split(':').map(Number);
    return { surahNo: sNo, surahAr: '', surahEn: SURAH_NAMES[sNo - 1], n: aNo, text: v.text_uthmani };
  });
  return {
    title: kind === 'juz' ? `Para ${num} - ${JUZ_NAMES[num - 1]}` : `${SURAH_NAMES[num - 1]}`,
    ayahs
  };
}

export async function loadQuran(kind, num) {
  try {
    return await fromAlQuranCloud(kind, num);
  } catch (e1) {
    console.warn('Primary Quran API failed, trying backup...', e1);
    try {
      return await fromQuranCom(kind, num);
    } catch (e2) {
      console.error('Backup Quran API failed too', e2);
      throw new Error(`${e1.message} / ${e2.message}`);
    }
  }
}

// Remove the diacritics so we can safely recognise the Bismillah at the start of an ayah
function plainArabic(t) {
  return t.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\uFEFF\u200E\u200F]/g, '');
}

// The API puts the Bismillah (4 words) inside ayah 1 of every surah except Al-Fatihah and At-Tawbah
export function removeBismillah(text) {
  const words = text.trim().split(/\s+/);
  if (words.length > 4 && plainArabic(words[0]).startsWith('بسم')) {
    return words.slice(4).join(' ');
  }
  return text;
}
