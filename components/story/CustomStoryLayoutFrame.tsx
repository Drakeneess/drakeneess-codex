"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type CustomStoryLayoutFrameProps = {
  title: string;
  srcDoc: string;
};

const MIN_FRAME_HEIGHT = 680;
const MAX_FRAME_HEIGHT = 50_000;

/**
 * A changed published layout must get a fresh browsing context.
 * Updating srcDoc on an existing iframe can otherwise leave observers or
 * measurements tied to its previous document during client navigation.
 */
function getDocumentKey(srcDoc: string) {
  let hash = 2166136261;
  for (let index = 0; index < srcDoc.length; index += 1) {
    hash = Math.imul(hash ^ srcDoc.charCodeAt(index), 16777619);
  }
  return `${srcDoc.length}-${hash >>> 0}`;
}

function CustomStoryLayoutFrameDocument({
  title,
  srcDoc,
}: CustomStoryLayoutFrameProps) {
  const frameRef =
    useRef<HTMLIFrameElement>(null);

  const observerRef =
    useRef<ResizeObserver | null>(null);

  const [height, setHeight] =
    useState(MIN_FRAME_HEIGHT);

  const measure = useCallback(() => {
    const frame = frameRef.current;
    const document = frame?.contentDocument;

    if (!document) {
      return;
    }

    const nextHeight = Math.min(
      MAX_FRAME_HEIGHT,
      Math.max(
        MIN_FRAME_HEIGHT,
        document.documentElement?.scrollHeight ?? 0,
        document.body?.scrollHeight ?? 0,
      ),
    );

    setHeight((current) =>
      Math.abs(current - nextHeight) > 1
        ? nextHeight
        : current,
    );
  }, []);

  const connectObserver = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    const frame = frameRef.current;
    const document = frame?.contentDocument;

    if (!document) {
      return;
    }

    measure();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(measure);
    });

    if (document.documentElement) {
      observer.observe(document.documentElement);
    }

    if (document.body) {
      observer.observe(document.body);
    }

    observerRef.current = observer;
  }, [measure]);

  useEffect(() => {
    const handleResize = () => {
      window.requestAnimationFrame(measure);
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );

      observerRef.current?.disconnect();
    };
  }, [measure]);

  return (
    <iframe
      ref={frameRef}
      title={title}
      srcDoc={srcDoc}
      sandbox="allow-same-origin allow-top-navigation-by-user-activation"
      onLoad={connectObserver}
      className="block w-full border-0 bg-transparent"
      style={{
        height,
      }}
    />
  );
}

export function CustomStoryLayoutFrame(props: CustomStoryLayoutFrameProps) {
  return (
    <CustomStoryLayoutFrameDocument
      key={getDocumentKey(props.srcDoc)}
      {...props}
    />
  );
}
