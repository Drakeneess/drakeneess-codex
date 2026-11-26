"use client";

import { useCallback, useEffect, useRef } from "react";
import { bindStoryFrameNavigation } from "@/lib/story-frame-navigation";

type CustomStoryLayoutFrameProps = {
  title: string;
  srcDoc: string;
};

function getDocumentKey(srcDoc: string) {
  let hash = 2166136261;
  for (let index = 0; index < srcDoc.length; index += 1) {
    hash = Math.imul(hash ^ srcDoc.charCodeAt(index), 16777619);
  }
  return `${srcDoc.length}-${hash >>> 0}`;
}

function CustomStoryFrameDocument({ title, srcDoc }: CustomStoryLayoutFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const connectNavigation = useCallback(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!doc || doc.URL !== "about:srcdoc") return;

    cleanupRef.current = bindStoryFrameNavigation(doc, window.location.href, (href, newTab) => {
      if (newTab) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        // A real top-level navigation avoids nested documents and stale frames.
        window.location.assign(href);
      }
    });
  }, []);

  useEffect(() => {
    // The iframe may have loaded before React hydrated.
    connectNavigation();
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [connectNavigation]);

  return (
    <iframe
      ref={frameRef}
      title={title}
      srcDoc={srcDoc}
      sandbox="allow-same-origin allow-top-navigation-by-user-activation"
      onLoad={connectNavigation}
      className="block h-full w-full border-0 bg-transparent"
    />
  );
}

export function CustomStoryLayoutFrame(props: CustomStoryLayoutFrameProps) {
  return <CustomStoryFrameDocument key={getDocumentKey(props.srcDoc)} {...props} />;
}
