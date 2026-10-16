import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { BLOG_POSTS, CATEGORIES } from '../data/blogPosts';

export default function Blog() {
  usePageMeta('Islamic Learning Blog & Guides – Al Fatima Academy');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="bg-neutral-950 min-h-screen text-gray-200">
      {/* ─────────── HERO HEADER ─────────── */}
      <section className="relative overflow-hidden bg-neutral-950 pattern-grid border-b border-gold-500/10 pt-12 pb-14">
        {/* Glow orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <i className="fa-solid fa-chevron-right text-[10px]" />
            <span className="text-gold-400 font-medium">Blog &amp; Articles</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
              Knowledge &amp; Spiritual Guides
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Islamic Learning <span className="text-gold-gradient">Blog</span>
            </h1>
            <p className="mt-4 text-gray-400 text-base sm:text-lg leading-relaxed">
              Practical guides on Tajweed rules, Quran memorization strategies, Islamic parenting, and daily prophetic supplications from certified scholars.
            </p>
          </div>

          {/* Search Bar & Categories */}
          <div className="mt-8 pt-6 border-t border-gold-500/10 space-y-5">
            {/* Search Input */}
            <div className="relative max-w-md">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-neutral-900/80 border border-gold-500/20 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs p-1"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${isActive
                      ? 'bg-gold-500 text-neutral-950 font-bold shadow-md shadow-gold-500/20'
                      : 'bg-neutral-900 text-gray-400 border border-white/5 hover:border-gold-500/30 hover:text-gray-200'
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── POSTS SECTION ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/10 flex items-center justify-center">
              <i className="fa-solid fa-file-circle-question text-gold-400 text-2xl" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">No articles found</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              No articles match your search query &quot;{searchQuery}&quot;. Try resetting your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-gold-300 underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* FEATURED POST (Only if no specific search query or if matches) */}
            {featuredPost && (
              <div className="relative group rounded-2xl overflow-hidden border border-gold-500/20 bg-neutral-900/50 hover:border-gold-500/40 transition-all duration-500 shadow-xl shadow-gold-500/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent lg:hidden" />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950/80 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                      <i className="fa-solid fa-star text-[10px]" /> Featured Article
                    </span>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-6 space-y-4">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="text-gold-400 font-semibold">{featuredPost.category}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                      <span>•</span>
                      <span>{featuredPost.date}</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-gold-400 transition-colors leading-tight">
                      <Link to={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredPost.authorImg}
                          alt={featuredPost.author}
                          className="w-9 h-9 rounded-full object-cover border border-gold-500/30"
                        />
                        <div>
                          <p className="text-xs font-semibold text-white">{featuredPost.author}</p>
                          <p className="text-[11px] text-gray-500">{featuredPost.authorRole}</p>
                        </div>
                      </div>

                      <Link
                        to={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 group-hover:text-gold-300 transition-colors"
                      >
                        Read Article <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* REGULAR POSTS GRID */}
            {regularPosts.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-gold-400" />
                  Latest Articles &amp; Insights
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post) => (
                    <article
                      key={post.id}
                      className="group flex flex-col rounded-2xl overflow-hidden border border-gold-500/15 bg-neutral-900/40 hover:bg-neutral-900/70 hover:border-gold-500/30 transition-all duration-300 shadow-lg hover:-translate-y-1"
                    >
                      {/* Image Thumbnail */}
                      <Link to={`/blog/${post.slug}`} className="relative h-48 overflow-hidden block">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-1 rounded-md bg-neutral-950/85 border border-gold-500/25 text-gold-400 text-[11px] font-semibold backdrop-blur-sm">
                            {post.category}
                          </span>
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2 text-[11px] text-gray-400">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>

                          <h4 className="font-serif text-lg font-bold text-white group-hover:text-gold-400 transition-colors leading-snug line-clamp-2">
                            <Link to={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h4>

                          <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Footer author & link */}
                        <div className="pt-3 border-t border-gold-500/10 flex items-center justify-between">
                          <span className="text-[11px] text-gray-400 flex items-center gap-1.5">
                            <i className="fa-solid fa-user-pen text-gold-500 text-[10px]" />
                            {post.author}
                          </span>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                          >
                            Read <i className="fa-solid fa-chevron-right text-[9px]" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ─────────── BOTTOM ENROLLMENT CTA ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-gold-500/25 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-wider">
              Experience 1-on-1 Learning
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Start Your Free 3-Day Trial Today
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience how our certified tutors guide kids and adults with patience, Sanad credentials, and interactive digital whiteboards.
            </p>
          </div>

          <Link
            to="/contact"
            className="glow-pulse shrink-0 inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold py-3.5 px-8 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-gold-500/20"
          >
            <i className="fa-solid fa-paper-plane text-xs" />
            Book Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
