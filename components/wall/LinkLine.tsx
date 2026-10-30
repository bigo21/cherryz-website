/**
 * State of a link, drawn by stroke pattern rather than colour (the parent's
 * `data-link` attribute picks it in globals.css): a solid line ending on a
 * filled node when online, a running dash while negotiating, a broken line on
 * a hollow node when offline.
 */
export default function LinkLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 10" width="30" height="10" aria-hidden className={`link-line flex-none ${className ?? ""}`}>
      <path className="link-path" d="M1 5 H22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle className="link-node" cx="26" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
