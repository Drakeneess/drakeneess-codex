import assert from "node:assert/strict";
import test from "node:test";

import {
  createDefaultStoryCustomLayout,
  hasCustomStoryLayout,
  normalizeStoryCustomLayout,
} from "./story-layout.ts";

test("legacy stories default to preset layout", () => {
  assert.deepEqual(
    normalizeStoryCustomLayout(undefined),
    createDefaultStoryCustomLayout(),
  );

  assert.deepEqual(
    normalizeStoryCustomLayout({}),
    {
      mode: "preset",
      html: "",
      css: "",
    },
  );
});

test("empty custom HTML falls back to preset presentation", () => {
  const layout = normalizeStoryCustomLayout({
    mode: "custom",
    html: "   ",
    css: "body { margin: 0; }",
  });

  assert.equal(
    hasCustomStoryLayout(layout),
    false,
  );
});

test("non-string custom fields degrade safely", () => {
  const layout = normalizeStoryCustomLayout({
    mode: "custom",
    html: 42,
    css: {
      unsafe: true,
    },
  });

  assert.deepEqual(
    layout,
    {
      mode: "custom",
      html: "",
      css: "",
    },
  );

  assert.equal(
    hasCustomStoryLayout(layout),
    false,
  );
});

test("valid custom HTML enables the isolated renderer", () => {
  const layout = normalizeStoryCustomLayout({
    mode: "custom",
    html: '<main data-layout="custom">{{story.title}}</main>',
    css: ":root, html, body, * { box-sizing: border-box; }",
  });

  assert.equal(
    hasCustomStoryLayout(layout),
    true,
  );
});
