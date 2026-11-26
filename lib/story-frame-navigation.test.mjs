import assert from "node:assert/strict";
import test from "node:test";
import { resolveStoryFrameLink } from "./story-frame-navigation.ts";
import { resolveStoryThemeKey } from "./theme-registry.ts";
const page = "https://codex.example/stories/il-solito";

test("story section anchors stay in the frame", () => {
  assert.deepEqual(resolveStoryFrameLink("#cap%C3%ADtulos", page), { kind: "fragment", id: "capítulos" });
  assert.deepEqual(resolveStoryFrameLink(page + "#chapter", page), { kind: "fragment", id: "chapter" });
  assert.deepEqual(resolveStoryFrameLink("#", page), { kind: "fragment", id: "" });
});

test("site and chapter routes go to the outer window", () => {
  assert.deepEqual(resolveStoryFrameLink("/", page), { kind: "navigate", href: "https://codex.example/" });
  assert.deepEqual(resolveStoryFrameLink("/stories/il-solito/chapters/1", page),
    { kind: "navigate", href: "https://codex.example/stories/il-solito/chapters/1" });
  assert.deepEqual(resolveStoryFrameLink("/stories/other#chapter", page),
    { kind: "navigate", href: "https://codex.example/stories/other#chapter" });
});

test("only HTTP(S) destinations are accepted", () => {
  for (const href of ["javascript:alert(1)", "data:text/html,x", "file:///etc", "http://["]) {
    assert.deepEqual(resolveStoryFrameLink(href, page), { kind: "blocked" });
  }
});

test("unknown theme keys, including inherited object keys, fall back", () => {
  for (const key of ["constructor", "__proto__", "toString", "unknown"]) {
    assert.equal(resolveStoryThemeKey(key), "codex");
  }
});
