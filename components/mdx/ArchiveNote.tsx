type ArchiveNoteProps = {
  type?: "evidence" | "warning" | "comment";
  code?: string;
  children: React.ReactNode;
};

export function ArchiveNote({
  type = "comment",
  code = "ARCHIVE",
  children,
}: ArchiveNoteProps) {
  return (
    <aside className="my-8 rounded-2xl border border-[#C7A76C]/30 bg-[#C7A76C]/[0.06] p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.3em] text-[#C7A76C]">
          {type}
        </p>
        <p className="font-mono text-xs text-[#A6A090]">{code}</p>
      </div>

      <div className="text-sm leading-7 text-[#E8E2D6]">{children}</div>
    </aside>
  );
}