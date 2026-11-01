/** Error message under a form field; its id is the field's aria-describedby. */
export default function FieldError({ id, message }: { id?: string; message: string }) {
  return (
    <div id={id} className="mt-2 flex items-center gap-[6px] font-sans text-[13.5px] font-medium text-cherry">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="flex-none" aria-hidden>
        <path d="M12 3l9 16H3z" />
        <path d="M12 10v4M12 17h.01" />
      </svg>
      {message}
    </div>
  );
}
