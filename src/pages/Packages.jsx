import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { PRICING } from '../data/pricing';

export default function Packages() {
  usePageMeta('Packages - Al Fatima Academy');
  const [currency, setCurrency] = useState('PKR');
  const prices = PRICING[currency];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-center overflow-hidden border-b border-slate-800"
      >
        <div
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#facc15_1px,transparent_1px)] [background-size:16px_16px]"
        />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span
            className="inline-block bg-gold-500/10 border border-gold-500/30 text-gold-400 font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-4"
          >
            Affordable Global Islamic Education
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Flexible
            {' '}
            <span className="text-gold-400">Quran Learning</span>
            {' '}
            Plans
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Select your country below to view customized monthly fee plans. 1-on-1 personalized live
            classes with certified Tajweed tutors.
          </p>
          {/* Country / Currency Selector Dropdown */}
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-gold-500/40 shadow-xl shadow-gold-500/5 max-w-full w-full sm:w-auto"
          >
            <label htmlFor="currencySelector" className="text-sm font-semibold text-slate-300 pl-2">
              Select Country:
            </label>
            <select
              id="currencySelector"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="bg-slate-950 border border-gold-500 text-gold-400 font-bold py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 cursor-pointer text-sm sm:text-base w-full sm:w-auto text-center sm:text-left"
            >
              <option value="PKR">🇵🇰 Pakistan (PKR)</option>
              <option value="USD_UK">🇨🇦 Canada / 🇬🇧 UK ($ / £)</option>
              <option value="CNY">🇨🇳 China (CNY ¥)</option>
              <option value="AED">🇦🇪 UAE (AED)</option>
              <option value="BDT">🇧🇩 Bangladesh (BDT ৳)</option>
            </select>
          </div>
        </div>
      </section>
      {/* Pricing Cards Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Basic */}
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-gold-500/50 transition-all duration-300 shadow-lg"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">2 Days / Week</span>
              <h2 className="text-2xl font-bold text-white mt-1 mb-2">Basic Plan</h2>
              <p className="text-slate-400 text-sm mb-6">
                Ideal for beginners and busy schedule students (8 classes/mo).
              </p>
              <div className="text-4xl font-black text-gold-400 mb-6" id="price-basic">
                {prices.basic} /mo
              </div>
              <ul className="space-y-3 text-slate-300 text-sm mb-8 border-t border-slate-800 pt-6">
                <li className="flex items-center">
                  <i className="fa-solid fa-circle-check text-gold-400 mr-3 text-base" />
                  {' '}
                  30 Mins Live 1-on-1 Class
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-circle-check text-gold-400 mr-3 text-base" />
                  {' '}
                  Basic Tajweed & Qaida
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-circle-check text-gold-400 mr-3 text-base" />
                  {' '}
                  Essential Daily Duas
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-circle-check text-gold-400 mr-3 text-base" />
                  {' '}
                  3-Day Free Trial
                </li>
              </ul>
            </div>
            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <Link
                to="/contact"
                className="block w-full text-center bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold py-3 rounded-xl transition duration-300"
              >
                <i className="fa-solid fa-user-plus mr-2" />
                {' '}
                Register Now
              </Link>
              <a
                href="https://wa.me/923075329240"
                target="_blank"
                className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl transition duration-300 text-sm"
              >
                <i className="fa-solid fa-phone text-emerald-400 mr-2" />
                {' '}
                Call / WhatsApp
              </a>
            </div>
          </div>
          {/* Plan 2: Standard (Featured) */}
          <div
            className="bg-slate-900 border-2 border-gold-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl shadow-gold-500/10 transform md:-translate-y-2"
          >
            <span
              className="absolute -top-3.5 right-6 sm:right-8 bg-gold-500 text-slate-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider"
            >
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">3 Days / Week</span>
              <h2 className="text-2xl font-bold text-white mt-1 mb-2">Standard Plan</h2>
              <p className="text-slate-400 text-sm mb-6">
                Best balance for steady and effective learning (12 classes/mo).
              </p>
              <div className="text-4xl font-black text-gold-400 mb-6" id="price-standard">
                {prices.standard} /mo
              </div>
              <ul className="space-y-3 text-slate-300 text-sm mb-8 border-t border-slate-800 pt-6">
                <li className="flex items-center">
                  <i className="fa-solid fa-circle-check text-gold-400 mr-3 text-base" />
                  {' '}
                  30 Mins Live 1-on-1 Class
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-circle-check text-gold-400 mr-3 text-base" />
                  {' '}
                  Proper Tajweed Rules
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-circle-check text-gold-400 mr-3 text-base" />
                  {' '}
                  Quran Recitation & Hifz
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-circle-check text-gold-400 mr-3 text-base" />
                  {' '}
                  Monthly Progress Report
                </li>
              </ul>
            </div>
            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <Link
                to="/contact"
                className="block w-full text-center bg-gold-500 hover:bg-gold-400 text-slate-950 font-extrabold py-3.5 rounded-xl shadow-lg shadow-gold-500/20 transition duration-300"
              >
                <i className="fa-solid fa-user-plus mr-2" />
                {' '}
                Register Now
              </Link>
              <a
                href="https://wa.me/923075329240"
                target="_blank"
                className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl transition duration-300 text-sm"
              >
                <i className="fa-solid fa-phone text-emerald-400 mr-2" />
                {' '}
                Call / WhatsApp
              </a>
            </div>
          </div>
          {/* Plan 3: Intensive */}
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-gold-500/50 transition-all duration-300 shadow-lg"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">5 Days / Week</span>
              <h2 className="text-2xl font-bold text-white mt-1 mb-2">Intensive Plan</h2>
              <p className="text-slate-400 text-sm mb-6">
                Designed for fast-track Hifz and daily practice (20 classes/mo).
              </p>
              <div className="text-4xl font-black text-gold-400 mb-6" id="price-intensive">
                {prices.intensive} /mo
              </div>
              <ul className="space-y-3 text-slate-300 text-sm mb-8 border-t border-slate-800 pt-6">
                <li className="flex items-center">
                  <i className="fa-solid fa-circle-check text-gold-400 mr-3 text-base" />
                  {' '}
                  Full Hifz-ul-Quran Focus
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-circle-check text-gold-400 mr-3 text-base" />
                  {' '}
                  Advanced Pronunciation
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-circle-check text-gold-400 mr-3 text-base" />
                  {' '}
                  Flexible Time Adjustments
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-circle-check text-gold-400 mr-3 text-base" />
                  {' '}
                  Senior Quran Teacher
                </li>
              </ul>
            </div>
            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <Link
                to="/contact"
                className="block w-full text-center bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold py-3 rounded-xl transition duration-300"
              >
                <i className="fa-solid fa-user-plus mr-2" />
                {' '}
                Register Now
              </Link>
              <a
                href="https://wa.me/923075329240"
                target="_blank"
                className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl transition duration-300 text-sm"
              >
                <i className="fa-solid fa-phone text-emerald-400 mr-2" />
                {' '}
                Call / WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Dynamic Pricing Script */}
      {/* ================= FOOTER (Dynamic Component) ================= */}
    </>
  );
}
