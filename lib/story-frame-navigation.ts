export type StoryFrameLink =
  | { kind: "fragment"; id: string }
  | { kind: "navigate"; href: string }
  | { kind: "blocked" };

/** Resolve links against the outer story URL, not about:srcdoc. */
export function resolveStoryFrameLink(href: string, parentUrl: string): StoryFrameLink {
  const value = href.trim();
  if (!value || value.startsWith("#")) {
    const fragment = value.slice(1);
    try {
      return { kind: "fragment", id: decodeURIComponent(fragment) };
    } catch {
      return { kind: "fragment", id: fragment };
    }
  }

  try {
    const base = new URL(parentUrl);
    const url = new URL(value, base);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return { kind: "blocked" };
    }
    if (url.origin === base.origin && url.pathname === base.pathname &&
        url.search === base.search && url.hash) {
      return resolveStoryFrameLink(url.hash, parentUrl);
    }
    return { kind: "navigate", href: url.href };
  } catch {
    return { kind: "blocked" };
  }
}

/**
 * The trusted parent owns navigation. The authored iframe has no script
 * permission. A route link must never load another Codex shell in the frame.
 */
export function bindStoryFrameNavigation(
  doc: Document,
  parentUrl: string,
  navigate: (href: string, newTab: boolean) => void,
) {
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || (event.button !== 0 && event.button !== 1)) return;
    // The element belongs to the iframe's realm; instanceof Element in the
    // parent is false even for a valid child element.
    const node = event.target as Node | null;
    const element = node?.nodeType === 1 ? node as Element : node?.parentElement;
    const anchor = element?.closest("a[href], area[href]");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (href === null) return;

    event.preventDefault();
    const result = resolveStoryFrameLink(href, parentUrl);
    if (result.kind === "blocked") return;
    if (result.kind === "fragment") {
      if (!result.id) {
        doc.scrollingElement?.scrollTo({ top: 0, behavior: "instant" });
      } else {
        const target = doc.getElementById(result.id) ??
          doc.getElementsByName(result.id)[0];
        target?.scrollIntoView({ block: "start", behavior: "instant" });
      }
      return;
    }
    navigate(result.href, event.ctrlKey || event.metaKey || event.shiftKey ||
      event.button === 1 || anchor.getAttribute("target")?.toLowerCase() === "_blank");
  };

  // Normalize explicit _self/named targets as well as default targets.
  // This also keeps browser context-menu navigation from nesting the site.
  for (const anchor of doc.querySelectorAll("a[href], area[href]")) {
    const result = resolveStoryFrameLink(anchor.getAttribute("href") ?? "", parentUrl);
    if (result.kind === "navigate") {
      if (anchor.getAttribute("target")?.toLowerCase() !== "_blank") {
        anchor.setAttribute("target", "_top");
      }
    } else if (result.kind === "blocked") {
      anchor.removeAttribute("href");
    }
  }

  doc.addEventListener("click", onClick, true);
  doc.addEventListener("auxclick", onClick, true);
  return () => {
    doc.removeEventListener("click", onClick, true);
    doc.removeEventListener("auxclick", onClick, true);
  };
}
