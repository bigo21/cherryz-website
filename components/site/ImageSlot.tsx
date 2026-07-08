// Placeholder for a real Cherryz photo (to be swapped for actual assets).
// Renders a labelled, on-brand placeholder rather than a stock image.
export default function ImageSlot({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-deep to-navy p-6 ${className ?? ""}`}
      role="img"
      aria-label={label}
    >
      <span className="max-w-[80%] text-center font-condensed text-[13px] font-semibold uppercase tracking-[1.5px] text-white/45">
        {label}
      </span>
    </div>
  );
}
