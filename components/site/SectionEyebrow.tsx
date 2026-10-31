// Small red-dash eyebrow used above section titles.
export default function SectionEyebrow({
  label,
  centered = false,
}: {
  label: string;
  centered?: boolean;
}) {
  const dash = <span className="inline-block h-[2px] w-[26px] bg-cherry" />;
  return (
    <div className="mb-[14px] inline-flex items-center gap-[9px]">
      {dash}
      <span className="font-condensed text-[13px] font-semibold tracking-[2px] text-cherry">
        {label}
      </span>
      {centered && dash}
    </div>
  );
}
