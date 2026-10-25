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

export function CustomStoryLayoutFrame({
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
