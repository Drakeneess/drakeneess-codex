import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexSeal } from "./CodexSeal";

type CodexReturnLinkProps = {
  variant: "floating" | "reader" | "fossil";
  style?: CSSProperties;
};

export function CodexReturnLink({ variant, style }: CodexReturnLinkProps) {
  const className =
    variant === "floating"
      ? "custom-story-return-link codex-brand-return"
      : variant === "reader"
        ? "reader-codex-home codex-brand-return"
        : "fossil-reader-back fossil-reader-home codex-brand-return";

  return (
    <Link
      href="/"
      className={className}
      style={style}
      aria-label="Volver al inicio de The Drakeneess Codex"
    >
      {variant === "floating" ? (
        <>
          <span className="custom-story-return-arrow" aria-hidden="true">←</span>
          <span className="custom-story-return-copy">
            <span className="custom-story-return-kicker">Salir de la obra</span>
            <span className="custom-story-return-title">Volver al Códice</span>
          </span>
          <CodexSeal className="custom-story-return-seal" />
        </>
      ) : (
        <>
          <CodexSeal className={variant === "reader" ? "reader-codex-sigil" : "codex-return-inline-seal"} />
          <span>{variant === "reader" ? "Volver al Códice" : "Códice"}</span>
        </>
      )}
    </Link>
  );
}
