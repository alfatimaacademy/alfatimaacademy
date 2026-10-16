import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  usePageMeta(post ? `${post.title} – Al Fatima Academy` : 'Article Not Found');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!post) {
    return (
      <div className="bg-neutral-950 min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <i className="fa-solid fa-triangle-exclamation text-gold-400 text-4xl mb-4" />
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">Article Not Found</h1>
        <p className="text-gray-400 text-sm max-w-md mb-6">
          The article you are looking for might have been moved or does not exist.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold py-2.5 px-6 rounded-xl text-sm transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-xs" /> Back to Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <article className="bg-neutral-950 min-h-screen text-gray-200">
      {/* ─────────── ARTICLE HEADER ─────────── */}
      <header className="relative overflow-hidden bg-neutral-950 pattern-grid border-b border-gold-500/10 pt-12 pb-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 flex-wrap">
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <i className="fa-solid fa-chevron-right text-[10px]" />
            <Link to="/blog" className="hover:text-gold-400 transition-colors">Blog</Link>
            <i className="fa-solid fa-chevron-right text-[10px]" />
            <span className="text-gold-400 font-medium truncate max-w-xs">{post.category}</span>
          </nav>

          {/* Meta Badges */}
          <div className="flex items-center gap-3 text-xs mb-4">
            <span className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 font-bold uppercase tracking-wider text-[11px]">
              {post.category}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{post.readTime}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{post.date}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author info & Actions */}
          <div className="mt-8 pt-6 border-t border-gold-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.authorImg}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover border border-gold-500/30 shadow-md"
              />
              <div>
                <p className="text-sm font-semibold text-white">{post.author}</p>
                <p className="text-xs text-gray-400">{post.authorRole} · Al Fatima Academy</p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 mr-1">Share:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-emerald-950 border border-white/5 hover:border-emerald-500/40 flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-colors"
                title="Share on WhatsApp"
              >
                <i className="fa-brands fa-whatsapp text-sm" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-blue-950 border border-white/5 hover:border-blue-500/40 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-colors"
                title="Share on Facebook"
              >
                <i className="fa-brands fa-facebook-f text-xs" />
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-gold-500/10 border border-white/5 hover:border-gold-500/40 flex items-center justify-center text-gray-400 hover:text-gold-400 transition-colors"
                title="Copy Link"
              >
                <i className="fa-solid fa-link text-xs" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────── ARTICLE BODY ─────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        {/* Main Cover Image */}
        <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-xl max-h-[440px]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center max-h-[440px]"
          />
        </div>

        {/* Content Elements */}
        <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
          {post.content.map((block, idx) => {
            if (block.type === 'paragraph') {
              return <p key={idx} className="leading-relaxed">{block.text}</p>;
            }
            if (block.type === 'heading') {
              return (
                <h2
                  key={idx}
                  className="font-serif text-2xl sm:text-3xl font-bold text-white pt-4 border-l-4 border-gold-400 pl-4 my-6"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'callout') {
              return (
                <div
                  key={idx}
                  className="my-8 rounded-2xl border border-gold-500/30 bg-neutral-900/60 p-6 sm:p-8 space-y-3 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
                  <p className="font-arabic text-2xl sm:text-3xl text-gold-400 text-right leading-loose dir-rtl">
                    {block.arabic}
                  </p>
                  <p className="text-gray-200 text-sm sm:text-base italic leading-relaxed pt-2 border-t border-gold-500/10">
                    {block.translation}
                  </p>
                </div>
              );
            }
            if (block.type === 'list') {
              return (
                <div key={idx} className="my-6 space-y-3">
                  {block.title && (
                    <h3 className="font-semibold text-white text-lg">{block.title}</h3>
                  )}
                  <ul className="space-y-2.5 pl-2">
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-300">
                        <i className="fa-solid fa-check text-gold-400 mt-1 shrink-0 text-xs" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-gold-500/10 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500 mr-2 flex items-center gap-1.5">
            <i className="fa-solid fa-tags text-gold-500 text-xs" /> Tags:
          </span>
          {post.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-md bg-neutral-900 text-gray-400 text-xs border border-white/5"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* ─────────── AUTHOR BIO BOX ─────────── */}
        <div className="rounded-2xl border border-gold-500/20 bg-neutral-900/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src={post.authorImg}
            alt={post.author}
            className="w-16 h-16 rounded-full object-cover border-2 border-gold-500/40 shrink-0"
          />
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-white">{post.author}</h4>
            <p className="text-xs text-gold-400 font-medium">{post.authorRole} at Al Fatima Academy</p>
            <p className="text-xs text-gray-400 leading-relaxed pt-1">
              Dedicated to delivering authentic Quranic education worldwide through structured 1-on-1 virtual instruction and classical Sanad-backed methodologies.
            </p>
          </div>
        </div>

        {/* ─────────── ENROLLMENT BANNER ─────────── */}
        <div className="rounded-2xl border-2 border-gold-500/30 bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 p-8 sm:p-10 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-bold uppercase tracking-wider">
            Ready to Begin?
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Start Your Child&apos;s Quranic Journey Today
          </h3>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Experience our 1-on-1 live interactive sessions with our certified Quran tutors. Free 3-day evaluation with zero obligation.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="glow-pulse inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold py-3.5 px-8 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02]"
            >
              <i className="fa-solid fa-paper-plane text-xs" />
              Enroll in 3-Day Free Trial
            </Link>
          </div>
        </div>

        {/* ─────────── RELATED POSTS ─────────── */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-gold-500/10">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-white">Related Articles</h3>
              <Link to="/blog" className="text-xs text-gold-400 hover:text-gold-300 font-semibold flex items-center gap-1">
                View all <i className="fa-solid fa-chevron-right text-[9px]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="group rounded-xl overflow-hidden border border-gold-500/10 bg-neutral-900/40 hover:border-gold-500/30 p-4 transition-all block space-y-3"
                >
                  <div className="h-32 rounded-lg overflow-hidden relative">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-gold-400 font-semibold">{r.category}</span>
                    <h5 className="font-serif text-sm font-bold text-white group-hover:text-gold-400 transition-colors line-clamp-2 mt-1">
                      {r.title}
                    </h5>
                    <p className="text-gray-500 text-[11px] mt-1">{r.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
