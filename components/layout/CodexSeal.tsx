type CodexSealProps = {
  className?: string;
};

export function CodexSeal({ className = "" }: CodexSealProps) {
  return (
    <span className={["codex-brand-seal", className].filter(Boolean).join(" ")} aria-hidden="true">
      D
    </span>
  );
}
