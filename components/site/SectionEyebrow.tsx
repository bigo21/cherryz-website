// Small red-dash eyebrow above a section title: two per page at most, hero included.
export default function SectionEyebrow({
  label,
  centered = false,
}: {
  label: string;
  centered?: boolean;
}) {
  const dash = <span className="inline-block h-1 w-6 bg-cherry" />;
  return (
    <div className="mb-3 inline-flex items-center gap-2">
      {dash}
      <span className="font-condensed text-caption font-semibold uppercase text-cherry">
        {label}
      </span>
      {centered && dash}
    </div>
  );
}
