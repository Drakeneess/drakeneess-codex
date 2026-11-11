type CustomStoryLayoutFrameProps = {
  title: string;
  srcDoc: string;
};

/**
 * Custom story pages own their scroll viewport.
 *
 * A content-sized iframe cannot reliably accommodate author CSS using vh/dvh
 * units: changing the frame height changes the document's viewport, which
 * grows its contents again and creates nested scrollbars or feedback loops.
 * Keep the frame at the height of its parent instead.
 */
function getDocumentKey(srcDoc: string) {
  let hash = 2166136261;
  for (let index = 0; index < srcDoc.length; index += 1) {
    hash = Math.imul(hash ^ srcDoc.charCodeAt(index), 16777619);
  }
  return `${srcDoc.length}-${hash >>> 0}`;
}

export function CustomStoryLayoutFrame({
  title,
  srcDoc,
}: CustomStoryLayoutFrameProps) {
  return (
    <iframe
      key={getDocumentKey(srcDoc)}
      title={title}
      srcDoc={srcDoc}
      sandbox="allow-same-origin allow-top-navigation-by-user-activation"
      className="block h-full w-full border-0 bg-transparent"
    />
  );
}
