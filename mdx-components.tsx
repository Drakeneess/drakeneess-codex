import type { MDXComponents } from "mdx/types";
import { ArchiveNote } from "@/components/mdx/ArchiveNote";
import { NarratorSwitch } from "@/components/mdx/NarratorSwitch";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ArchiveNote,
    NarratorSwitch,
    h1: ({ children }) => (
      <h1 className="mb-8 text-4xl font-bold text-[#E8E2D6] md:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-3xl font-semibold text-[#E8E2D6]">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="my-5 leading-8 text-[#D8D0C1]">{children}</p>
    ),
    ...components,
  };
}