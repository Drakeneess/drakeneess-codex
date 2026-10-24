import type { ReactNode } from "react";

import { ArchiveNote } from "@/components/mdx/ArchiveNote";
import { NarratorSwitch } from "@/components/mdx/NarratorSwitch";

const COMPONENT_REGISTRY = {
  ArchiveNote,
  NarratorSwitch,
} as const;

const READER_CHUNK_SIZE = 8;

type LiteralAttributes = Record<string, string>;

export class RemoteMdxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RemoteMdxError";
  }
}

function parseLiteralAttributes(raw: string): LiteralAttributes {
  const attributes: LiteralAttributes = {};
  let rest = raw.trim();

  while (rest.length > 0) {
    const match = /^([A-Za-z][A-Za-z0-9_-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')\s*/.exec(rest);

    if (!match) {
      throw new RemoteMdxError("Los atributos MDX deben ser literales de texto.");
    }

    const [, name, doubleQuoted, singleQuoted] = match;

    if (name in attributes) {
      throw new RemoteMdxError(`Atributo duplicado: ${name}.`);
    }

    attributes[name] = doubleQuoted ?? singleQuoted ?? "";
    rest = rest.slice(match[0].length);
  }

  return attributes;
}

function assertOnlyAttributes(
  attributes: LiteralAttributes,
  allowed: readonly string[],
  componentName: string,
) {
  for (const name of Object.keys(attributes)) {
    if (!allowed.includes(name)) {
      throw new RemoteMdxError(
        `El componente ${componentName} no permite el atributo ${name}.`,
      );
    }
  }
}

function isSafeHref(href: string) {
  return (
    href.startsWith("/") ||
    href.startsWith("#") ||
    /^https?:\/\//i.test(href) ||
    /^mailto:/i.test(href)
  );
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  if (/[{}]/.test(text)) {
    throw new RemoteMdxError("Las expresiones JavaScript no están permitidas en contenido remoto.");
  }

  if (/[<>]/.test(text)) {
    throw new RemoteMdxError("HTML o JSX inline no permitido en contenido remoto.");
  }

  const nodes: ReactNode[] = [];
  let cursor = 0;
  let part = 0;

  const pushText = (value: string) => {
    if (value) {
      nodes.push(value);
    }
  };

  while (cursor < text.length) {
    const rest = text.slice(cursor);

    if (rest.startsWith("`")) {
      const end = rest.indexOf("`", 1);
      if (end > 0) {
        nodes.push(
          <code
            key={`${keyPrefix}-code-${part++}`}
            className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-[#E8E2D6]"
          >
            {rest.slice(1, end)}
          </code>,
        );
        cursor += end + 1;
        continue;
      }
    }

    if (rest.startsWith("**")) {
      const end = rest.indexOf("**", 2);
      if (end > 1) {
        nodes.push(
          <strong key={`${keyPrefix}-strong-${part++}`}>
            {renderInline(rest.slice(2, end), `${keyPrefix}-strong-inner-${part}`)}
          </strong>,
        );
        cursor += end + 2;
        continue;
      }
    }

    if (rest.startsWith("*") || rest.startsWith("_")) {
      const marker = rest[0];
      const end = rest.indexOf(marker, 1);
      if (end > 0) {
        nodes.push(
          <em key={`${keyPrefix}-em-${part++}`}>
            {renderInline(rest.slice(1, end), `${keyPrefix}-em-inner-${part}`)}
          </em>,
        );
        cursor += end + 1;
        continue;
      }
    }

    if (rest.startsWith("[")) {
      const linkMatch = /^\[([^\]]+)\]\(([^)\s]+)\)/.exec(rest);
      if (linkMatch) {
        const [, label, href] = linkMatch;

        if (!isSafeHref(href)) {
          throw new RemoteMdxError(`Enlace no permitido: ${href}.`);
        }

        nodes.push(
          <a
            key={`${keyPrefix}-link-${part++}`}
            href={href}
            className="text-[#C7A76C] underline decoration-[#C7A76C]/40 underline-offset-4"
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            {renderInline(label, `${keyPrefix}-link-inner-${part}`)}
          </a>,
        );
        cursor += linkMatch[0].length;
        continue;
      }
    }

    const nextSpecial = rest.search(/[`*_\[{}<>]/);

    if (nextSpecial === -1) {
      pushText(rest);
      break;
    }

    if (nextSpecial === 0) {
      pushText(rest[0]);
      cursor += 1;
      continue;
    }

    pushText(rest.slice(0, nextSpecial));
    cursor += nextSpecial;
  }

  return nodes;
}

function isBlockBoundary(line: string) {
  const trimmed = line.trim();

  return (
    trimmed.length === 0 ||
    /^#{1,3}\s+/.test(trimmed) ||
    /^[-*]\s+/.test(trimmed) ||
    /^\d+\.\s+/.test(trimmed) ||
    /^>\s?/.test(trimmed) ||
    /^```/.test(trimmed) ||
    /^<\/?[A-Z]/.test(trimmed)
  );
}

function renderBlocks(lines: string[], keyPrefix = "remote-mdx"): ReactNode[] {
  const nodes: ReactNode[] = [];
  let index = 0;
  let block = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (/^(import|export)\b/.test(trimmed)) {
      throw new RemoteMdxError("Import y export no están permitidos en contenido remoto.");
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      const code: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }

      if (index >= lines.length) {
        throw new RemoteMdxError("Bloque de código sin cierre.");
      }

      nodes.push(
        <pre
          key={`${keyPrefix}-pre-${block++}`}
          className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-black/20 p-4"
        >
          <code data-language={language || undefined}>{code.join("\n")}</code>
        </pre>,
      );
      index += 1;
      continue;
    }

    const archiveOpen = /^<ArchiveNote(?:\s+([^>]*))?>\s*$/.exec(trimmed);
    if (archiveOpen) {
      const attributes = parseLiteralAttributes(archiveOpen[1] ?? "");
      assertOnlyAttributes(attributes, ["type", "code"], "ArchiveNote");

      const type = attributes.type ?? "comment";
      if (!(["evidence", "warning", "comment"] as const).includes(type as "evidence" | "warning" | "comment")) {
        throw new RemoteMdxError(`ArchiveNote recibió un type inválido: ${type}.`);
      }

      const inner: string[] = [];
      index += 1;

      while (index < lines.length && lines[index].trim() !== "</ArchiveNote>") {
        if (/^<ArchiveNote(?:\s|>)/.test(lines[index].trim())) {
          throw new RemoteMdxError("ArchiveNote anidado no está permitido.");
        }
        inner.push(lines[index]);
        index += 1;
      }

      if (index >= lines.length) {
        throw new RemoteMdxError("ArchiveNote sin cierre.");
      }

      const Component = COMPONENT_REGISTRY.ArchiveNote;
      nodes.push(
        <Component
          key={`${keyPrefix}-archive-${block++}`}
          type={type as "evidence" | "warning" | "comment"}
          code={attributes.code}
        >
          {renderBlocks(inner, `${keyPrefix}-archive-inner-${block}`)}
        </Component>,
      );
      index += 1;
      continue;
    }

    const narrator = /^<NarratorSwitch(?:\s+([^>]*))?\s*\/?>\s*$/.exec(trimmed);
    if (narrator && trimmed.endsWith("/>")) {
      const attributes = parseLiteralAttributes(narrator[1] ?? "");
      assertOnlyAttributes(attributes, ["nex", "verdan"], "NarratorSwitch");

      if (!attributes.nex || !attributes.verdan) {
        throw new RemoteMdxError("NarratorSwitch requiere nex y verdan.");
      }

      const Component = COMPONENT_REGISTRY.NarratorSwitch;
      nodes.push(
        <Component
          key={`${keyPrefix}-narrator-${block++}`}
          nex={attributes.nex}
          verdan={attributes.verdan}
        />,
      );
      index += 1;
      continue;
    }

    if (trimmed.startsWith("<")) {
      throw new RemoteMdxError("Componente MDX o HTML no registrado.");
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (heading) {
      const [, marker, text] = heading;
      const children = renderInline(text, `${keyPrefix}-heading-${block}`);

      if (marker.length === 1) {
        nodes.push(
          <h1 key={`${keyPrefix}-h1-${block++}`} className="mb-8 mt-10 text-4xl font-bold text-[#E8E2D6] md:text-5xl">
            {children}
          </h1>,
        );
      } else if (marker.length === 2) {
        nodes.push(
          <h2 key={`${keyPrefix}-h2-${block++}`} className="mb-4 mt-10 text-3xl font-semibold text-[#E8E2D6]">
            {children}
          </h2>,
        );
      } else {
        nodes.push(
          <h3 key={`${keyPrefix}-h3-${block++}`} className="mb-3 mt-8 text-2xl font-semibold text-[#E8E2D6]">
            {children}
          </h3>,
        );
      }

      index += 1;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }

      nodes.push(
        <blockquote
          key={`${keyPrefix}-quote-${block++}`}
          className="my-6 border-l-2 border-[#C7A76C]/50 pl-5 italic text-[#CFC7B8]"
        >
          {renderInline(quote.join(" "), `${keyPrefix}-quote-inner-${block}`)}
        </blockquote>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }

      nodes.push(
        <ul key={`${keyPrefix}-ul-${block++}`} className="my-5 list-disc space-y-2 pl-6 text-[#D8D0C1]">
          {items.map((item, itemIndex) => (
            <li key={`${keyPrefix}-ul-${block}-item-${itemIndex}`}>
              {renderInline(item, `${keyPrefix}-ul-${block}-inline-${itemIndex}`)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }

      nodes.push(
        <ol key={`${keyPrefix}-ol-${block++}`} className="my-5 list-decimal space-y-2 pl-6 text-[#D8D0C1]">
          {items.map((item, itemIndex) => (
            <li key={`${keyPrefix}-ol-${block}-item-${itemIndex}`}>
              {renderInline(item, `${keyPrefix}-ol-${block}-inline-${itemIndex}`)}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    const paragraph = [trimmed];
    index += 1;

    while (index < lines.length && !isBlockBoundary(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }

    nodes.push(
      <p key={`${keyPrefix}-p-${block++}`} className="my-5 leading-8 text-[#D8D0C1]">
        {renderInline(paragraph.join(" "), `${keyPrefix}-p-inline-${block}`)}
      </p>,
    );
  }

  return nodes;
}

function renderRemoteMdx(source: string) {
  return renderBlocks(source.replace(/\r\n?/g, "\n").split("\n"));
}

function chunkBlocks(blocks: ReactNode[]) {
  const chunks: ReactNode[][] = [];

  for (let index = 0; index < blocks.length; index += READER_CHUNK_SIZE) {
    chunks.push(blocks.slice(index, index + READER_CHUNK_SIZE));
  }

  return chunks;
}

export function RemoteMdx({ source }: { source: string }) {
  try {
    const chunks = chunkBlocks(renderRemoteMdx(source));

    return (
      <div className="remote-mdx">
        {chunks.map((chunk, index) => (
          <div className="remote-mdx-chunk" key={`remote-mdx-chunk-${index}`}>
            {chunk}
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("[codex] Invalid remote MDX.", error);

    return (
      <aside
        role="alert"
        className="my-8 rounded-2xl border border-red-300/20 bg-red-950/20 p-5 text-sm leading-7 text-red-100"
      >
        <p className="font-semibold">Este capítulo no puede mostrarse todavía.</p>
        <p className="mt-2 text-red-100/80">
          El contenido publicado contiene sintaxis editorial no permitida o inválida.
        </p>
      </aside>
    );
  }
}
